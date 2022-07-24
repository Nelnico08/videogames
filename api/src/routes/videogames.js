require('dotenv').config();
const { Router } = require('express');
const router = Router();
const { Op } = require('sequelize');
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db');

router.get('/', async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      let videogameSearch = [];
      const dbGamesSearch = await Videogame.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: Genre,
        limit: 15,
      });
      if (dbGamesSearch.length) {
        videogameSearch = dbGamesSearch.map((elem) => {
          return {
            id: elem.id,
            name: elem.name,
            released: elem.released,
            image: elem.image,
            rating: elem.rating,
            platforms: elem.platforms?.map((plat) => plat),
            genres: elem.genres?.map((genre) => genre.name),
          };
        });
      }
      const apiGameSearch = (
        await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
        )
      ).data.results;
      if (apiGameSearch.length) {
        apiGameSearch.forEach((elem) => {
          videogameSearch.push({
            id: elem.id,
            name: elem.name,
            released: elem.released,
            image: elem.background_image,
            rating: elem.rating,
            platforms: elem.platforms?.map((plat) => plat.platform.name),
            genres: elem.genres?.map((genre) => genre.name),
          });
        });
      }
      if (!videogameSearch.length) {
        return res.send("Can't find game");
      }
      videogameSearch = videogameSearch.slice(0, 15);

      return res.send(videogameSearch);
    } else {
      let videogame = [];

      const allDBGames = await Videogame.findAll({
        include: Genre,
        limit: 100,
      });
      if (allDBGames.length) {
        videogame = allDBGames.map((elem) => {
          return {
            id: elem.id,
            name: elem.name,
            released: elem.released,
            image: elem.image,
            rating: elem.rating,
            platforms: elem.platforms.map((plat) => plat),
            genres: elem.genres.map((genre) => genre.name),
          };
        });
      }
      let count = 0;

      let pagePetition = function (response) {
        let { data } = response;
        videogame.push(
          ...data.results.map((game) => {
            return {
              id: game.id,
              name: game.name,
              released: game.released,
              image: game.background_image,
              rating: game.rating,
              platforms: game.platforms.map((plat) => plat.platform.name),
              genres: game.genres.map((genre) => genre.name),
            };
          })
        );

        count++;
        if (count < 5) {
          axios.get(data.next).then(pagePetition);
        } else {
          return res.send(videogame);
        }
      };

      axios
        .get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        .then(pagePetition);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.post('/', (req, res) => {
  const { name, description, released, image, rating, platforms, genres } =
    req.body;

  if (!name || !description || !platforms) throw new Error('Faltan parametros');
  else {
    Videogame.create({
      name,
      description,
      released,
      image,
      rating,
      platforms,
      genres,
    })
      .then((newVideogame) => {
        Promise.all(
          genres?.map((genre) => {
            return Genre.findOne({ where: { name: genre } });
          })
        ).then((genreFound) => {
          newVideogame.addGenre(genreFound);
          return res.send(newVideogame);
        });
      })
      .catch((err) => res.status(400).send(err.message));
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Videogame.destroy({ where: { id }, inlcude: Genre });
    res.send('Videogame deleted');
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;

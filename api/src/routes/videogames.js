require('dotenv').config();
const { Router } = require('express');
const router = Router();
const { Op } = require('Sequelize');
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db');

router.get('/', (req, res) => {
  const { name } = req.query;

  if (name) {
    let allVideogames = [];
    Videogame.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      include: Genre,
      limit: 15,
    })
      .then((dbGamesSearch) => {
        if (dbGamesSearch.length) {
          allVideogames = dbGamesSearch?.map((elem) => {
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
          return allVideogames;
        }
      })
      .then(() => {
        axios
          .get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
          .then((resp) => resp.data.results)
          .then((apiGamesSearch) => {
            if (apiGamesSearch.length) {
              apiGamesSearch.forEach((elem) => {
                allVideogames.push({
                  id: elem.id,
                  name: elem.name,
                  released: elem.released,
                  image: elem.background_image,
                  rating: elem.rating,
                  platforms: elem.platforms?.map((plat) => plat.platform.name),
                  genres: elem.genres?.map((genre) => genre.name),
                });
              });
              return allVideogames;
            }
          })
          .then(() => {
            if (!allVideogames.length) {
              return res.status(404).send("Can't find game");
            }
            allVideogames = allVideogames.slice(0, 15);

            res.send(allVideogames);
          });
      })
      .catch((err) => err.message);
  } else {
    let videogames = [];

    Videogame.findAll({
      include: Genre,
      limit: 100,
    })
      .then((allDBGames) => {
        if (allDBGames.length) {
          videogames = allDBGames.map((elem) => {
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
        return videogames;
      })
      .then(() => {
        let pagePetitions = [];
        for (let i = 1; i < 6; i++) {
          pagePetitions.push(
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
          );
        }

        Promise.all(pagePetitions)
          .then((petition) => petition.map((elem) => elem.data.results))
          .then((pages) => {
            pages.forEach((e) =>
              e.forEach((elem) => {
                videogames.push({
                  id: elem.id,
                  name: elem.name,
                  released: elem.released,
                  image: elem.background_image,
                  rating: elem.rating,
                  platforms: elem.platforms.map((plat) => plat.platform.name),
                  genres: elem.genres.map((genre) => genre.name),
                });
              })
            );
            return res.send(videogames);
          })
          .catch((err) => {
            return res.status(404).send(err.message);
          });
      });
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

module.exports = router;

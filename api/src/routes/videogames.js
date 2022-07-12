require('dotenv').config();
const { Router } = require('express');
const router = Router();
const { Op } = require('Sequelize');
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db');

router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      let DbVideogame = [];
      const data = await Videogame.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: Genre,
        limit: 15,
      });

      if (data.length > 0) {
        DbVideogame = data.map((elem) => {
          return {
            id: elem.id,
            name: elem.name,
            released: elem.released,
            image: elem.image,
            rating: elem.rating,
            genres: elem.genres.map((genre) => genre.name),
          };
        });
      }

      const apiPetition = (
        await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
        )
      ).data.results;
      let apiVideogames = [];
      if (apiPetition.length > 0) {
        apiVideogames = apiPetition?.map((elem) => {
          return {
            id: elem.id,
            name: elem.name,
            released: elem.released,
            image: elem.background_image,
            rating: elem.rating,
            platforms: elem.platforms?.map((plat) => plat.platform.name),
            genres: elem.genres?.map((genre) => genre.name),
          };
        });
      }
      let videogames = [...DbVideogame, ...apiVideogames];
      if (!videogames.length) {
        return res.send("Can't find game");
      }
      videogames = videogames.slice(0, 15);

      res.send(videogames);
    } else {
      let videogames = [];

      const gameDb = await Videogame.findAll({
        include: Genre,
        limit: 100,
      });

      if (gameDb.length) {
        videogames = gameDb.map((elem) => {
          return {
            id: elem.id,
            name: elem.name,
            released: elem.released,
            image: elem.image,
            rating: elem.rating,
            genres: elem.genres.map((genre) => genre.name),
          };
        });
      }

      const pageOne = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
      const pageTwo = axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
      );
      const pageThree = axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
      );
      const pageFour = axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
      );
      const pageFive = axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
      );

      const petitions = await Promise.all([
        pageOne,
        pageTwo,
        pageThree,
        pageFour,
        pageFive,
      ]);
      const firstPage = petitions[0].data.results;
      const secondPage = petitions[1].data.results;
      const thirdPage = petitions[2].data.results;
      const fourthPage = petitions[3].data.results;
      const fifthPage = petitions[4].data.results;

      let pages = [
        ...firstPage,
        ...secondPage,
        ...thirdPage,
        ...fourthPage,
        ...fifthPage,
      ];

      pages.forEach((elem) => {
        videogames.push({
          id: elem.id,
          name: elem.name,
          released: elem.released,
          image: elem.background_image,
          rating: elem.rating,
          platforms: elem.platforms.map((plat) => plat.platform.name),
          genres: elem.genres.map((genre) => genre.name),
        });
      });
      res.send(videogames);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description, released, image, rating, platforms, genres } =
      req.body;

    if (!name || !description || !platforms)
      throw new Error('Faltan parametros');
    else {
      const newVideogame = await Videogame.create({
        name,
        description,
        released,
        image,
        rating,
        platforms,
        genres,
      });
      genres?.forEach(async (genre) => {
        let findGenre = await Genre.findOne({
          where: { name: genre },
        });
        newVideogame.addGenre(findGenre);
      });
      res.send(newVideogame);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;

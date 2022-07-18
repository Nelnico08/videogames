require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (id.length > 6) {
    Videogame.findOne({
      where: { id },
      include: Genre,
    })
      .then((dbVideogame) => {
        if (!dbVideogame) throw new Error('Videogame not found');
        else {
          return {
            id: dbVideogame.id,
            name: dbVideogame.name,
            description: dbVideogame.description,
            released: dbVideogame.released,
            image: dbVideogame.image,
            rating: dbVideogame.rating,
            platforms: dbVideogame.platforms,
            genres: dbVideogame.genres.map((genre) => genre.name),
          };
        }
      })
      .then((game) => {
        return res.send(game);
      })
      .catch((err) => {
        return res.status(404).send(err.message);
      });
  } else {
    axios
      .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      .then((apiVideogame) => {
        return {
          id: apiVideogame.data.id,
          name: apiVideogame.data.name,
          description: apiVideogame.data.description_raw,
          released: apiVideogame.data.released,
          image: apiVideogame.data.background_image,
          rating: apiVideogame.data.rating,
          platforms: apiVideogame.data.platforms.map(
            (plat) => plat.platform.name
          ),
          genres: apiVideogame.data.genres.map((genre) => genre.name),
        };
      })
      .then((game) => {
        return res.send(game);
      })
      .catch((err) => {
        return res.status(404).send(err.message);
      });
  }
});

module.exports = router;

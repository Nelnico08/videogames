require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
const { Genre } = require('../db');

router.get('/', (req, res) => {
  axios
    .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then((response) => response.data.results)
    .then((apiGenres) =>
      Promise.all(
        apiGenres.map((genre) => {
          return Genre.findOrCreate({ where: { name: genre.name } });
        })
      )
    )
    .then(Genre.findAll())
    .then((genreDB) =>
      Promise.all(
        genreDB.map((e) => {
          return e[0].dataValues;
        })
      )
    )
    .then((genresDB) => res.send(genresDB))
    .catch((err) => res.status(404).send(err.message));
});

module.exports = router;

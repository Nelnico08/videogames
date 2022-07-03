require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
const { Genre } = require('../db')

router.get('/', async (req, res) =>{
    try{
        const apiGenres = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;

        apiGenres.forEach(async genre => {
            await Genre.findOrCreate({
                where:{
                    name: genre.name
                }
            })
        });
        const genresDb = await Genre.findAll()
        res.send(genresDb);
    }catch(err){
        res.status(404).send(err.message)
    }
})

module.exports = router;
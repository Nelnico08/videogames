require('dotenv').config();
const axios = require('axios')
const { Router } = require('express');
const router = Router();
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db')

router.get('/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        let game;
        if(id.length > 6){
           const DbVideogame = await Videogame.findOne({
            where:{
                id: id
            },
            include: Genre
        });
            game = {
                id: DbVideogame.id,
                name: DbVideogame.name,
                description: DbVideogame.description,
                released: DbVideogame.released,
                image: DbVideogame.image,
                rating: DbVideogame.rating,
                platforms: DbVideogame.platforms,
                genres: DbVideogame.genres.map(genre => genre.name)
                
            };
        }else{
            const apiVideogame = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;
            game = {
                id: apiVideogame.id,
                name: apiVideogame.name,
                description: apiVideogame.description_raw,
                released: apiVideogame.released,
                image: apiVideogame.image,
                rating: apiVideogame.rating,
                platforms: apiVideogame.platforms.map(plat => plat.platform.name),
                genres: apiVideogame.genres.map(genre => genre.name)
            }
        }
        res.send(game)
    }catch(err){
        res.status(404).send(err.message)
    };
});

module.exports = router;
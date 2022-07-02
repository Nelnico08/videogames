require('dotenv').config();
const { Router } = require('express');
const router = Router();
const { Op } = require('Sequelize');
const {API_KEY} = process.env;
const axios = require('axios')
const { Videogame, Genre } = require('../db')

router.get('/', async (req, res) =>{
    try{
        const { name } = req.query;
        if(name){
            let DbVideogame = [];
            const data = await Videogame.findAll({
                where:{
                    name: { [Op.iLike]: `%${name}%` }
                },
                include: Genre,
                limit: 15
            });

            if(data.length > 0){
                DbVideogame = data.map(elem =>{
                    return {
                        id: elem.id,
                        name: elem.name,
                        released: elem.released,
                        image: elem.image,
                        rating: elem.rating,
                        genres: elem.genres
                    }
                });
            };

            const apiPetition = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results;
            let apiVideogames = [];
            if(apiPetition.length > 0){
                apiVideogames = apiPetition.map(elem =>{
                    return{
                        id: elem.id,
                        name: elem.name,
                        released: elem.released,
                        image: elem.background_image,
                        rating: elem.rating,
                        platforms: elem.platforms.map(plat => plat.platform.name),
                        genres: elem.genres.map(genre => genre.name)
                    }
                });
            };
            let videogames = [...DbVideogame, ...apiVideogames ]
            videogames = videogames.slice(0,15);

            res.send(videogames.length ? videogames : `Can't find ${name}`)
        }
        else{
            const videogames = [];

            const pageOne = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
            const pageTwo = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
            const pageThree = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
            const pageFour = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
            const pageFive = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);

            const petitions = await Promise.all([pageOne, pageTwo, pageThree, pageFour, pageFive]);
            const firstPage = petitions[0].data.results;
            const secondPage = petitions[1].data.results;
            const thirdPage = petitions[2].data.results;
            const fourthPage = petitions[3].data.results;
            const fifthPage = petitions[4].data.results;

            let pages = [...firstPage, ...secondPage, ...thirdPage, ...fourthPage, ...fifthPage];

            pages.forEach(elem =>{
                videogames.push({
                    id: elem.id,
                    name: elem.name,
                    released: elem.released,
                    image: elem.background_image,
                    rating: elem.rating,
                    platforms: elem.platforms.map(plat => plat.platform.name),
                    genres: elem.genres.map(genre => genre.name)
                })
            })
            res.send(videogames)   
        }
    }catch(err){
        console.log(err)
    }
});

router.post('/', async (req, res) =>{
    try{
        const { name, description, released, image, rating, platforms, genres } = req.body;

        const newVideogame = await Videogame.create({
            name,
            description,
            released,
            image,
            rating,
            platforms,
            genres
        })
        genres?.forEach(async genre =>{
            let findGenre =  await Genre.findOne({
                where: {name:genre}
            })
            newVideogame.addGenre(findGenre)
        })
        res.send(newVideogame);
    }catch(err){
        console.log(err)
    }
});

router.put('/', async (req, res) =>{
    try{
        const { name, description, released, image, rating, platforms, genres } = req.body;

        const condition = {};
        const where = {};
        if(name) where.name = name;
        if(description) where.description = description;
        if(released) where.released = released;
        if(image) where.image = image;
        if(rating) where.rating = rating;
        if(platforms) where.platforms = platforms;
        if(genres) where.genres = genres;

        condition.where= where;

        
    }catch(err){
        console.log(err)
    }
})

module.exports = router;
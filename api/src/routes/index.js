const { Router } = require('express');
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames",  (req, res) => {
    const videogames = fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
        .then(game => game.json());    
    
    res.json(videogames)
})


module.exports = router;

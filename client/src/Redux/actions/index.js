import axios from 'axios'

export const ALL_GAMES = "ALL_GAMES";
export const GAME_DETAIL = "GAME_DETAIL";
export const CREATE_NEW_GAME= "CREATE_NEW_GAME";
export const CLEAN_STATE = "CLEAN_STATE";

export const allGames = () => {
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/videogames");

        if(response.data.length){
            const videogame = response.data.map(elem =>{
                return{
                    id: elem.id,
                    name: elem.name,
                    genres: elem.genres.join(" - "),
                    image: elem.image,
                    rating: elem.rating
                }
            });
            dispatch({type: ALL_GAMES, payload: videogame})
        };
    };
};

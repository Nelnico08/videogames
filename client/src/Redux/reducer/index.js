import { 
  ALL_GAMES, 
  CLEAN_STATE,
  FILTER_BY_CREATION,
  FILTER_BY_GENRE,
  GAME_DETAIL, 
  GET_GAME, 
  GET_GENRES,
  ORDER_BY_NAME,
  ORDER_BY_RATING
} from '../actionTypes';

const initialState = {
  videogames: [], //para guardar todos los juegos (api + db)
  games: [], //para guardar solo los juegos al buscar un juego, filtrar por creacion o genero u ordenar
  gameDetail: {},
  genres: [],
}

const rootReducer = (state = initialState, action) => {
  switch(action.type){
    case ALL_GAMES:
      return{
        ...state,
        videogames: [...state.videogames, ...action.payload]
      }
    case GAME_DETAIL: 
      return{
        ...state,
        gameDetail: action.payload
      }
    case GET_GAME:
      return{
        ...state,
        games: [...state.games, ...action.payload]
      }
    case GET_GENRES:
      return{
        ...state,
        genres: [...state.genres, ...action.payload]
      }
    case FILTER_BY_CREATION:
      let filterGame;
      if(action.payload === 'original games'){
        let filterOrigin = state.videogames.filter(e=> e.id.toString().length < 7);
        filterGame = filterOrigin;
      };
      if(action.payload === 'created games'){
        let filterCreated = state.videogames.filter(e => e.id.toString().length > 6);
        filterGame = filterCreated;

        if(!filterGame.length){
          filterGame = ['No games created']
        };
      };
      if(action.payload === 'all games'){
        filterGame = state.videogames;
      };
      return{
        ...state,
        games: filterGame
      };
    case FILTER_BY_GENRE:
      const filterGames = state.videogames;
      const genreFilter = action.payload === 'all games' ? filterGames : filterGames.filter(e=> e.genres.includes(action.payload))
      return{
        ...state,
        games: genreFilter
      }
    case ORDER_BY_NAME:
      let alphabeticOrder = state.videogames;
      if(action.payload === 'A-Z'){   
        alphabeticOrder = alphabeticOrder.sort((a,b) =>{
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0
        })
      }else{
        alphabeticOrder = alphabeticOrder.sort((a,b) =>{
          if(a.name < b.name) return 1;
          if(a.name > b.name) return -1;
          return 0
        })
      };
      return{
        ...state,
        games: alphabeticOrder
      }
    case ORDER_BY_RATING:
      let ratingOrder = state.videogames;
      if(action.payload === 'higher'){
        alphabeticOrder = alphabeticOrder.sort((a,b) =>{
          if(a.rating < b.rating) return 1;
          if(a.rating > b.rating) return -1;
          return 0
        })
      }else{
        alphabeticOrder = alphabeticOrder.sort((a,b) =>{
          if(a.rating < b.rating) return -1;
          if(a.rating > b.rating) return 1;
          return 0
        })
      };
      return{
        ...state,
        games: ratingOrder
      }
    case CLEAN_STATE:
      return{
        ...state,
        gameDetail: action.payload
      }
    default:
      return state;
  }
};

export default rootReducer;
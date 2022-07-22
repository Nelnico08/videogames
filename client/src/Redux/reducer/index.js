import {
  ALL_GAMES,
  CLEAN_DETAIL_STATE,
  CLEAN_VIDEOGAME_STATE,
  DELETE_GAME,
  FILTER_BY_CREATION,
  FILTER_BY_GENRE,
  GAME_DETAIL,
  GET_GAME,
  GET_GENRES,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
} from '../actionTypes';

const initialState = {
  videogames: [],
  games: [], //copia de videogames
  gameDetail: {},
  genres: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_GAMES:
      return {
        ...state,
        videogames: action.payload,
        games: action.payload,
      };
    case GAME_DETAIL:
      return {
        ...state,
        gameDetail: action.payload,
      };
    case GET_GAME:
      let theGame;
      if (action.payload === "Can't find game") {
        theGame = ["Can't find game"];
      } else {
        theGame = action.payload;
      }
      return {
        ...state,
        videogames: theGame,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case FILTER_BY_CREATION:
      let filterGame;
      if (action.payload === 'Original Games') {
        let filterOrigin = state.games?.filter(
          (e) => e.id.toString().length < 7
        );
        filterGame = filterOrigin;
      }
      if (action.payload === 'Added Games') {
        let filterCreated = state.games?.filter(
          (e) => e.id.toString().length > 6
        );
        filterGame = filterCreated;

        if (!filterGame.length) {
          filterGame = ['No games created'];
        }
      }
      if (action.payload === 'All Games') {
        filterGame = state.games;
      }
      return {
        ...state,
        videogames: filterGame,
      };
    case FILTER_BY_GENRE:
      const filterGames = state.games;
      let genreFilter =
        action.payload === 'All Genres'
          ? filterGames
          : filterGames.filter((e) => e.genres?.includes(action.payload));
      return {
        ...state,
        videogames: genreFilter,
      };
    case ORDER_BY_NAME:
      let orderGames = state.games;
      let alphabeticOrder =
        action.payload === 'A-Z'
          ? orderGames.sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            })
          : orderGames.sort((a, b) => {
              if (a.name < b.name) return 1;
              if (a.name > b.name) return -1;
              return 0;
            });

      return {
        ...state,
        videogames: alphabeticOrder,
      };
    case ORDER_BY_RATING:
      let ratingOrder =
        action.payload === 'higher rating'
          ? state.videogames.sort((a, b) => {
              if (a.rating < b.rating) return 1;
              if (a.rating > b.rating) return -1;
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.rating < b.rating) return -1;
              if (a.rating > b.rating) return 1;
              return 0;
            });
      return {
        ...state,
        videogames: ratingOrder,
      };
    case CLEAN_VIDEOGAME_STATE:
      return {
        ...state,
        videogames: action.payload,
      };
    case CLEAN_DETAIL_STATE:
      return {
        ...state,
        gameDetail: action.payload,
      };
    case DELETE_GAME:
      return {
        ...state,
        videogames: state.videogames.filter(
          (elem) => elem.id !== action.payload
        ),
        games: state.games.filter((elem) => elem.id !== action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;

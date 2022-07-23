import axios from 'axios';
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

export const allGames = () => {
  return async function (dispatch) {
    try {
      const response = (await axios.get('/videogames')).data;

      if (!response.length) throw new Error('Videogames not found');
      if (response.length) {
        const videogame = response.map((elem) => {
          return {
            id: elem.id,
            name: elem.name,
            genres: elem.genres,
            image: elem.image,
            rating: elem.rating,
          };
        });
        dispatch({ type: ALL_GAMES, payload: videogame });
      }
    } catch (err) {
      return err.messaje;
    }
  };
};

export const gameDetail = (id) => {
  return async function (dispatch) {
    try {
      const videogame = (await axios.get(`/videogame/${id}`)).data;

      dispatch({ type: GAME_DETAIL, payload: videogame });
    } catch (err) {
      return err.message;
    }
  };
};

export const getGame = (game) => {
  return async function (dispatch) {
    try {
      const games = (await axios.get(`/videogames?name=${game}`)).data;
      dispatch({ type: GET_GAME, payload: games });
    } catch (err) {
      return err.message;
    }
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    try {
      const genres = (await axios.get('/genres')).data;
      dispatch({ type: GET_GENRES, payload: genres });
    } catch (err) {
      return err.message;
    }
  };
};

export const filterByCreation = (filter) => {
  return {
    type: FILTER_BY_CREATION,
    payload: filter,
  };
};

export const filterByGenre = (filter) => {
  return {
    type: FILTER_BY_GENRE,
    payload: filter,
  };
};

export const orderByName = (order) => {
  return {
    type: ORDER_BY_NAME,
    payload: order,
  };
};

export const orderByRating = (order) => {
  return {
    type: ORDER_BY_RATING,
    payload: order,
  };
};

export const createNewGame = (newVideogame) => {
  return async function () {
    try {
      const postGame = await axios.post('/videogames', newVideogame);
      const postGameData = postGame.data;
      return postGameData;
    } catch (err) {
      return err.message;
    }
  };
};

export const cleanVideogamesState = () => {
  return {
    type: CLEAN_VIDEOGAME_STATE,
    payload: [],
  };
};

export const cleanDetailState = () => {
  return {
    type: CLEAN_DETAIL_STATE,
    payload: {},
  };
};

export const deleteGame = (id) => {
  return async function (dispatch) {
    try {
      const deletedGame = await axios.delete(`/videogames/${id}`, id);
      dispatch({ type: DELETE_GAME, payload: deletedGame.data });
    } catch (err) {
      return err.message;
    }
  };
};

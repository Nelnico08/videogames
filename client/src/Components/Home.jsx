import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  allGames,
  cleanVideogamesState,
  filterByCreation,
  filterByGenre,
  getGame,
  orderByName,
  orderByRating,
} from '../Redux/actions';
import Cards from './Cards';
import NavBar from './NavBar';
import Pagination from './Pagination';
import style from '../Styles/Home.module.css';

export default function Home() {
  const videogames = useSelector((state) => state.videogames);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  // const [order, setOrder] = useState('');
  const [selects, setSelects] = useState({
    order: '',
    genres: '',
    created: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allGames());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(cleanVideogamesState());
    };
  }, [dispatch]);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  let currentGames = videogames?.slice(indexOfFirstGame, indexOfLastGame);
  const allVideogames = videogames.length;

  //handlers de paginado
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 1) return;
    setCurrentPage(prevPage);
  };

  const nextHandler = () => {
    const nextPage = currentPage + 1;
    if (indexOfLastGame >= allVideogames) return;
    setCurrentPage(nextPage);
  };

  //handlers del Navbar
  const genreHandler = (e) => {
    e.preventDefault();
    setSelects({
      ...selects,
      genres: e.target.value,
    });
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
  };
  const createdGameHandler = (e) => {
    e.preventDefault();
    setSelects({
      ...selects,
      created: e.target.value,
    });
    dispatch(filterByCreation(e.target.value));
    setCurrentPage(1);
  };
  const sortHandler = (e) => {
    e.preventDefault();
    if (e.target.value === 'A-Z' || e.target.value === 'Z-A') {
      dispatch(orderByName(e.target.value));
      setSelects({
        ...selects,
        order: `${e.target.value}`,
      });
      setCurrentPage(1);
    }
    if (
      e.target.value === 'higher rating' ||
      e.target.value === 'lower rating'
    ) {
      dispatch(orderByRating(e.target.value));
      setSelects({
        ...selects,
        order: `${e.target.value}`,
      });
      setCurrentPage(1);
    }
    if (e.target.value === 'null') {
      dispatch(cleanVideogamesState());
      dispatch(allGames());
      setSelects({
        ...selects,
        order: `${e.target.value}`,
      });
      setCurrentPage(1);
    }
  };
  const resetFiltersHandler = (e) => {
    e.preventDefault();
    dispatch(cleanVideogamesState());
    dispatch(allGames());
    setSelects({
      order: '',
      genres: '',
      created: '',
    });
  };
  const resetGames = (e) => {
    resetFiltersHandler(e);
  };

  //buscador
  const searchGame = (game) => {
    dispatch(getGame(game));
    dispatch(cleanVideogamesState());
    setCurrentPage(1);
  };

  return (
    <div className={style.content}>
      <NavBar
        genreHandler={genreHandler}
        createdGameHandler={createdGameHandler}
        sortHandler={sortHandler}
        resetFiltersHandler={resetFiltersHandler}
        searchGame={searchGame}
        resetGames={resetGames}
        selects={selects}
      />
      <div>
        <Cards videogames={currentGames} />
        <Pagination
          gamesPerPage={gamesPerPage}
          allVideogames={allVideogames}
          paginate={paginate}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
        />
      </div>
    </div>
  );
}

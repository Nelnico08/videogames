import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  allGames,
  cleanVideogamesState,
  filterByCreation,
  filterByGenre,
  filterByYears,
  getGame,
  orderByName,
  orderByRating,
} from '../Redux/actions';
import Cards from './Cards';
import NavBar from './NavBar';
import style from '../Styles/Home.module.css';

export default function Home() {
  const videogames = useSelector((state) => state.videogames);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const [selects, setSelects] = useState({
    order: '',
    genres: '',
    created: '',
    years: '',
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
  const currentGames = videogames?.slice(indexOfFirstGame, indexOfLastGame);
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
      order: '',
      created: '',
      years: '',
      genres: e.target.value,
    });
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
  };
  const createdGameHandler = (e) => {
    e.preventDefault();
    setSelects({
      order: '',
      genres: '',
      created: e.target.value,
    });
    dispatch(filterByCreation(e.target.value));
    setCurrentPage(1);
  };
  const yearsHandler = (e) => {
    e.preventDefault();
    setSelects({
      order: '',
      genres: '',
      created: '',
      years: e.target.value,
    });
    dispatch(filterByYears(e.target.value));
    setCurrentPage(1);
  };
  const sortHandler = (e) => {
    e.preventDefault();
    if (e.target.value === 'A-Z' || e.target.value === 'Z-A') {
      dispatch(orderByName(e.target.value));
      setSelects({
        created: '',
        genres: '',
        years: '',
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
        created: '',
        genres: '',
        years: '',
        order: `${e.target.value}`,
      });
      setCurrentPage(1);
    }
    if (e.target.value === 'null') {
      dispatch(cleanVideogamesState());
      dispatch(allGames());
      setSelects({
        created: '',
        genres: '',
        years: '',
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
      years: '',
    });
    setCurrentPage(1);
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
        yearsHandler={yearsHandler}
        selects={selects}
      />
      <div>
        <Cards
          videogames={currentGames}
          gamesPerPage={gamesPerPage}
          allVideogames={allVideogames}
          paginate={paginate}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

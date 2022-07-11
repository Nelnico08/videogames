import React from 'react';
import { Link } from 'react-router-dom';
import { all_genres } from '../Genres_Platforms/GenresPlatforms';
import SearchBar from './SearchBar';
import style from '../Styles/NavBar.module.css';

export default function NavBar({
  genreHandler,
  createdGameHandler,
  sortHandler,
  resetFiltersHandler,
  searchGame,
  resetGames,
}) {
  return (
    <div className={style.content}>
      <SearchBar searchGame={searchGame} />
      <div>
        <button className={style.Buttons} onClick={(e) => resetGames(e)}>
          All videogames
        </button>
        <Link to="/videogame/create">
          <input
            className={style.Buttons}
            type="button"
            value="Post videogame"
          />
        </Link>
        <h3 className={style.filterTitle}>Filters</h3>
        {/*select con 20 options => 19generos y all games */}
        <select onChange={(e) => genreHandler(e)} className={style.selects}>
          <option value="All Genres">All Genres</option>
          {all_genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {/*select con 3 options */}
        <select
          onChange={(e) => createdGameHandler(e)}
          className={style.selects}
        >
          <option value="All Games">All Videogames</option>
          <option value="Original Games">Original Videogames</option>
          <option value="Added Games">Added Videogames</option>
        </select>
      </div>
      <div>
        {/*select con 5 options */}
        <select onChange={(e) => sortHandler(e)} className={style.selects}>
          <option value="null">Sort by</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="higher rating">Higher rating</option>
          <option value="lower rating">Lower rating</option>
        </select>
      </div>

      <button className={style.Buttons} onClick={(e) => resetFiltersHandler(e)}>
        Reset filters
      </button>
    </div>
  );
}

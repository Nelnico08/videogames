import React from 'react';
import { Link } from 'react-router-dom';
import { all_genres, all_years } from '../Genres_Platforms/GenresPlatforms';
import SearchBar from './SearchBar';
import style from '../Styles/NavBar.module.css';

export default function NavBar({
  genreHandler,
  createdGameHandler,
  sortHandler,
  resetFiltersHandler,
  searchGame,
  resetGames,
  selects,
  yearsHandler,
}) {
  return (
    <div className={style.content}>
      <div>
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
          <select
            onChange={(e) => genreHandler(e)}
            className={style.selects}
            value={selects.genres}
          >
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
            value={selects.created}
          >
            <option value="All Games">All Videogames</option>
            <option value="Original Games">Original Videogames</option>
            <option value="Added Games">Added Videogames</option>
          </select>
          <select
            onChange={(e) => yearsHandler(e)}
            className={style.selects}
            value={selects.years}
          >
            <option value="">Years</option>
            {all_years.map((filter, i) => (
              <option key={i} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/*select con 5 options */}
          <select
            onChange={(e) => sortHandler(e)}
            className={style.selects}
            value={selects.order}
          >
            <option value="null">Sort by</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="higher rating">Higher rating</option>
            <option value="lower rating">Lower rating</option>
          </select>
        </div>
        <button
          className={style.Buttons}
          onClick={(e) => resetFiltersHandler(e)}
        >
          Reset filters
        </button>
      </div>
      <div className={style.authorContent}>
        <p className={style.author}>
          Made by <b>Nelson Escurra</b>
        </p>
        <p className={style.author}>contact me on:</p>
        <div className={style.socialLinks}>
          <p className={style.author}>~</p>
          <a
            href="https://twitter.com/Nelnico08"
            className={style.author}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <p className={style.author}>~</p>
          <a
            href="https://www.instagram.com/nelnico08"
            className={style.author}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <p className={style.author}>~</p>
          <a
            href="https://www.linkedin.com/in/nelson-n-escurra-966a50213/"
            className={style.author}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <p className={style.author}>~</p>
          <a
            href="https://github.com/Nelnico08"
            className={style.author}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <p className={style.author}>~</p>
        </div>
      </div>
    </div>
  );
}

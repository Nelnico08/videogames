import React from 'react';
import { Link } from 'react-router-dom';
import { all_genres } from '../Genres_Platforms/GenresPlatforms';
import SearchBar from './SearchBar';
// import style from '../Styles/NavBar.css'

export default function NavBar({
  genreHandler,
  createdGameHandler,
  sortHandler,
  resetFiltersHandler,
  searchGame,
  resetGames,
}) {
  return (
    <div>
      <SearchBar searchGame={searchGame} />
      <div>
        <h3>Filters</h3>
        {/*select con 20 options => 19generos y all games */}
        <select onChange={(e) => genreHandler(e)}>
          <option value="All Genres">All Genres</option>
          {all_genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {/*select con 3 options */}
        <select onChange={(e) => createdGameHandler(e)}>
          <option value="All Games">All Videogames</option>
          <option value="Original Games">Original Videogames</option>
          <option value="Added Games">Added Videogames</option>
        </select>
      </div>
      <div>
        {/*select con 5 options */}
        <select onChange={(e) => sortHandler(e)}>
          <option value="null">Sort by</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="higher rating">Higher rating</option>
          <option value="lower rating">Lower rating</option>
        </select>
      </div>
      <button onClick={(e) => resetGames(e)}>All videogames</button>
      <button onClick={(e) => resetFiltersHandler(e)}>Reset filters</button>
      <Link to="/videogame/create">
        <input type="button" value="Add new videogame" />
      </Link>
    </div>
  );
}

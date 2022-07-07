import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
// import style from '../Styles/NavBar.css'

export default function NavBar({ genreHandler, createdGameHandler, sortHandler, resetFiltersHandler }) {

  return (
    <div>
      <SearchBar/>
      <div>
        <h3>Filters</h3>
        <select onChange={(e)=>genreHandler(e)}>
          <option value='All Genres'>All Genres</option>
          <option value='Action'>Action</option>
          <option value='Indie'>Indie</option>
          <option value='Adventure'>Adventure</option>
          <option value='RPG'>RPG</option>
          <option value='Strategy'>Strategy</option>
          <option value='Shooter'>Shooter</option>
          <option value='Casual'>Casual</option>
          <option value='Simulation'>Simulation</option>
          <option value='Puzzle'>Puzzle</option>
          <option value='Arcade'>Arcade</option>
          <option value='Platformer'>Platformer</option>
          <option value='Racing'>Racing</option>
          <option value='Massively Multiplayer'>Massively Multiplayer</option>
          <option value='Sports'>Sports</option>
          <option value='Fighting'>Fighting</option>
          <option value='Family'>Family</option>
          <option value='Board Games'>Board Games</option>
          <option value='Educational'>Educational</option>
          <option value='Card'>Card</option>
        </select>
        <select onChange={(e) => createdGameHandler(e)}>
          <option value='All Games'>All Videogames</option>
          <option value='Original Games'>Original Videogames</option>
          <option value='Added Games'>Added Videogames</option>
        </select>
      </div>
    <div>
      <select onChange={(e)=> sortHandler(e)}>
        <option value='null'>Sort by</option>
        <option value='A-Z'>A-Z</option>
        <option value='Z-A'>Z-A</option>
        <option value='higher rating'>Higher rating</option>
        <option value='lower rating'>Lower rating</option>
      </select>
      {/* <select onChange={alphabeticHandler}>
        <option>Alphabetic</option>
        <option value='A-Z'>A-Z</option>
        <option value='Z-A'>Z-A</option>
      </select>
      <select onChange={(e)=> ratingSortHandler(e)}>
        <option>Rating</option>
        <option value='higher rating'>Higher rating</option>
        <option value='lower rating'>Lower rating</option>
      </select> */}
    </div>
    <button onClick={(e) => resetFiltersHandler(e)}>Reset filters</button>
    <Link to='/videogame/create'>
      <input type='button' value='Add new videogame'/>
    </Link>
    </div>
  )
}

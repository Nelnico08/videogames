import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
// import style from '../Styles/NavBar.css'

export default function NavBar() {
  return (
    <div>
      <SearchBar/>
      <div>
        <label>Genres </label>
        <select>
          <option></option>
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
      </div>
    <div>
      <label>Filter by </label>
      <select>
        <option></option>
        <option value='A-Z'>A-Z</option>
        <option value='Z-A'>Z-A</option>
        <option value='higher rating'>Higher rating</option>
        <option value='Lower rating'>Lower rating</option>
      </select>
    </div>
    <Link to='/videogame/create'>
      <input type='button' value='Post new videogame'/>
    </Link>
    </div>
  )
}

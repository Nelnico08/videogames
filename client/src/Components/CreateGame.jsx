import React from 'react';
// import style from '../Styles/CreateGame.css';

export default function CreateGame() {
  return (
    <form>
      <h2>Post new videogame</h2>
      <label>Name: </label>
      <input type='text' placeholder='Name'/>
      <label>Released: </label>
      <input type='date'/>
      <label>Rating: </label>
      <input type='number' placeholder='between 1-5'/>
      <label>Genres: </label>
      <select multiple value='Genres'>
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
      <label>Platforms: </label>
      <select multiple>
        <option value='despues sigo'>despues sigo</option>
      </select>
      <label>Description: </label>
      <input type='text' placeholder='Description...'/>
      <button type='submit'>Post new videogame</button>
    </form>
  )
}

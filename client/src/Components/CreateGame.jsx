import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createNewGame } from '../Redux/actions';
import { all_genres, all_platforms } from '../Genres_Platforms/GenresPlatforms';
// import style from '../Styles/CreateGame.css';

export default function CreateGame() {
  const [newVideogame, setNewVideogame] = useState({
    name: '',
    released: '',
    rating: 0,
    genres: [],
    platforms: [],
    description: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOnChange = (e) => {
    e.preventDefault();
    setNewVideogame({ name: e.target.value });
  };

  return (
    <div>
      <Link to="/home">
        <button>Back to home</button>
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // dispatch(createNewGame(newVideogame));
          history.push('/home');
        }}
      >
        <h2>Post new videogame</h2>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newVideogame.name}
          onChange={handleOnChange}
        />
        <label>Released: </label>
        <input
          type="date"
          name="released"
          value={newVideogame.released}
          onChange={handleOnChange}
        />
        <label>Rating: </label>
        <input
          type="number"
          placeholder="between 1-5"
          name="rating"
          value={newVideogame.rating}
          onChange={handleOnChange}
        />
        <div>
          <label>Genres: </label>
          {/*select con 19 opciones de generos */}
          <select
            multiple
            name="genres"
            value={newVideogame.genres}
            onChange={handleOnChange}
          >
            {all_genres.map((genre) => (
              <option value={genre}>{genre}</option>
            ))}
          </select>
          <ul>
            {newVideogame.genres?.map((genre) => (
              <li>{genre}</li>
            ))}
          </ul>
        </div>

        <label>Platforms: </label>
        {/*select con 12 opciones de plataformas */}
        <select
          multiple
          name="platforms"
          value={newVideogame.platforms}
          onChange={handleOnChange}
        >
          {all_platforms.map((platform) => (
            <option value={platform}>{platform}</option>
          ))}
        </select>
        <label>Description: </label>
        <input
          type="text"
          placeholder="Description..."
          name="description"
          value={newVideogame.description}
          onChange={handleOnChange}
        />
        <button type="submit">Post new videogame</button>
      </form>
    </div>
  );
}

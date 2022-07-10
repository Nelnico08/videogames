import React from 'react';
import { all_genres } from '../../Genres_Platforms/GenresPlatforms';

export default function Genres({ genres, handleOnChange, error }) {
  return (
    <div>
      <label>Genres: </label>
      {/*select con 19 opciones de generos */}
      <select
        multiple={true}
        name="genres"
        value={genres}
        onChange={handleOnChange}
      >
        {all_genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      {error && <span>{error}</span>}
    </div>
  );
}

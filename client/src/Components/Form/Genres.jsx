import React from 'react';
import { all_genres } from '../../Genres_Platforms/GenresPlatforms';
import style from '../../Styles/Forms.module.css';

export default function Genres({
  genres,
  handleOnChange,
  error,
  resetGenreSelects,
}) {
  return (
    <div className={style.content}>
      <label className={style.label}>Genres*: </label>
      {/*select con 19 opciones de generos */}
      <select
        multiple={true}
        name="genres"
        value={genres}
        onChange={handleOnChange}
        className={style.selects}
      >
        {all_genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <button onClick={resetGenreSelects} className={style.resetSelectsButtons}>
        Reset
      </button>
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
}

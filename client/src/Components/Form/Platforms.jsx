import React from 'react';
import { all_platforms } from '../../Genres_Platforms/GenresPlatforms';
import style from '../../Styles/Forms.module.css';

export default function Platforms({ platforms, handleOnChange, error }) {
  return (
    <div className={style.content}>
      <label className={style.label}>Platforms*: </label>
      {/*select con 12 opciones de plataformas */}
      <select
        multiple
        name="platforms"
        value={platforms}
        onChange={handleOnChange}
        className={style.selects}
      >
        {all_platforms.map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
}

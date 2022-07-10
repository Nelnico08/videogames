import React from 'react';
import { all_platforms } from '../../Genres_Platforms/GenresPlatforms';

export default function Platforms({ platforms, handleOnChange, error }) {
  return (
    <div>
      <label>Platforms: </label>
      {/*select con 12 opciones de plataformas */}
      <select
        multiple
        name="platforms"
        value={platforms}
        onChange={handleOnChange}
      >
        {all_platforms.map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>
      {error && <span>{error}</span>}
    </div>
  );
}

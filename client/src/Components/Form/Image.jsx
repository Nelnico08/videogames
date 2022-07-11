import React from 'react';
import style from '../../Styles/Forms.module.css';

export default function Image({ image, handleOnChange, error }) {
  return (
    <div className={style.content}>
      <label className={style.label}>Image*: </label>
      <input
        type="text"
        name="image"
        value={image}
        onChange={handleOnChange}
        placeholder="http://image_example.com"
        className={style.input}
      />
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
}

import React from 'react';
import style from '../../Styles/Forms.module.css';

export default function Rating({ rating, handleOnChange }) {
  return (
    <div className={style.content}>
      <label className={style.label}>Rating: </label>
      <input
        type="number"
        placeholder="between 1-5"
        min={0.0}
        max={5.0}
        name="rating"
        value={rating}
        onChange={handleOnChange}
        className={style.input}
      />
    </div>
  );
}

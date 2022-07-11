import React from 'react';
import style from '../../Styles/Forms.module.css';

export default function Name({ name, handleOnChange, error }) {
  return (
    <div className={style.content}>
      <label className={style.label}>Name: </label>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleOnChange}
        className={style.input}
      />
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
}

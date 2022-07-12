import React from 'react';
import style from '../../Styles/Forms.module.css';

export default function Released({ released, handleOnChange, error }) {
  return (
    <div className={style.content}>
      <label className={style.label}>Released*: </label>
      <input
        type="date"
        name="released"
        value={released}
        onChange={handleOnChange}
        className={style.input}
      />
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
}

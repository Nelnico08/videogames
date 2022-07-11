import React from 'react';
import style from '../../Styles/Forms.module.css';

export default function Description({ description, handleOnChange, error }) {
  return (
    <div className={style.content}>
      {/* <label>Description: </label> */}
      <textarea
        type="textarea"
        placeholder="Description* (30 characters are required)"
        name="description"
        value={description}
        onChange={handleOnChange}
        maxLength={255}
        className={`${style.input} ${style.descriptionInput}`}
      />
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
}

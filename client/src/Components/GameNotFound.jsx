import React from 'react';
import crash from '../Images/crashDeath.jpg';
import style from '../Styles/GameNotFound.module.css';

export default function GameNotFound() {
  return (
    <div className={style.content}>
      <img src={crash} alt="crash" className={style.image} />
      <h2 className={style.title}>No games found</h2>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import crash from '../Images/CrashThink.jpg';
import style from '../Styles/Invalid.module.css';

export default function Invalid() {
  return (
    <div className={style.content}>
      <img src={crash} alt="Crash thinking" className={style.image} />
      <h2 className={style.status}>404 Not found</h2>
      <Link to="/home">
        <button className={style.back}>Back to home</button>
      </Link>
    </div>
  );
}

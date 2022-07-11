import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Styles/Landing.module.css';

export default function Landing() {
  return (
    <div className={style.content}>
      <h1 className={style.welcome}>Henry Videogames</h1>
      <Link to="Home">
        <button className={style.startButton}>Start</button>
      </Link>
    </div>
  );
}

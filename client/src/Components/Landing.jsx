import React from 'react';
import { Link } from 'react-router-dom';
// import style from '../Styles/Landing.css';

export default function Landing() {
  return (
    <div>
      <h1>Henry Videogames</h1>
      <Link to="Home">
        <button>Start</button>
      </Link>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Styles/Card.module.css';

export default function Card({ name, genres, image, rating, id }) {
  return (
    <div className={style.content}>
      <Link to={`/videogames/${id}`}>
        <p>{name}</p>
        <p>generos: {genres?.join(' - ')}</p>
        <p>rating: {rating}</p>
        <img src={image} alt="videogame" />
      </Link>
    </div>
  );
}

import React from 'react';
// import style from '../Styles/Card.css'

export default function Card({name, genre, image}) {
  return (
    <div>
      <p>{name}</p>
      <p>genero: {genre.join(", ")}</p>
      <p>{image}</p>
    </div>
  )
}

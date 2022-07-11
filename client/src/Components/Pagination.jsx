import React from 'react';
import style from '../Styles/Pagination.module.css';

export default function Pagination({
  gamesPerPage,
  allVideogames,
  paginate,
  prevHandler,
  nextHandler,
}) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allVideogames / gamesPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className={style.content}>
      <button
        onClick={() => prevHandler()}
        className={style.prevButton}
      ></button>
      <ul className={style.numPages}>
        {pageNumber &&
          pageNumber?.map((number) => (
            <li key={number}>
              <button onClick={() => paginate(number)}>{number}</button>
            </li>
          ))}
      </ul>
      <button
        onClick={() => nextHandler()}
        className={style.nextButton}
      ></button>
    </nav>
  );
}

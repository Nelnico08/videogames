import React from 'react';
import style from '../Styles/Pagination.module.css';

export default function Pagination({
  gamesPerPage,
  allVideogames,
  paginate,
  prevHandler,
  nextHandler,
  currentPage,
}) {
  const pageNumber = [];
  const maxPage = Math.ceil(allVideogames / gamesPerPage);

  for (let i = 1; i <= maxPage; i++) {
    pageNumber.push(i);
  }

  return (
    <nav className={style.content}>
      <button
        onClick={() => prevHandler()}
        className={
          currentPage === 1
            ? `${style.prevButton} ${style.currentPage}`
            : `${style.prevButton}`
        }
      ></button>
      <ul className={style.numPages}>
        {pageNumber &&
          pageNumber?.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={
                  currentPage === number ? `${style.currentPage}` : null
                }
              >
                {number}
              </button>
            </li>
          ))}
      </ul>
      <button
        onClick={() => nextHandler()}
        className={
          currentPage === maxPage
            ? `${style.nextButton} ${style.currentPage}`
            : `${style.nextButton}`
        }
      ></button>
    </nav>
  );
}

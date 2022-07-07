import React from 'react'

export default function Pagination({ gamesPerPage, allVideogames, paginate, prevHandler, nextHandler }) {

  const pageNumber = [];

  for(let i = 1; i<= Math.ceil(allVideogames/gamesPerPage); i++){
    pageNumber.push(i)
  };

  return (
    <nav>
      <ul>
        <button onClick={()=> prevHandler()}>PREV</button>
        {
          pageNumber && pageNumber?.map(number => (
            <li key={number}>
              <button onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          ))
        }
        <button onClick={() => nextHandler()}>NEXT</button>
      </ul>
    </nav>
  )
}

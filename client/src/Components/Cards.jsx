import React from 'react';
import Card from './Card';
import GameNotFound from './GameNotFound';
import Loading from './Loading'
// import style from '../Styles/Cards.css'

export default function Cards({videogames}) {

  if(videogames[0] === 'No games created'){return <GameNotFound/>};
  if(!videogames.length){return <Loading/>}

  return (
    <div>
      {
        videogames?.map(elem=>
          <Card
            id= {elem.id}
            name= {elem.name}
            genres= {elem.genres}
            image= {elem.image}
            rating={elem.rating}
            key= {elem.id}
          />
        )
      }
    </div>
  )
}

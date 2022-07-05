import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { allGames } from '../Redux/actions';
import Card from './Card';
// import style from '../Styles/Cards.css'

export default function Cards() {

  const videogames = useSelector((state) => state.videogames);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(allGames())
  },[dispatch]);

  return (
    <div>
      {
        videogames && videogames?.map(elem=>
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

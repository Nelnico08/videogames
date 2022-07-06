import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { cleanState, gameDetail } from '../Redux/actions';
// import style from '../Styles/Videogame.css';

export default function Videogame() {

  const detail = useSelector((state) => state.gameDetail);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(()=>{
    dispatch(gameDetail(id))
  },[dispatch,id]);

  useEffect(()=>{
    return () =>{
      dispatch(cleanState())
    }
  },[dispatch]);

  return (
    <header>
      <div>
        <h2>{detail.name}</h2>
        <p>Released: {detail.released}</p>
        <p>Rating: {detail.rating}</p>
        <p>Platforms: {detail.platforms?.join(' - ')}</p>
        <p>Genres: {detail.genres?.join(' - ')}</p>
        <p>Description: {detail.description}</p>
        <img src={detail.image} />
      </div>
      <Link to='/home'>
        <button>BACK TO HOME</button>
      </Link>
    </header>

  )
}

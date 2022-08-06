import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { cleanDetailState, deleteGame, gameDetail } from '../Redux/actions';
import style from '../Styles/Videogame.module.css';
import Loading from './Loading';

export default function Videogame() {
  const detail = useSelector((state) => state.gameDetail);

  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(gameDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(cleanDetailState());
    };
  }, [dispatch]);

  if (Object.keys(detail).length === 0) {
    return (
      <header className={style.content}>
        <div className={style.loader}>
          <Loading />
        </div>
      </header>
    );
  }

  const deleteVideogame = (e) => {
    dispatch(deleteGame(id));
    history.push('/home');
  };

  return (
    <header className={style.content}>
      <div className={style.detailsContent}>
        <Link to="/home">
          <button className={style.button}>BACK TO HOME</button>
        </Link>
        <h2 className={style.nameTitle}>{detail.name}</h2>
        <p className={style.details}>
          <b>Released:</b> {detail.released}
        </p>
        <p className={style.details}>
          <b>Rating:</b> {detail.rating}
        </p>
        <p className={style.details}>
          <b>Platforms:</b> {detail.platforms?.join(' - ')}
        </p>
        <p className={style.details}>
          <b>Genres:</b> {detail.genres?.join(' - ')}
        </p>
        <p className={`${style.details} ${style.description}`}>
          <b>Description:</b> {detail.description}
        </p>
        {id.length > 6 ? (
          <button onClick={deleteVideogame} className={style.deleteButton}>
            Delete
          </button>
        ) : null}
      </div>
      <div className={style.imgContent}>
        <img src={detail.image} className={style.image} alt={detail.name} />
      </div>
    </header>
  );
}

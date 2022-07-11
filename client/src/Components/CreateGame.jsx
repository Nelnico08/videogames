import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createNewGame } from '../Redux/actions';
import validation from '../Validations/Validations';
import Name from './Form/Name';
import Genres from './Form/Genres';
import Platforms from './Form/Platforms';
import Released from './Form/Released';
import Rating from './Form/Rating';
import Description from './Form/Description';
import Image from './Form/Image';
import style from '../Styles/CreateGame.module.css';

export default function CreateGame() {
  const [errors, setErrors] = useState({});
  const state = {
    name: '',
    released: '',
    rating: 0,
    image: '',
    genres: [],
    platforms: [],
    description: '',
  };
  const [newVideogame, setNewVideogame] = useState(state);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleOnChange = (e) => {
    e.preventDefault();
    let gameState;
    //transformo las primeras letras de cada palabra en mayusculas
    if (e.target.name === 'name') {
      let videogameName = e.target.value;
      videogameName = videogameName
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      setNewVideogame((prev) => {
        gameState = {
          ...prev,
          name: videogameName,
        };
        setErrors(validation(gameState));
        return gameState;
      });
      //permito valores multiples para generos y plataformas
    } else if (e.target.name === 'genres' || e.target.name === 'platforms') {
      if (newVideogame[e.target.name].includes(e.target.value)) {
        setNewVideogame((prev) => {
          gameState = {
            ...prev,
            [e.target.name]: newVideogame[e.target.name].filter(
              (elem) => elem !== e.target.value
            ),
          };
          setErrors(validation(gameState));
          return gameState;
        });
      } else {
        setNewVideogame((prev) => {
          gameState = {
            ...prev,
            [e.target.name]: [...newVideogame[e.target.name], e.target.value],
          };
          setErrors(validation(gameState));
          return gameState;
        });
      }
    } else {
      setNewVideogame((prev) => {
        gameState = {
          ...prev,
          [e.target.name]: e.target.value,
        };
        setErrors(validation(gameState));
        return gameState;
      });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length !== 0 || newVideogame === state) {
      alert('Some inputs are missing');
    } else {
      // dispatch(createNewGame(newVideogame));
      setNewVideogame(state);
      history.push('/home');
    }
  };

  console.log(errors);
  return (
    <div className={style.content}>
      <form onSubmit={(e) => handleOnSubmit(e)} className={style.formContent}>
        <h2 className={style.formTitle}>Post new videogame</h2>
        <Name
          name={newVideogame.name}
          handleOnChange={handleOnChange}
          error={errors.name}
        />
        <Released
          released={newVideogame.released}
          handleOnChange={handleOnChange}
        />
        <Rating rating={newVideogame.rating} handleOnChange={handleOnChange} />
        <Image
          image={newVideogame.image}
          handleOnChange={handleOnChange}
          error={errors.image}
        />
        <div>
          <Genres
            genres={newVideogame.genres}
            handleOnChange={handleOnChange}
            error={errors.genres}
          />
        </div>
        <Platforms
          platforms={newVideogame.platforms}
          handleOnChange={handleOnChange}
          error={errors.platforms}
        />
        <Description
          description={newVideogame.description}
          handleOnChange={handleOnChange}
          error={errors.description}
        />
        <p className={style.comment}>* Fields required</p>
        <button className={style.formButton} type="submit">
          Post videogame
        </button>
        <Link to="/home">
          <button className={style.formButton}>Back to home</button>
        </Link>
      </form>
    </div>
  );
}

import style from '../Styles/SearchBar.module.css';
import React, { useState } from 'react';

export default function SearchBar({ searchGame }) {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (input !== '') {
      searchGame(input);
      setInput('');
    }
  };

  return (
    <form className={style.content} onSubmit={(e) => handleOnSubmit(e)}>
      <input
        type="text"
        placeholder="search videogame.."
        onChange={(e) => handleInputChange(e)}
        value={input}
        className={style.input}
      />
      <input type="submit" value="Search" className={style.searchButton} />
    </form>
  );
}

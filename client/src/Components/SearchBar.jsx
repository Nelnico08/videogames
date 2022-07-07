// import style from '../Styles/SearchBar.css'
import React, { useState } from 'react';

export default function SearchBar({ searchGame }) {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchGame(input);
        setInput('');
      }}
    >
      <input
        type="text"
        placeholder="search videogame.."
        onChange={(e) => handleInputChange(e)}
        value={input}
      />
      <input type="submit" value="Search" />
    </form>
  );
}

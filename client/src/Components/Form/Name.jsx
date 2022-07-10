import React from 'react';

export default function Name({ name, handleOnChange, error }) {
  return (
    <div>
      <label>Name: </label>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleOnChange}
      />
      {error && <span>{error}</span>}
    </div>
  );
}

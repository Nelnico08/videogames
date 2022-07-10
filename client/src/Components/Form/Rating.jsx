import React from 'react';

export default function Rating({ rating, handleOnChange }) {
  return (
    <div>
      <label>Rating: </label>
      <input
        type="number"
        min={0.0}
        max={5.0}
        placeholder="between 1-5"
        name="rating"
        value={rating}
        onChange={handleOnChange}
      />
    </div>
  );
}

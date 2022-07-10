import React from 'react';

export default function Image({ image, handleOnChange, error }) {
  return (
    <div>
      <label>Image: </label>
      <input
        type="text"
        name="image"
        value={image}
        onChange={handleOnChange}
        placeholder="URL of image"
      />
      {error && <span>{error}</span>}
    </div>
  );
}

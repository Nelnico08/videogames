import React from 'react';

export default function Description({ description, handleOnChange, error }) {
  return (
    <div>
      <label>Description: </label>
      <input
        type="text"
        placeholder="Description..."
        name="description"
        value={description}
        onChange={handleOnChange}
        maxLength={255}
      />
      {error && <span>{error}</span>}
    </div>
  );
}

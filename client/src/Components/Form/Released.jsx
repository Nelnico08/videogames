import React from 'react';

export default function Released({ released, handleOnChange }) {
  return (
    <div>
      <label>Released: </label>
      <input
        type="date"
        name="released"
        value={released}
        onChange={handleOnChange}
      />
    </div>
  );
}

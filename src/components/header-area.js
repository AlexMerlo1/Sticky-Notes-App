import React from 'react';
import { useState } from 'react';
import "../style/stickynote.css";

function HeaderArea() {
  const [note, setNote] = useState('');

  const handleHeaderChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <div className={'header-area'}>
      <input
        type="text"
        value={note}
        onChange={handleHeaderChange}
        placeholder="Enter your header text"
      />
    </div>
  );
}

export default HeaderArea;
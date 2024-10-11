// src/components/SnackSelection.js

import React, { useState } from 'react';
import './SnackSelection.css'; // Create a CSS file for styling

const snacks = [
  { name: 'Chips', image: 'images/chips.jpg' },
  { name: 'Cookies', image: 'images/cookies.jpg' },
  { name: 'Popcorn', image: 'images/popcorn.jpg' },
  { name: 'Candy', image: 'images/candy.jpg' },
  { name: 'Granola Bar', image: 'images/granola.jpg' },
  { name: 'Nuts', image: 'images/nuts.jpg' },
  { name: 'Chocolate', image: 'images/chocolate.jpg' },
  { name: 'Fruit Snack', image: 'images/fruit_snack.jpg' },
  { name: 'Ice Cream', image: 'images/ice_cream.jpg' },
  { name: 'Dried Fruits', image: 'images/dried_fruits.jpg' },
];

const SnackSelection = ({ onSnackSelect }) => {
  const [currentSnackIndex, setCurrentSnackIndex] = useState(0);

  const handleYes = () => {
    onSnackSelect(snacks[currentSnackIndex]);
    nextSnack();
  };

  const handleNo = () => {
    nextSnack();
  };

  const nextSnack = () => {
    if (currentSnackIndex < snacks.length - 1) {
      setCurrentSnackIndex(currentSnackIndex + 1);
    } else {
      alert('You have completed the snack selection!');
      // Optionally reset or handle completion
    }
  };

  const currentSnack = snacks[currentSnackIndex];

  return (
    <div className="snack-selection">
      <h2>Did you eat this snack today?</h2>
      <div className="snack-item">
        <img src={currentSnack.image} alt={currentSnack.name} />
        <h3>{currentSnack.name}</h3>
      </div>
      <div className="button-group">
        <button onClick={handleYes}>Yes</button>
        <button onClick={handleNo}>No</button>
      </div>
    </div>
  );
};

export default SnackSelection;

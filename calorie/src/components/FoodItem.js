import React from 'react';

function FoodItem({ item }) {
  return (
    <div className="food-item">
      <h3>{item.name}</h3>
      <p>Calories: {item.calories} kcal</p>
      <p>Fats: {item.fat} g</p>
      <p>Proteins: {item.protein} g</p>
      <p>Carbs: {item.carbs} g</p>
    </div>
  );
}

export default FoodItem;

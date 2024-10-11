import React from 'react';

const Analytics = ({ totalCalories, mostSelectedSnack, highCalorieSnacks, insights }) => {
  return (
    <div className="analytics">
      <h3>Analytics</h3>
      <p>Total Estimated Calories: {totalCalories} kcal</p>
      <p>Most Selected Snack: {mostSelectedSnack || "None selected"}</p>
      {highCalorieSnacks.length > 0 && (
        <>
          <h4>High-Calorie Snacks (over 200 kcal):</h4>
          <ul>
            {highCalorieSnacks.map((snack, i) => (
              <li key={i}>{snack.name} - {snack.calories} kcal</li>
            ))}
          </ul>
        </>
      )}
      <p>{insights[0]}</p>
    </div>
  );
};

export default Analytics;

import React, { useState } from 'react';
import './App.css';
import ProgressBar from './ProgressBar'; // Import ProgressBar component
import './CalorieCounter.css'; // Ensure CSS file is available

const snacks = [
  { name: 'Chips', img: '/images/chips.jpg', calories: 150 },
  { name: 'Cookies', img: '/images/cookies.jpg', calories: 200 },
  { name: 'Popcorn', img: '/images/popcorn.jpg', calories: 100 },
  { name: 'Candy', img: '/images/candy.jpg', calories: 250 },
  { name: 'Granola Bar', img: '/images/granola.jpg', calories: 120 },
  { name: 'Nuts', img: '/images/nuts.jpg', calories: 170 },
  { name: 'Chocolate', img: '/images/chocolate.jpg', calories: 210 },
  { name: 'Fruit Snack', img: '/images/fruit_snack.jpg', calories: 80 },
  { name: 'Ice Cream', img: '/images/ice_cream.jpg', calories: 300 },
  { name: 'Dried Fruits', img: '/images/dried_fruits.jpg', calories: 150 }
];

// Function to provide insights based on total calories
const provideInsights = (totalCalories) => {
  if (totalCalories > 500) {
    return "It looks like your total calorie intake is a bit high. Consider balancing your snacks with fruits or veggies.";
  }
  return "Great job! You've kept your calorie intake reasonable.";
};

// Function to save user data
const saveUserData = async (selectedSnacks, totalCalories) => {
  try {
    const response = await fetch('http://localhost:5001/api/add-snack', { // Use the correct port here
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        snackChoices: selectedSnacks,
        totalCalories,
      }),
    });

    const data = await response.json();
    console.log(data.message); // Expected output: "Snack added successfully!"
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// CalorieCounter component to show total and target calories
const CalorieCounter = ({ totalCalories, targetCalories }) => {
  const fillPercentage = (totalCalories / targetCalories) * 100;
  const barColor = totalCalories > 500 ? 'red' : 'green'; // Change color based on calories

  return (
    <div className="calorie-counter-container">
      <div 
        className="calorie-counter"
        style={{
          height: `${fillPercentage}%`, // Vertical fill
          backgroundColor: barColor, // Color logic
        }}
      />
      <span>{totalCalories} Cal</span>
    </div>
  );
};

function App() {
  const [index, setIndex] = useState(0);
  const [selectedSnacks, setSelectedSnacks] = useState([]);
  const [snackTip, setSnackTip] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleYes = () => {
    const snack = snacks[index];
    
    if (selectedSnacks.some(selectedSnack => selectedSnack.name === snack.name)) {
      handleNext(); // Skip to next snack if already selected
      return;
    }

    setSelectedSnacks(prev => [...prev, snack]);

    const snackTips = {
      Chips: "Chips are tasty but can be high in sodium. Consider baked chips as a healthier option!",
      Cookies: "Cookies are delicious! Try making them with oats for added fiber.",
      Popcorn: "Popcorn can be a healthy snack if you skip the butter. Try air-popped popcorn for fewer calories.",
      Candy: "Candy can add up quickly in sugar. Opt for dark chocolate as a healthier alternative.",
      "Granola Bar": "Granola bars can be convenient, but check for added sugars. Look for ones with whole ingredients.",
      Nuts: "Nuts are a great source of protein, but remember to keep portion sizes in check.",
      Chocolate: "Chocolate is delightful, but choose dark chocolate for its antioxidants and lower sugar content.",
      "Fruit Snack": "Fruit snacks can be sugary. Fresh fruit is always a more nutritious option.",
      "Ice Cream": "Ice cream can be indulgent. How about trying a fruit sorbet next time?",
      "Dried Fruits": "Dried fruits are tasty but can be calorie-dense. Consider fresh fruits for fewer calories and more hydration.",
    };

    setSnackTip(snackTips[snack.name] || "");

    handleNext();
  };

  const handleNo = () => {
    handleNext();
  };

  const handleNext = () => {
    if (index < snacks.length - 1) {
      setIndex(index + 1);
    } else {
      const totalCalories = selectedSnacks.reduce((total, snack) => total + snack.calories, 0);
      const insights = provideInsights(totalCalories);
      setSnackTip(insights);
      setQuizCompleted(true);
      saveUserData(selectedSnacks, totalCalories);
    }
  };

  const totalCalories = selectedSnacks.reduce((total, snack) => total + snack.calories, 0);
  const targetCalories = 2000; // Set a target calorie goal
  const progress = ((index + 1) / snacks.length) * 100; // Calculate progress percentage

  return (
    <div 
      className="App animated-bg" 
      style={{ 
        backgroundImage: `url('/background.jpg')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', // Make it take up full screen
        color: '#fff' // Text color contrast
      }}
    >
      <header>
        <h1 className="title">Snack Attack Calorie Tracker</h1>
      </header>

      {!quizCompleted && <ProgressBar progress={progress} />}

      {!quizCompleted ? (
        <>
          {index < snacks.length && (
            <div className="snack-card">
              <h2>Did you eat {snacks[index].name} today?</h2>
              <div className="snack-image-container">
                <img className="snack-image" src={snacks[index].img} alt={snacks[index].name} />
              </div>
              <div className="buttons">
                <button className="yes-btn bounce" onClick={handleYes}>Yes</button>
                <button className="no-btn bounce" onClick={handleNo}>No</button>
              </div>
            </div>
          )}
          {snackTip && <p className="snack-tip animated-tip">{snackTip}</p>}
        </>
      ) : (
        <div className="summary fadeIn"> {/* Add the fadeIn class here */}
          <h2>Summary of Snacks</h2>
          <ul>
            {selectedSnacks.map((snack, index) => (
              <li key={index}>{snack.name}: {snack.calories} calories</li>
            ))}
          </ul>
          <h3>Total Calories: {totalCalories}</h3>
          <p className="snack-tip bounce">{snackTip}</p> {/* Add the bounce class for the snack tip */}
        </div>
      )}
      
      
    </div>
  );
}

export default App;

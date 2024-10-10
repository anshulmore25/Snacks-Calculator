const mongoose = require('mongoose');

// Define the schema (structure) of the snack data
const userSchema = new mongoose.Schema({
  snackChoices: [String],  // Array of snack names selected by the user
  totalCalories: Number,    // Total calorie count calculated for the user
  date: { type: Date, default: Date.now }  // The date when the quiz was completed
});

// Export the schema as a 'User' model to be used in the app
module.exports = mongoose.model('User', userSchema);

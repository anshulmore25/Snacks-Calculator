const mongoose = require('mongoose');

const snackSchema = new mongoose.Schema({
    snackChoices: [
        {
            name: { type: String, required: true },     // Name of the snack
            img: { type: String, required: true },      // Image URL of the snack
            calories: { type: Number, required: true }  // Calories for the snack
        }
    ],
    totalCalories: {
        type: Number,
        required: true, // Make this field required
    },
    date: {
        type: Date,
        default: Date.now, // Set default date to now
    },
});

const Snack = mongoose.model('Snack', snackSchema);

module.exports = Snack;

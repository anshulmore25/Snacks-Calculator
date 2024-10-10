const mongoose = require('mongoose');

const snackSchema = new mongoose.Schema({
    snackChoices: {
        type: [String], // Array of strings for snack choices
        default: [],
    },
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

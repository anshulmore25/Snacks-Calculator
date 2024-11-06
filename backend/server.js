// Import necessary modules
const Snack = require('./models/Snack'); // Adjust the path as necessary
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware to enable CORS
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from your frontend

// Middleware to parse JSON data from requests
app.use(express.json());

// Connect to MongoDB (replace 'yourMongoDBURI' with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/snackTracker')
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Endpoint to save snack data
app.post('/api/add-snack', async (req, res) => {
    console.log("Received data:", req.body); // Log the incoming request body
    try {
        const { snackChoices, totalCalories } = req.body;

        // Validate the incoming data
        if (!Array.isArray(snackChoices) || typeof totalCalories !== 'number') {
            return res.status(400).json({ message: "Invalid input data." });
        }

        // Create a new Snack instance
        const newSnack = new Snack({
            snackChoices,
            totalCalories,
        });

        // Save to the database
        await newSnack.save();
        res.status(201).json({ message: "Snack added successfully!" }); // Use 201 for created resource
    } catch (error) {
        console.error("Failed to save snack:", error); // Log error details
        res.status(500).json({ message: "Failed to save snack." }); // Send generic error message
    }
});

// Endpoint to retrieve all snacks
app.get('/api/get-snacks', async (req, res) => {
    try {
        const snacks = await Snack.find();
        if (snacks.length === 0) {
            return res.status(404).json({ message: "No snacks found." });
        }
        res.json(snacks);
    } catch (error) {
        console.error("Failed to retrieve snacks:", error);
        res.status(500).json({ error: "Failed to retrieve snacks." });
    }
});

// Endpoint to update a snack
app.put('/api/update-snack/:id', async (req, res) => {
    const { id } = req.params;
    const { snackChoices, totalCalories } = req.body;

    try {
        // Validate the input data
        if (!Array.isArray(snackChoices) || typeof totalCalories !== 'number') {
            return res.status(400).json({ message: "Invalid input data." });
        }

        const updatedSnack = await Snack.findByIdAndUpdate(id, { snackChoices, totalCalories }, { new: true });
        if (!updatedSnack) {
            return res.status(404).json({ message: "Snack not found." });
        }
        res.json(updatedSnack);
    } catch (error) {
        console.error("Failed to update snack:", error);
        res.status(500).json({ error: "Failed to update snack." });
    }
});

// Endpoint to delete a snack
app.delete('/api/delete-snack/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSnack = await Snack.findByIdAndDelete(id);
        if (!deletedSnack) {
            return res.status(404).json({ message: "Snack not found." });
        }
        res.json({ message: "Snack deleted successfully." });
    } catch (error) {
        console.error("Failed to delete snack:", error);
        res.status(500).json({ error: "Failed to delete snack." });
    }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

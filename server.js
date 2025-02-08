import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());  // For parsing JSON bodies
app.use(cors());  // For handling cross-origin requests

const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 7000;

// Check if DB_URI exists
if (!DB_URI) {
    console.error("❌ MongoDB connection string is missing in .env file!");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(DB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// API Route for creating a user
app.post('/api/user', async (req, res) => {
    try {
        // Destructure the data from the request body
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use!" });
        }

        // Create a new user instance
        const newUser = new User({ name, email, password });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        console.error("Error saving user:", err);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

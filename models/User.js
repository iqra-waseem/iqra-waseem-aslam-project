import mongoose from 'mongoose';

// Define the User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure emails are unique
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;

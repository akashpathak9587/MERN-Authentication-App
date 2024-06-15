const mongoose = require('mongoose');

// Define the User schema with validation and constraints
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address']
    },
    secPass: {
        type: String,
        // required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    resetToken: String,
    resetTokenExpires: Date
}, { timestamps: true });

// Export the User model
module.exports = mongoose.model('User', UserSchema);

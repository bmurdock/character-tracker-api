const mongoose = require('mongoose');


const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: false,
        required: true,
    },
    displayName: {
        type: String,
        unique: true,
        required: false,
    },
    aboutMe: {
        type: String,
        unique: false,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: false,
    }
}, {
    timestamps: true
});

module.exports = playerSchema;
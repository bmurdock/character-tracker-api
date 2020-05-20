const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true,
    },
    characterClass: {
        type: String,
        unique: false,
        required: true,
    },
    race: {
        type: String,
        unique: false,
        required: true,
    },
    player: {
        type: String,
        unique: false,
        required: true,
    },

}, {
    timestamps: true,
});

module.exports = characterSchema;
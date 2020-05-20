const mongoose = require('mongoose');

const racesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
        unique: false,
    }
});

module.exports = racesSchema;
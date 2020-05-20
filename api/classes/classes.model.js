const mongoose = require('mongoose');

const classesSchema = new mongoose.Schema({
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

module.exports = classesSchema;
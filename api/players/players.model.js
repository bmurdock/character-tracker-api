const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
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
        required: true,
    },
    aboutMe: {
        type: String,
        unique: false,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            unique: false,
            required: false,
            ref: "Players",
        }
    ],
}, {
    timestamps: true
});


module.exports = playerSchema;
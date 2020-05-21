const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: {
        type: String,
        unique: false,
        required: true,
    },
    characterClass: {
        type: Schema.Types.ObjectId,
        unique: false,
        required: true,
        ref: "Classes"
    },
    race: {
        type: Schema.Types.ObjectId,
        unique: false,
        required: true,
        ref: "Races"
    },
    player: {
        // This will always be the id of a Player
        type: Schema.Types.ObjectId,
        unique: false,
        required: true,
        ref: "Players"
    },

}, {
    timestamps: true,
});

module.exports = characterSchema;
const mongoose = require('mongoose');
const {UserSchema} = require("./user.model");
const allBoards = require("../GameBoards/allBoards");


const GameSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Required Field"],
    },
    players: {
        type: [UserSchema],
        required: [true, "Required Field"],
    },
    boardStatus: {
        type: Array,
        default: allBoards.standardChess()
    }
    
}, {timestamps:true});

const Game = new mongoose.model("Game", GameSchema);

module.exports = Game;
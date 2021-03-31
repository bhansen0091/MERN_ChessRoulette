const mongoose = require('mongoose');
const {UserSchema} = require("./user.model");


function createBoard(){
    const startingBoard = [];
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    for(let i=8; i>=1; i--){
        const newRow = [];
        for(let j=0; j<8; j++){
            newRow.push({
                rank: i,
                file: letters[j],
                occupied: false
            });
        }
        startingBoard.push(newRow);
    }

    startingBoard[0][0]["occupied"] = {type: "Rook", color: "black", abbrev: "R"};
    startingBoard[0][1]["occupied"] = {type: "Knight", color: "black", abbrev: "N"};
    startingBoard[0][2]["occupied"] = {type: "Bishop", color: "black", abbrev: "B"};
    startingBoard[0][3]["occupied"] = {type: "Queen", color: "black", abbrev: "Q"};
    startingBoard[0][4]["occupied"] = {type: "King", color: "black", abbrev: "K"};
    startingBoard[0][5]["occupied"] = {type: "Bishop", color: "black", abbrev: "B"};
    startingBoard[0][6]["occupied"] = {type: "Knight", color: "black", abbrev: "N"};
    startingBoard[0][7]["occupied"] = {type: "Rook", color: "black", abbrev: "R"};

    for(let i=0; i<8; i++){
        startingBoard[1][i]["occupied"] = {type: "Pawn", color: "black", abbrev: "P"};
    }

    for(let i=0; i<8; i++){
        startingBoard[6][i]["occupied"] = {type: "Pawn", color: "white", abbrev: "P"};
    }

    startingBoard[7][0]["occupied"] = {type: "Rook", color: "white", abbrev: "R"};
    startingBoard[7][1]["occupied"] = {type: "Knight", color: "white", abbrev: "N"};
    startingBoard[7][2]["occupied"] = {type: "Bishop", color: "white", abbrev: "B"};
    startingBoard[7][3]["occupied"] = {type: "Queen", color: "white", abbrev: "Q"};
    startingBoard[7][4]["occupied"] = {type: "King", color: "white", abbrev: "K"};
    startingBoard[7][5]["occupied"] = {type: "Bishop", color: "white", abbrev: "B"};
    startingBoard[7][6]["occupied"] = {type: "Knight", color: "white", abbrev: "N"};
    startingBoard[7][7]["occupied"] = {type: "Rook", color: "white", abbrev: "R"};

    return startingBoard;
}



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
        default: createBoard()
    }
    
}, {timestamps:true});

const Game = new mongoose.model("Game", GameSchema);

module.exports = Game;
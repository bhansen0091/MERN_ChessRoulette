// Pawns list of legal moves



const checkMoves =  (tile, boardStatus) => {
    const rankIdx = 8 - tile.rank;
    const fileArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const fileIdx = fileArray.indexOf(tile.file);
    const piece = tile.occupied;

    // console.log(tile);
    console.log(rankIdx);

    // console.log(`file: ${tile.file}, rank: ${tile.rank}`);
    const moves = [];
    if(piece.type === "pawn"){
        if(piece.color === "white"){
            if(!boardStatus[rankIdx-1][fileIdx].occupied) moves.push([tile.file, tile.rank + 1])
            if(tile.rank === 2){ // Let white pawns move 2 on first move:
                if(!boardStatus[rankIdx-2][fileIdx].occupied) moves.push([tile.file, 4]);
            }
        
        } else if (piece.color === "black") {
            if(!boardStatus[rankIdx+1][fileIdx].occupied) moves.push([tile.file, tile.rank - 1])
            if(tile.rank === 7){ // Let black pawns move 2 on first move:
                if(!boardStatus[rankIdx+2][fileIdx].occupied) moves.push([tile.file, 5]);
            }
        }
    }
    return moves;
}

module.exports = checkMoves;
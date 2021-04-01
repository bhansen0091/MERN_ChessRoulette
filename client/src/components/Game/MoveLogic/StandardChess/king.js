const checkMoves =  (tile, boardStatus) => {
    const rankIdx = 8 - tile.rank;
    const fileArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const fileIdx = fileArray.indexOf(tile.file);
    const piece = tile.occupied;

    const moves = [];

    let i=1;
    if(rankIdx - i >= 0 && boardStatus[rankIdx-i][fileIdx].occupied.color !== piece.color){
        moves.push([tile.file, tile.rank + i]);
    }

    if(rankIdx + i < 8 && boardStatus[rankIdx+i][fileIdx].occupied.color !== piece.color){
        moves.push([tile.file, tile.rank - i]);
    }

    if(fileIdx - i >= 0 && boardStatus[rankIdx][fileIdx-i].occupied.color !== piece.color){
        moves.push([fileArray[fileIdx-i], tile.rank]);
    }

    if(fileIdx + i < 8 && boardStatus[rankIdx][fileIdx+i].occupied.color !== piece.color){
        moves.push([fileArray[fileIdx+i], tile.rank]);
    }

    if(rankIdx + i < 8 && fileIdx + i < 8 && boardStatus[rankIdx+i][fileIdx+i].occupied.color !== piece.color){
        moves.push([fileArray[fileIdx+i], tile.rank - i]);
    }

    if(rankIdx - i >= 0 && fileIdx + i < 8 && boardStatus[rankIdx-i][fileIdx+i].occupied.color !== piece.color){
        moves.push([fileArray[fileIdx+i], tile.rank + i]);
    }

    if(rankIdx - i >= 0 && fileIdx - i >= 0 && boardStatus[rankIdx-i][fileIdx-i].occupied.color !== piece.color){
        moves.push([fileArray[fileIdx-i], tile.rank + i]);
    }

    if(rankIdx + i < 8 && fileIdx - i >= 0 && boardStatus[rankIdx+i][fileIdx-i].occupied.color !== piece.color){
        moves.push([fileArray[fileIdx-i], tile.rank - i]);
    }


    return moves;
}

module.exports = checkMoves;
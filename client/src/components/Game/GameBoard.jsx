import {useState, useEffect} from "react";
import Axios from "axios";

import styles from "./GameBoard.module.css";
// import blackBishop from "./img/blackBishop.png";

const rules = require("./MoveLogic/StandardChess/standardChessMoves")

const GameBoard = ({statusFromParent, images, gameId, whiteToPlay, parentLog, flipTurn, specialInfo, begun, playerIds}) => {

    
    const [loggedIn] = useState(JSON.parse(localStorage.getItem("user")) || {
        firstName:"No One",
        lastName: "LoggedIn"
    });
    const [boardStatus, setBoardStatus] = useState(false);
    const [moveLog, setMoveLog] = useState([]);
    const [activeTile, setActiveTile] = useState(false);
    const [availableMoves, setAvailableMoves] = useState(false);
    const [info, setInfo] = useState({});
    

    useEffect( () => {
        setBoardStatus(statusFromParent);
    }, [statusFromParent])

    useEffect( () => {
        setMoveLog(parentLog);
    }, [parentLog]);

    useEffect( () => {
        setInfo({...specialInfo, squares: "hello"});
    }, [specialInfo]);

    useEffect(() => {
        console.log(boardStatus);
    }, [whiteToPlay])


    const clickTile = (tile) => {
        if(movesToHere(tile)){

            // Check if the piece being moved is the correct color, based on turn:
            if(begun
                && (activeTile.occupied.color === "white") - (whiteToPlay) === 0
                && playerIds[whiteToPlay ? "white" : "black"] === loggedIn._id
            ){

                // build the chess-notation description of the move:
                let moveDescription = "";
                moveDescription += activeTile.occupied.type !== "pawn" ? activeTile.occupied.abbrev :
                    tile.occupied? activeTile.file.toLowerCase() : "";
                moveDescription += tile.occupied? "x" : "";
                moveDescription += tile.file.toLowerCase() + tile.rank;

                // make move on front end:
                tile.occupied = activeTile.occupied;
                activeTile.occupied = false;
                flipTurn();
                setActiveTile(false);
                setAvailableMoves(false);

                const rankIdx = 8 - tile.rank;
                const fileArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
                const fileIdx = fileArray.indexOf(tile.file);
                // Special Case: En Passant
                    // facilitate capturing
                    if(tile.occupied.type === "pawn" && tile.file === info.enPassantAvailable[0] && tile.rank === info.enPassantAvailable[1]){
                        boardStatus[tile.occupied.color === "white" ? 3 : 4][fileIdx].occupied = false;
                        moveDescription = `${activeTile.file.toLowerCase()}x`+ moveDescription;
                    }
                    // update special info if necessary
                    let enPassant = false;
                    if((tile.occupied.type === "pawn") && ((Math.abs(activeTile.rank - tile.rank)) === 2)){
                        enPassant = [tile.file, (tile.rank + activeTile.rank)/2];
                    }
                    setInfo({...info, enPassantAvailable: enPassant, squares: `${tile.file}, ${(tile.rank + activeTile.rank)/2}`});
                
                // Special Case: Castling
                    // facilitate rooks also moving
                    if(tile.occupied.type === "king" && Math.abs(fileIdx - fileArray.indexOf(activeTile.file)) === 2){
                        if(tile.file === "G"){
                            boardStatus[rankIdx][5].occupied = {...boardStatus[rankIdx][7].occupied};
                            boardStatus[rankIdx][7].occupied = false;
                        }
                        if(tile.file === "C"){
                            boardStatus[rankIdx][3].occupied = {...boardStatus[rankIdx][7].occupied};
                            boardStatus[rankIdx][0].occupied = false;
                        }
                    }
                    // update special info if necessary
                    let castlingLegalAfterThisMove = {...specialInfo.castlingLegal};
                    let castleFilesRooks = ["A", "H"], castleRanks = [1, 8];
                    for(let file of castleFilesRooks){
                        for(let rank of castleRanks){
                            if((tile.file === file && tile.rank === rank) || (activeTile.file === file && activeTile.rank === rank)){
                                castlingLegalAfterThisMove[`${file}${rank}`] = false;
                            }
                        }
                        // if(
                    }

                // add the new move to the move log (which is an array of move pairs):
                const moveLogTemp = [...moveLog];
                if((moveLogTemp.length > 0) && (moveLogTemp[moveLogTemp.length-1].length === 1)){
                    moveLogTemp[moveLogTemp.length-1].push(moveDescription);
                } else {
                    moveLogTemp.push([moveDescription])
                }
                setMoveLog(moveLogTemp);
                
                // send move to database:
                Axios.put(`http://localhost:8000/api/games/${gameId}`, {boardStatus, whiteToPlay: !whiteToPlay, moveLog: moveLogTemp, $set: {"specialInfo.enPassantAvailable": enPassant, "specialInfo.castlingLegal": castlingLegalAfterThisMove}})
                    // .then(res => console.log(res))
                    .catch(err => console.error({errors: err.errors}))
            }

            // if it's not this player's turn
            else{
                setActiveTile(false);
                setAvailableMoves(false);
            }
            return;
        }


        // setAvailableMoves(false);

        // if(activeTile[0] === tile.file && activeTile[1] === tile.rank){
        //     console.log("hello");
        //     setActiveTile(false);
        //     setAvailableMoves(false);
        // }
        // else
        if(tile.occupied){
            setActiveTile(tile);
            setAvailableMoves(rules[tile.occupied.type](tile, boardStatus, info))
        }
        else{
            setActiveTile(false);
            setAvailableMoves(false);
        }
        // setAvailableMoves(moves);
    }



    const movesToHere = tile => {
        for(let i=0; i<availableMoves.length; i++){
            if(availableMoves[i][0] === tile.file && availableMoves[i][1] === tile.rank) return true;
        }
        return false;
    }


    return (
        <div id="board">
            <h3>{whiteToPlay? "White" : "Black"}'s move</h3>
            {boardStatus?
                boardStatus.map( (row, i) =>
                    <div className={styles.tileRow} key={i}>
                        {row.map( (tile, j) =>
                            <div
                                className={`
                                    ${styles.tile}
                                    ${(i+j) % 2 === 0? styles.white : styles.black}
                                    ${activeTile.file === tile.file && activeTile.rank === tile.rank ? styles.active : ""}
                                    ${movesToHere(tile) ? 
                                        tile.occupied? styles.capture :styles.available
                                        : ""}
                                    
                                `} 
                                key={j}
                                id={`${tile.file}${tile.rank}`}
                                onClick={() => clickTile(tile)}
                            >{tile.file} {tile.rank}
                            
                                {tile.occupied? 
                                    <img 
                                        src={images[`${tile.occupied.color}${tile.occupied.type}`]} 
                                        alt={`${tile.occupied.color[0]} ${tile.occupied.abbrev}`}
                                    />
                                    : 
                                    " "
                                }
                            </div>
                        )}
                    </div>
                )
                :
                <p>Loading...</p>
            }
            <h3>Moves:</h3>
            <table className="table-bordered table-striped w-100">
                <thead>
                    <tr>
                        <th>White:</th>
                        <th>Black:</th>
                    </tr>
                </thead>
                <tbody>
                    {moveLog.map( (movePair, i) =>
                        <tr key={i}>
                            {movePair.map( (move, j) =>
                                <td key={j}>{move}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default GameBoard;
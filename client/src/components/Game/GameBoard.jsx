import {useState, useEffect} from "react";
import Axios from "axios";

import styles from "./GameBoard.module.css";
// import blackBishop from "./img/blackBishop.png";

const rules = require("./MoveLogic/StandardChess/standardChessMoves")

const GameBoard = ({statusFromParent, logStatus, images, gameId, whiteToPlay}) => {

    const [boardStatus, setBoardStatus] = useState(false);
    const [activeTile, setActiveTile] = useState(false);
    const [availableMoves, setAvailableMoves] = useState(false);

    useEffect( () => {
        setBoardStatus(statusFromParent);
    }, [statusFromParent, activeTile, availableMoves])


    const clickTile = (tile) => {
        if(movesToHere(tile)){
            tile.occupied = activeTile.occupied;
            activeTile.occupied = false;
            setActiveTile(false);
            setAvailableMoves(false);
            
            // try putting in Axios call here:
            Axios.put(`http://localhost:8000/api/games/${gameId}`, {boardStatus})
                .then(res => console.log(res))
                .catch(err => console.error({errors: err.errors}))

            // console.log("You clicked a tile where there's a move!");
            return;
        }

        setAvailableMoves(false);
        // if(activeTile[0] === tile.file && activeTile[1] === tile.rank){
        //     setActiveTile(false);
        // }
        // else
        let moves;
        if(tile.occupied){
            setActiveTile(tile);
            moves = rules[tile.occupied.type](tile, boardStatus)
        }
        else{
            setActiveTile(false);
            moves = false;
        }
        setAvailableMoves(moves);
    }

    const movesToHere = tile => {
        for(let i=0; i<availableMoves.length; i++){
            if(availableMoves[i][0] === tile.file && availableMoves[i][1] === tile.rank) return true;
        }
        return false;
    }


    return (
        <div id="board">
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
        </div>
    );
}

export default GameBoard;
import {useState, useEffect} from "react";

import styles from "./GameBoard.module.css";
import blackBishop from "./img/blackBishop.png";

const GameBoard = ({statusFromParent, logStatus, images}) => {

    const [boardStatus, setBoardStatus] = useState(false);
    const [activeTile, setActiveTile] = useState(false);
    const [availableMoves, setAvailableMoves] = useState(false);

    useEffect( () => {
        setBoardStatus(statusFromParent);
    }, [statusFromParent, activeTile])

    const activateTile = (file, rank) => {
        // console.log(boardStatus[file][rank].occupied);
        if(activeTile[0] === file && activeTile[1] === rank){
            setActiveTile(false);
            setAvailableMoves(false);
        }
        else if(boardStatus[file][rank].occupied){
            setActiveTile([file, rank]);
            console.log(boardStatus[file][rank].occupied.color, boardStatus[file][rank].occupied.type)
        }
        const moves = checkMoves(boardStatus[file][rank].occupied, file, rank)
    }

    const checkMoves = (piece, file, rank) => {
        const moves = [];
        if(piece.type === "Pawn"){
            if(piece.color === "white")
                for(let i=1; i<=2 && (!boardStatus[file][rank-i].occupied); i++){
                    moves.push([file-i, rank]);
                }
        }
        setAvailableMoves(moves);
    }


    return (
        <div id="board">
            {/* <button onClick={logStatus}>Click</button> */}
            {boardStatus?
                boardStatus.map( (row, i) =>
                    <div className={styles.row} key={i}>
                        {row.map( (tile, j) =>
                            <div
                                className={`${styles.tile} ${(i+j) % 2 === 0? styles.white : styles.black}`} 
                                key={j}
                                onClick={() => activateTile(i, j)}
                                style={activeTile[0] === i && activeTile[1] === j?
                                    {display: "inline-flex", justifyContent: "center", alignItems: "center", backgroundColor: "dodgerblue"}
                                    :
                                    {display: "inline-flex", justifyContent: "center", alignItems: "center"}
                                }
                            >
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
import {useState, useEffect} from "react";

import styles from "./GameBoard.module.css";

const GameBoard = (props) => {

    const [boardLayout, setBoardLayout] = useState([]);
    
    
    useEffect( () => {
        const boardBuilder = [];
        const letters = ["A", "B", "C", "D", "E", "F", "G", "H"]
        for(let i=8; i>=1; i--){
            const newRow = [];
            for(let j=0; j<8; j++){
                newRow.push(`${letters[j]} ${i}  `);
            }
            boardBuilder.push(newRow);
        }
        setBoardLayout(boardBuilder);
    }, []);

    return (
        <div id="board">
            {
                boardLayout.map( (row, i) =>
                    <div className={styles.row} key={i}>
                        {row.map( (tile, j) =>
                            <div className={`${styles.tile} ${(i+j) % 2 === 0? styles.white : styles.black}`} key={j}>
                                {tile}
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
}

export default GameBoard;
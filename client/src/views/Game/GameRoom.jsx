import axios from "axios";
import React, {useState, useEffect} from "react";
import GameBoard from "../../components/Game/GameBoard";

import blackBishop from "../../components/Game/img/blackBishop.png";
import blackKing from "../../components/Game/img/blackKing.png";
import blackKnight from "../../components/Game/img/blackKnight.png";
import blackPawn from "../../components/Game/img/blackPawn.png";
import blackQueen from "../../components/Game/img/blackQueen.png";
import blackRook from "../../components/Game/img/blackRook.png";
import whiteBishop from "../../components/Game/img/whiteBishop.png";
import whiteKing from "../../components/Game/img/whiteKing.png";
import whiteKnight from "../../components/Game/img/whiteKnight.png";
import whitePawn from "../../components/Game/img/whitePawn.png";
import whiteQueen from "../../components/Game/img/whiteQueen.png";
import whiteRook from "../../components/Game/img/whiteRook.png";



const GameRoom = ({id}) => {

    const [game, setGame] = useState(false);
    
    useEffect( () => {
        axios.get(`http://localhost:8000/api/games/${id}`)
            .then(res => setGame(res.data.results))
            .catch(err => console.error(err.errors));
    }, [id]);

    const logStatus = e => {
        console.log(game.boardStatus);
    }

    return (
        <>
            <p>Hello there this is the game room thank you</p>
            <GameBoard
                statusFromParent={game? game.boardStatus : false}
                logStatus={logStatus}
                images={{
                    blackBishop,
                    blackKing,
                    blackKnight,
                    blackPawn,
                    blackQueen ,
                    blackRook,
                    whiteBishop,
                    whiteKing,
                    whiteKnight,
                    whitePawn,
                    whiteQueen ,
                    whiteRook,
                }}
            />
            <br /><br />
        </>
    );
}

export default GameRoom;
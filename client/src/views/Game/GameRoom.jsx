import axios from "axios";
import React, {useState, useEffect} from "react";
import GameBoard from "../../components/Game/GameBoard";

import blackbishop from "../../components/Game/img/blackBishop.png";
import blackking from "../../components/Game/img/blackKing.png";
import blackknight from "../../components/Game/img/blackKnight.png";
import blackpawn from "../../components/Game/img/blackPawn.png";
import blackqueen from "../../components/Game/img/blackQueen.png";
import blackrook from "../../components/Game/img/blackRook.png";
import whitebishop from "../../components/Game/img/whiteBishop.png";
import whiteking from "../../components/Game/img/whiteKing.png";
import whiteknight from "../../components/Game/img/whiteKnight.png";
import whitepawn from "../../components/Game/img/whitePawn.png";
import whitequeen from "../../components/Game/img/whiteQueen.png";
import whiterook from "../../components/Game/img/whiteRook.png";



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
                    blackbishop,
                    blackking,
                    blackknight,
                    blackpawn,
                    blackqueen ,
                    blackrook,
                    whitebishop,
                    whiteking,
                    whiteknight,
                    whitepawn,
                    whitequeen ,
                    whiterook,
                }}
                gameId={id}
            />
            <br /><br />
        </>
    );
}

export default GameRoom;
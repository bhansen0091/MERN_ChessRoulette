import Axios from "axios";
import React, {useState, useEffect} from "react";
import {Link} from "@reach/router";


const GameLobby = props => {

    const [gameList, setGameList] = useState(false);

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/games`)
            .then(res => setGameList(res.data.results))
            .catch(err => console.log(err))
    }, [props])

    return (
        <>
            <h2>Ongoing games:</h2>
            {gameList? 
                gameList.map( (game, i) =>
                    <>
                        <Link key={i} to={`/games/${game._id}`}>
                            <p>Game {i+1}: {game.type}, between {game.playerWhite.length?
                                game.playerWhite[0].userName :
                                "(no one joined)"} and {game.playerBlack.length?
                                game.playerBlack[0].userName :
                                "(no one joined)"}
                            </p>
                        </Link>
                    </>
                )

                : <p>Loading...</p>}
        </>
    );
}

export default GameLobby;
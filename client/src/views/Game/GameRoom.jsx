import { navigate } from "@reach/router";
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
    const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("user")) || {
        firstName:"No One",
        lastName: "LoggedIn"
    })
    
    useEffect( () => {
        axios.get(`http://localhost:8000/api/games/${id}`)
            .then(res => {
                setGame(res.data.results);
            }).catch(err => console.error(err.errors));
    }, [id]);

    const deleteGame = e => {
        axios.delete(`http://localhost:8000/api/games/${id}`)
            .then(() => navigate("/dashboard"))
            .catch(err => console.error({errors: err}));
    }

    const joinGame = e => {
        axios.put(`http://localhost:8000/api/games/${id}/addPlayer${e.target.value}/${loggedIn._id}`)
            .then( () => {
                setGame({...game,
                    [`player${e.target.value}`]: [{_id: loggedIn._id, userName: loggedIn.userName}]
                });
            })
            .catch(err => console.error({errors: err}));
    }

    const leaveGame = e => {
        axios.put(`http://localhost:8000/api/games/${id}/removePlayer${e.target.value}/${loggedIn._id}`)
            .then( () => {
                setGame({...game,
                    [`player${e.target.value}`]: []
                });
            })
            .catch(err => console.error({errors: err}));
    }

    const beginGame = () => {
        axios.put(`http://localhost:8000/api/games/${id}`, {begun: true})
            .then( () => {
                setGame({...game,
                    begun: true
                });
            })
            .catch(err => console.error({errors:err}));
    }

    const flipTurn = () => {
        setGame({...game,
            whiteToPlay: !game.whiteToPlay
        });
    }


    // const joinGame = e => {
    //     axios.put(`http://localhost:8000/api/games/${id}/addPlayer${e.target.value}/${loggedIn._id}`)
    //         .then( () => {
    //             let {white, black} = playersJoined;
    //             if(e.target.value === "White"){
    //                 white = true;
    //                 console.log(game.playerBlack);
    //                 console.log(loggedIn._id);
    //                 if(game.playerBlack.length && game.playerBlack[0]._id === loggedIn._id){
    //                     // that means they were already joined as black, and just joined as white
    //                     // remove player as black
    //                     black = false;
    //                     console.log("In the 'if' Black turning to:", black);
    //                     axios.put(`http://localhost:8000/api/games/${id}/removePlayerBlack/${loggedIn._id}`)
    //                         .then(rsp => {
    //                             // black = false;
    //                             setGame({
    //                                 ...game,
    //                                 playerBlack: []
    //                             });
    //                         }).catch(err => console.error({errors: err}));
    //                 }
    //             }
    //             if(e.target.value === "Black"){
    //                 black = true;
    //                 console.log(game.playerWhite);
    //                 console.log(loggedIn._id);
    //                 if(game.playerWhite.length && game.playerWhite[0]._id === loggedIn._id){
    //                     white = false;
    //                     console.log("In the 'if' white turning to:", white);
    //                     axios.put(`http://localhost:8000/api/games/${id}/removePlayerWhite/${loggedIn._id}`)
    //                         .then(rsp => {
    //                             setGame({
    //                                 ...game,
    //                                 playerWhite: []
    //                             });
    //                         }).catch(err => console.error({errors: err}));
    //                 }
    //             }
    //             setPlayersJoined({white, black});
    //             console.log(`white: ${white}, black: ${black}`);
    //             const playerArray = [];
    //             playerArray.push({_id: loggedIn._id});
    //             setGame({
    //                 ...game,
    //                 [`player${e.target.value}`]: playerArray
    //             })
    //         })
    //         .catch(err => console.error({errors: err}));
    // }

    

    return (
        <>
            <table className="table-borderless w-100">
                <tbody><tr>
                    <td>White:</td>
                    <td>Black:</td>
                </tr>
                <tr>
                    <td>
                        {game?
                            game.playerWhite.length ?
                                <h5>{game.playerWhite[0].userName}</h5> :
                                <button
                                    className="mb-2 mx-1 btn btn-light border border-dark"
                                    onClick={joinGame}
                                    value="White"
                                >
                                    Join as white
                                </button>
                            :
                            <>Loading...</>
                        }
                    </td>
                    <td>
                        {game?
                            game.playerBlack.length ?
                                <h5>{game.playerBlack[0].userName}</h5> :
                                <button
                                    className="mb-2 mx-1 btn btn-dark border"
                                    onClick={joinGame}
                                    value="Black"
                                >
                                    Join as black
                                </button>
                            :
                            <>Loading...</>
                        }
                    </td>
                </tr>
                <tr>
                    <td>
                        {game && game.playerWhite.length ?
                            !game.begun && game.playerWhite[0]._id === loggedIn._id ?
                                <button
                                    className="btn btn-danger"
                                    onClick={leaveGame}
                                    value="White"
                                >
                                    Leave Game
                                </button>
                                : ""
                            : ""
                        }
                    </td>

                    <td>
                        {game && game.playerBlack.length ?
                            !game.begun && game.playerBlack[0]._id === loggedIn._id?
                                <>
                                    <button
                                        className="btn btn-danger"
                                        onClick={leaveGame}
                                        value="Black"
                                    >
                                        Leave Game
                                    </button>
                                    <br />
                                </>
                                : ""
                            : ""
                        }
                    </td>
                </tr></tbody>
            </table>

            {game?
                !game.begun && game.playerBlack.length + game.playerWhite.length === 2?
                    <button
                        className="btn btn-success mt-2"
                        onClick={beginGame}
                    >
                        Begin game
                    </button>
                    : ""
                : ""
            }
            
            <GameBoard
                statusFromParent={game? game.boardStatus : false}
                whiteToPlay={game? game.whiteToPlay : true}
                parentLog={game? game.moveLog : []}
                playerIds = {{
                    white: game && game.playerWhite.length ? game.playerWhite[0]._id : 0,
                    black: game && game.playerBlack.length ? game.playerBlack[0]._id : 0
                }}
                begun={game? game.begun : false}
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
                specialInfo={game? game.specialInfo : false}
                
                flipTurn={flipTurn}
            />
            <button className="btn btn-danger my-5" onClick={deleteGame}>Delete this game</button>
        </>
    );
}

export default GameRoom;
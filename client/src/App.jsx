import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router, Link} from '@reach/router';
// import Create from './views/User/Create';
import Edit from './views/User/Edit';
import Show from './views/User/Show';
import Main from './views/Main';
import GameRoom from './views/Game/GameRoom';
import LogReg from './views/User/LogReg';
import NewGame from './views/Game/NewGame';
import './App.css';

import io from 'socket.io-client';

const App = () => {

// const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("user")) || 
//   {
//     firstName:"No One",
//     lastName: "LoggedIn"
//   })
// const [socket] = useState(() => io(":8000"))
// const [input, setInput] = useState("");
// const [messages, setMessages] = useState([])

// useEffect(() => {
//   socket.on("welcome", data => console.log(data))
//   socket.on("joined", data => console.log(data))
//   socket.on("updatingMessages", data => setMessages(data))
//   return () => socket.disconnect(true);
// }, [socket])

// const sendToServer = () => {
//   socket.emit("addToChat", input);
//   setInput("");
// }

  return (
    <div className="App d-flex flex-wrap justify-content-center p-3">
      <div className="d-flex col-sm-12 col-md-12 col-lg-12 mx-auto justify-content-around flex-wrap">
        <Link to="/dashboard">Home</Link>
        <Link to="/games/new">New Game</Link>
      </div>
      {/* <div className="form-group border col-4 d-flex align-items-end">
        <div style={{height: "100%"}} className="col-12 p-3">
          <div style={{height: "88%"}} className="form-control col-12 border text-left align-bottom">
            {
              messages.map((m,i) => <p key={i}>{loggedIn.userName}: {m}</p> )
            }
          </div>
          <div className="input-group">
            <input 
              className="form-control" 
              type="text" 
              value={input} 
              onChange={(e) => {setInput(e.target.value)}} 
            />
            <div className="input-group-append">
              <button 
                onClick={sendToServer}
                className="btn btn-primary"
                type="submit"
                >Send
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="col-6">
        <Router>
          <LogReg path="/" />
          <Main path="/dashboard" />
          {/* <Create path="/users/new" /> */}
          <Edit path="/users/edit/:id" />
          <Show path="/users/show/:id" />

          {/* <GameRoom path="/games" /> */}
          <NewGame path="/games/new" />
          <GameRoom path="/games/:id" />
        </Router>
      </div>
    </div>
  );
}

export default App;

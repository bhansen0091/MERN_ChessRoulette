import 'bootstrap/dist/css/bootstrap.min.css';
import {Router, Link} from '@reach/router';
// import Create from './views/User/Create';
import Edit from './views/User/Edit';
import Show from './views/User/Show';
import Main from './views/Main'
import GameRoom from './views/Game/GameRoom';
import LogReg from './views/User/LogReg'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="d-flex col-6 mx-auto justify-content-around flex-wrap">
        <Link to="/dashboard">Home</Link>
        <Link to="/users/new">Add New</Link>
      </div>
      <Router>
        <LogReg path="/" />
        <Main path="/dashboard" />
        {/* <Create path="/users/new" /> */}
        <Edit path="/users/edit/:id" />
        <Show path="/users/show/:id" />

        {/* <GameRoom path="/games" /> */}
        <GameRoom path="/games/:id" />
      </Router>
    </div>
  );
}

export default App;

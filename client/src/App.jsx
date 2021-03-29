import 'bootstrap/dist/css/bootstrap.min.css';
import ChangePassword from './views/User/ChangePassword'
import {Router, Link} from '@reach/router';
import Create from './views/User/Create';
import Edit from './views/User/Edit';
import Show from './views/User/Show';
import Main from './views/Main'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="d-flex col-6 mx-auto justify-content-around flex-wrap">
        <Link to="/">Home</Link>
        <Link to="/users/new">Add New</Link>
      </div>
      <Router>
        <Main path="/" />
        <Create path="/users/new" />
        <Edit path="/users/edit/:id" />
        <ChangePassword path="/users/edit/password/:id" />
        <Show path="/users/show/:id" />
      </Router>
    </div>
  );
}

export default App;

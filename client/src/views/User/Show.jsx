import {useState, useEffect} from 'react';
import Axios from 'axios';
import { navigate } from '@reach/router';


const Show = props => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/users/${props.id}`)
        .then(res => setUser(res.data.results))
        .catch(err => console.log(err))
    }, [props])

    return(

        <div className="card col-4 mx-auto">
            <div className="card-body">
                <h2 className="card-title">{user.firstName}</h2>
                <p className="card-text">{user.lastName}</p>
            </div>
            <button className="btn btn-warning" onClick={() => navigate(`/users/edit/${props.id}`)}>Edit</button>
        </div>
    )
}

export default Show;
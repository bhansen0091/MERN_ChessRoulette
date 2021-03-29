import { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import Axios from 'axios';

const Main = props => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/users")
            .then(res => setUsers(res.data.results))
            .catch(err => console.log(err))
    }, [])

    const handleDestroyTemplate = (id) => {
        Axios.delete(`http://localhost:8000/api/users/${id}`)
            .then(res => setUsers(res.data.results))
            .catch(err => console.log(err))
    }

    return(
        users ?
            <table className="table table-hover col-7 mx-auto border">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((u,i) => {
                            return <tr key={i}>
                                    <td>{u.firstName}</td>
                                    <td>
                                        <Link className="btn btn-warning" to={`/users/edit/${u._id}`}>Edit</Link>
                                        <Link className="btn btn-info" to={`/users/edit/password/${u._id}`}>Edit Password</Link>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => {handleDestroyTemplate(u._id)}}
                                        >Delete</button>
                                        <Link 
                                            to={`/users/show/${u._id}`}
                                            className="btn btn-success">Show User</Link>
                                    </td>
                            </tr>
                        })
                    }
                </tbody>
            </table> :
            <h2>Loading...</h2>
    )
}

export default Main;
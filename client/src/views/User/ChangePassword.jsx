import ChangePasswordForm from '../../components/User/ChangePassword/ChangePasswordForm';
import { navigate } from '@reach/router';
import {useState, useEffect} from 'react';
import Axios from 'axios';

const Edit = props => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/users/${props.id}`)
            .then(res => setUser(res.data.results[0]))
            .catch(err => console.log(err))
    }, [props])

    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: ""
    })

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        Axios.put(`http://localhost:8000/api/users/${props.id}`, user)
        .then(res => navigate('/'))
        .catch(err => {
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors)
        })
    }

    return(
        <>
            {
                user?
                <ChangePasswordForm 
                    inputs = {user}
                    title = "Change Password"
                    submitValue = "Edit"
                    handleInputChange = {handleChange}
                    handleSubmit = {handleSubmit}
                    errors = {errors}
                /> :
                <h2>Loading....</h2>
            }   
        </>
    )
}

export default Edit;
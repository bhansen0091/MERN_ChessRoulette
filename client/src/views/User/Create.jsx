import UserForm from '../../components/User/UserForm';
import { navigate } from '@reach/router';
import {useState} from 'react';
import Axios from 'axios';


const Create = props => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
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

        Axios.post("http://localhost:8000/api/users", user)
        .then(res => navigate('/'))
        .catch(err => {
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors)
        })
    }


    return(
        <>
            <UserForm 
                inputs = {user}
                title = "Create User"
                submitValue = "Create"
                handleInputChange = {handleChange}
                handleSubmit = {handleSubmit}
                errors = {errors}
                editing = {false}
            />
        </>
    )
}

export default Create;
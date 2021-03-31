import UserForm from '../../components/User/UserForm';
import ChangePassword from "../../components/User/ChangePassword";
import { navigate } from '@reach/router';
import {useState, useEffect} from 'react';
import Axios from 'axios';

const Edit = props => {
    const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("user")) || {
        firstName: "No One",
        lastName: "LoggedIn"
    });

    const [user, setUser] = useState(false);
    const [pwInputs, setPwInputs] = useState({
        oldpw: "",
        newpw: "",
        confirmpw: ""
    });
    const [pwErrors, setPwErrors] = useState({
        oldpw: false,
        newpw: false,
        confirmpw: false
    });

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/users/${props.id}`, {withCredentials:true})
            .then(res => setUser(res.data.results))
            .catch(err => console.log(err))
    }, [props])

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
        
        Axios.put(`http://localhost:8000/api/users/${props.id}`, user, {withCredentials:true})
        .then(res => navigate(`/users/show/${props.id}`))
        .catch(err => {
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors)
        })
    }

    const handlepwInputs = e => {
        setPwInputs({
            ...pwInputs,
            [e.target.name]: e.target.value
        });
    }

    const showPopup = e => {
        e.preventDefault();
        document.getElementById("changepw").style.display = "block";
    }
    
    const goBack = e => {
        e.preventDefault();
        document.getElementById("changepw").style.display = "none";
    }








    const updatePw = e => {
        e.preventDefault();

        // check oldpassword against bcrypt hash using Axios call
        Axios.post('http://localhost:8000/api/checkpassword', {email: loggedIn.email, password: pwInputs.oldpw}, {withCredentials:true})
            .then(res => {
                console.log(res.data);
                if (res.data.msg) {
                    // confirm that the passwords match
                    console.log("You did it!");
                    // Axios.put(`http://localhost:8000/api/users/${loggedIn._id}`, {password: pwInputs.newpw, confirmPassword: pwInputs.confirmpw}, {withCredentials: true})
                    //     .catch(err => console.error(err));
                }
                else {
                    console.log("You didn't do it :(");
                }
            })
            .catch(err => console.error({errors: err}));

        // hash new password
        // check confirmpw against 
        
            // Axios.put(`http://localhost:8000/api/users/${props.id}`, user, {withCredentials:true})
            // // .then(res => navigate(`/users/show/${props.id}`))
            // .catch(err => {
            //     console.log(err.response.data.errors);
            //     setErrors(err.response.data.errors)
            // })
    // }

    //     if(pwInputs.oldpw !== user.password){
    //         return (setPwErrors({
    //             oldpw: "Password incorrect",
    //             newpw: false,
    //             confirmpw: false
    //         }));
    //     }
    //     if(pwInputs.newpw.length < 8){
    //         return (setPwErrors({
    //             oldpw: false,
    //             newpw: "Password must be at least 8 characters",
    //             confirmpw: false

    //         }));
    //     }
    //     if(pwInputs.newpw !== pwInputs.confirmpw){
    //         return (setPwErrors({
    //             oldpw: false,
    //             newpw: false,
    //             confirmpw: "Passwords must match!"
    //         }));
    //     }

    //     Axios.put(`http://localhost:8000/api/users/${props.id}`, {password: pwInputs.newpw})
    //         .then( () => navigate(`/users/show/${props.id}`))
    //         .catch(err => {
    //             console.log(err.response.data.errors);
    //             setErrors(err.response.data.errors)
    //         });
    }








    return(
        <>
            {
                user._id === loggedIn._id?
                <>
                    <UserForm 
                        inputs = {user}
                        title = "Edit User"
                        submitValue = "Edit"
                        handleInputChange = {handleChange}
                        handleSubmit = {handleSubmit}
                        errors = {errors}
                        editing = {true}
                        showPopup = {showPopup}
                    /> 
                    <p>Password: {user? user.password : ""}</p>
                    <div id="changepw" style={{display: "none"}}>
                        <ChangePassword
                            handleChange = {handlepwInputs}
                            inputs = {pwInputs}
                            goBack = {goBack}
                            handleSubmit = {updatePw}
                            errors = {pwErrors}
                        />
                    </div>
                </>    
                :
                <h2>Not For You!</h2>
            }   
        </>
    )
}

export default Edit;
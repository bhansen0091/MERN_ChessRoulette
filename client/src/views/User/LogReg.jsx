import { navigate } from '@reach/router';
import { useState } from 'react';
import Axios from 'axios';


const LogReg = props => {
    const initialReg = {
        firstName : "",
        lastName : "",
        userName : "",
        email : "",
        password : "",
        confirmPassword : "",
    }
    
    const [reg, setReg] = useState(initialReg);
    const [regErrors, setRegErrors] = useState(initialReg);
    
    const handleRegInputs = (e) => {
        setReg({
            ...reg,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:8000/api/register', reg, {withCredentials:true})
            .then(res => {
                console.log(res.data)
                if (res.data.msg) {
                    localStorage.setItem("user", JSON.stringify(res.data.userLogged))
                    navigate('/dashboard')
                } else {
                    setRegErrors(res.data);
                }
            })
    }
    
    const initialLog = {
        email : "",
        password : "",
    }
    
    const [log, setLog] = useState(initialLog);
    const [logErrors, setLogErrors] = useState(initialLog);

    const handleLogInputs = (e) => {
        setLog({
            ...log,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:8000/api/login', log, {withCredentials:true})
        .then(res => {
            console.log(res.data)
            if (res.data.msg) {
                localStorage.setItem("user", JSON.stringify(res.data.userLogged))
                navigate('/dashboard')
            } else {
                setLogErrors({
                    email: {message: res.data.error},
                    password: {message: res.data.error}
                });
            }
        })
    }

    return (
        <div className="d-flex justify-content-around p-5">
            <form className="col-4" onSubmit={handleRegister}>
                <h2 className="text-center">Register</h2>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input 
                        type="text" 
                        name="firstName"
                        className="form-control"
                        onChange={handleRegInputs}
                        value={reg.firstName}
                    />
                    <span className="text-danger">
                        {regErrors.firstName ? regErrors.firstName.message : ""}
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input 
                        type="text" 
                        name="lastName"
                        className="form-control"
                        onChange={handleRegInputs}
                        value={reg.lastName}
                    />
                    <span className="text-danger">
                        {regErrors.lastName ? regErrors.lastName.message : ""}
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="userName">Username:</label>
                    <input 
                        type="text" 
                        name="userName"
                        className="form-control"
                        onChange={handleRegInputs}
                        value={reg.userName}
                    />
                    <span className="text-danger">
                        {regErrors.userName ? regErrors.userName.message : ""}
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        name="email"
                        className="form-control"
                        onChange={handleRegInputs}
                        value={reg.email}
                    />
                    <span className="text-danger">
                        {regErrors.email ? regErrors.email.message : ""}
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        name="password"
                        className="form-control"
                        onChange={handleRegInputs}
                        value={reg.password}
                    />
                    <span className="text-danger">
                        {regErrors.password ? regErrors.password.message : ""}
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input 
                        type="password" 
                        name="confirmPassword"
                        className="form-control"
                        onChange={handleRegInputs}
                        value={reg.confirmPassword}
                    />
                    <span className="text-danger">
                        {regErrors.confirmPassword ? regErrors.confirmPassword.message : ""}
                    </span>
                </div>

                <input type="submit" value="Register" className="btn btn-dark my-3"/>

            </form>



            <form className="col-4" onSubmit={handleLogin}>
                <h2 className="text-center">Login</h2>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        name="email"
                        className="form-control"
                        onChange={handleLogInputs}
                        value={log.email}
                    />
                    <span className="text-danger">
                        {logErrors.email ? logErrors.email.message : ""}
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        name="password"
                        className="form-control"
                        onChange={handleLogInputs}
                        value={log.password}
                    />
                    <span className="text-danger">
                        {logErrors.password ? logErrors.password.message : ""}
                    </span>
                    <input type="submit" value="Login" className="btn btn-dark my-3"/>
                </div>

            </form>
        </div>
    )
}

export default LogReg;
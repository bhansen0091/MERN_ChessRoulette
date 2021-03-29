import {navigate} from '@reach/router'

const ChangePasswordForm = props => {
    const {inputs, handleInputChange, handleSubmit, title, submitValue, errors} = props;

    const handleCancel = (e) => {
        e.preventDefault();
        navigate("/");
    }

    return(
        <form onSubmit={handleSubmit} className="col-6 mx-auto">
            <h2 className="text-center">{title}</h2>
            <div className="form-group">
                    <label htmlFor="oldPassword">Old Password:</label>
                    <input 
                        type="text" 
                        name="oldPassword" 
                        className="form-control"
                        onChange={handleInputChange}
                        value={inputs.password}
                    />
                    <span className="text-danger">
                        {errors.password ? errors.password.message : ""}
                    </span>
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input 
                        type="text" 
                        name="password" 
                        className="form-control"
                        onChange={handleInputChange}
                        value={inputs.password}
                    />
                    <span className="text-danger">
                        {errors.password ? errors.password.message : ""}
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input 
                        type="text" 
                        name="confirmPassword" 
                        className="form-control"
                        onChange={handleInputChange}
                        value={inputs.confirmPassword}
                    />
                    <span className="text-danger">
                        {inputs.password !== inputs.confirmPassword? "Passwords must match!" : ""}
                    </span>
                </div>

            <input type="submit" value={submitValue} className="btn btn-primary"/>

            <button className="btn btn-dark mx-2" onClick={handleCancel}>Cancel</button>
        </form>
    )
}

export default ChangePasswordForm;
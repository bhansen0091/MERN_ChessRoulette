import styles from "./ChangePassword.module.css"

const ChangePassword = ({goBack, handleChange, handleSubmit, errors, inputs}) => {    
  
  return (
    <div className = {styles.mainPopup}>
      <div className = {styles.innerContainer}>
        <h3 style={{marginBottom: "20px"}}>Change Password:</h3>
        
        <form onSubmit = {handleSubmit}>
            <div className="form-group">
                <label htmlFor="oldpw">Old Password:</label><br />
                <input
                    type="text"
                    name="oldpw"
                    id="oldpw"
                    onChange={handleChange}
                    value={inputs.oldpw}
                />
                <span className="text-danger">{errors.oldpw? errors.oldpw : ""}</span>
            </div>

            <div className="form-group">
                <label htmlFor="newpw">New Password:</label><br />
                <input
                    type="text"
                    name="newpw"
                    id="newpw"
                    onChange={handleChange}
                    value={inputs.newpw}
                />
                <span className="text-danger">{errors.newpw? errors.newpw : ""}</span>
            </div>

            <div className="form-group">
                <label htmlFor="confirmpw">Confirm Password:</label><br />
                <input
                    type="text"
                    name="confirmpw"
                    id="confirmpw"
                    onChange = {handleChange}
                    value={inputs.confirmpw}
                />
                <span className="text-danger">{errors.confirmpw? errors.confirmpw : ""}</span>
            </div>


            <button
                className="btn btn-success"
                style = {{marginBottom: "10px"}}
                // onClick = {handleSubmit}
            >
            Change Password
            </button>&nbsp; &nbsp;
            <button 
            className="btn btn-warning"
            onClick = {goBack}
            >
            Cancel
            </button>

        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
//////////////////////////////////////               Login.jsx                //////////////////////////////////////
/**
 *
 * @file Login.jsx
 * @copyright ISMS(International Student Management System)
 * @version 1.0.0
 * @author cyberbot team, software developer program
 * @release summer 2022
 * @owner Saskatchewan Polytechnic, Saskatoon Campus
 *
 */
//////////////////////////////////////
//#region for IMPORT
/**
 *   @notice watch to address, if change path, must modify in the require part*/
import auths from "../api/auth";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../images/saskpolytechlogo.png";
import "../css/loginpage.css";
//#endregion

// react class component from here to code for login starts

class Login extends Component {
  constructor(props) {
    super(props);
    // four state variable which store 
    // username : store username ,
    //password : store password,
    // loginStatus:login status.
    // permission : store what type of permission they have
    this.state = {
      loginUsername: "",
      loginPassword: "",
      loginStatus: "",
      permission: "",
    };
  }


  
  handleInputUser = async (event) => {
      this.setState({ isValid: "" });
      this.setState({ loginUsername: event.target.value });
 
  };
  handleInputPassword = async (event) => {
      this.setState({ loginPassword: event.target.value });
  };

  // handler for login if password and username is correct then give access to STUDENTPAGE 
  // otherwise give alert that userName and password is incorrect

  handleLogin = async (event) => {
    // prevent screen from default
    event.preventDefault();
    // store password and username 
    const { loginUsername, loginPassword } = this.state;
    // call API route postUserLogin and send password and username to backend
    await auths
      .postUserLogin({ loginUsername, loginPassword })
      // if not correct then give alert "Wrong Credentials" and login fails
      .then((response) => {
        if (response.data.message) {
          this.setState({ loginStatus: response.data.message });
          console.log("Unsuccessful");
          window.alert("Wrong Credentials");
        } 
        //  otherwise if login and password match then login will successful and page redirect or navigate to STUDENTPAGE
        else {
          this.setState({ loginStatus: response.data[0] });
          console.log("Successful");
          this.setState({ permission: response.data.data });
          localStorage.setItem("permission", this.state.permission);
          localStorage.setItem("user_name", this.state.loginUsername);
          // redirect to studentpage
          this.props.history.push("/isms/studentpage");
        }
      });
  };
  render() {
    return (
      <div className="LoginPage">
        <div className=" shadowshade mainBorder container">
          {/* left side logo and part of login screen */}
          <div className="left col-lg-4">
            {/* image tag for logo */}
            <img src={Logo} width="300px" height="300px" alt="Logo" />
          </div>
           {/* right side part with login form where user can enter valid username and password to do login */}
          <div className="right col-lg-8">
            <div className="justify-content-center">
              <h2>Login</h2>
              <div className="shadowshade formborder col-md-6 ">
                <div id="loginform">
                  <div className="form-group">
                    {/* label of username */}
                    <label>
                      User name :{" "}
                    </label>
                    {/* input attribute where user can enter user name */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="User Name"
                      onChange={this.handleInputUser}
                    />
                    <p>{this.state.isValid}</p>
                  </div>
                  <div className="form-group">
                    {/* label of password */}
                    <label>Password : </label>
                    {/* input attribute where user can enter passsword */}
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={this.handleInputPassword}
                    />
                    <p>{this.state.isValid}</p>
                  </div>
                  <div>
                    <p>{this.state.loginStatus}</p>
                  </div>
                  <div className="form-group form-check floatbtn">
                    {/* LOGIN button to do login and when user click on login button "handlerlogin" will check the username and password  */}
                    <button
                      className="btn btn-primary"
                      onClick={this.handleLogin}
                    >
                      Login
                    </button>
                    {/* Link to reset password if user want to reset password then by clicking on this link will redirect to resetpassword page */}
                    <a href="/isms/resetpassword"> | Reset Password</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;

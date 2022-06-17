
//////////////////////////////////////               ResetPassword.jsx                //////////////////////////////////////
/**
 *
 * @file ResetPassword.jsx
 * @copyright ISMS(International Student Management System)
 * @version 1.0.0
 * @author cyberbot team, software developer program
 * @release summer 2022
 * @owner Saskatchewan Polytechnic, Saskatoon Campus
 *
 */
//////////////////////////////////////
import React,{Component} from "react";
import styled from "styled-components";
import { Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FootNav,Navbar } from "../components";
import auths from '../api/auth';
import "../css/loginpage.css";

// Styled component for cancel button
const Btn = styled.button`
  float: right;
`;

// Styled component for Reset button
const ResetBtn = styled.button`
  color: #fff;
  border:none;
  width: 100%;
  padding: 3px;
  border-radius: 5px;
  background-color: #743c96;
`;

// Styled component for Card tilte
const Header = styled.h2`
  margin: 0;
  display: inline-block;
`;

// REACT_APP_PASSWORD variable use to read secret password from .env file
const {REACT_APP_PASSWORD} = process.env;

class ResetPassword extends Component{
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:'',
      masterpassword:''

    }
  }
//#region 
// different handler to get data or value from input attritubes

// handler to get username from input attribute
  handleusername = async event=>{
    // stored value in username variable
    var username  = event.target.value;
    // set username value to username
    this.setState({username:username})
}

// handler to read and set password in password variable from input attribute
handlepassword = async event=>{
  // stored value in password variable 
  var password  = event.target.value;
  // set password value to password
  this.setState({password:password})
}

// handler to set master password from input attribute
handlemasterPassword = async event=>{
  // stored value in to masterpassword variable 
  var masterpassword  = event.target.value;
  // set masterpassword value to masterpassword
  this.setState({masterpassword:masterpassword})
}

// main handler to check masterpassword 
handleCheck = async event =>{
  // prevent screen from default or from refresh
  event.preventDefault();
  // read masterpassword into masterpassword variable 
  const masterpassword = this.state.masterpassword;
  
  // compare masterpassword with secert password from special .env file
  if(REACT_APP_PASSWORD===masterpassword){
    
    // if condition become true then password reset successfull 
    const {username, password } = this.state;
    await auths.resetPassword({username, password}).then((response)=>{
        window.alert("Password reset successfully");
        // screen redirect to login screen
        this.props.history.push("/");
      })
  }
  // else if masterpassword is wrong then it will not reset password
  else{
    console.log("not match--------------")
  }
}
//#endregion
  render(){
    return (
      <>
       {/* navbar for header */}
      <Navbar/>
        {/* Card for form  */}
        <Card className="container shadow " style={{ marginTop: "10px" }}>
          <Card.Body>
            <div className="row mb-3">
              <div className="col-sm-12 col-12 text-center">
                {/* Card Title  */}
                <Header className="">Reset Password</Header>
                {/* Button to cancel the page  */}
                <Link to="/">
                  <Btn className="btn btn-danger pull-right">X</Btn>
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              {/* Form for reset password  */}
              <Form  onSubmit={this.handleCheck}>
              <Form.Group className="mb-3 col-md-auto">
                  <Form.Control placeholder="Master Password" type="password" onChange={this.handlemasterPassword}></Form.Control>
                </Form.Group>
                {/* Form input for username  */}
                <Form.Group className="mb-3 col-md-auto">
                  <Form.Control placeholder="UserName" onChange={this.handleusername}></Form.Control>
                </Form.Group>
                {/* Form input for password  */}
                <Form.Group className="mb-3 col-md-auto">
                  <Form.Control placeholder="Password" type="password" onChange={this.handlepassword}></Form.Control>
                </Form.Group>
                {/* Form input for Retype password  */}
                <Form.Group className="mb-3 col-md-auto">
                  <Form.Control placeholder="RetypePassword" type="password"></Form.Control>
                </Form.Group>
                {/* Reset button  */}
                
                  <div className="text-center">
                    <ResetBtn type="submit">Reset</ResetBtn>
                  </div>
               
              </Form>
            </div>
          </Card.Body>
        </Card>
        <FootNav/>
      </>
    );
  }
}
export default ResetPassword;

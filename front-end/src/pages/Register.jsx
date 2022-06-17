//////////////////////////////////////               Register.jsx                //////////////////////////////////////
/**
 *
 * @file Register.jsx
 * @copyright ISMS(International Student Management System)
 * @version 1.0.0
 * @author cyberbot team, software developer program
 * @release summer 2022
 * @owner Saskatchewan Polytechnic, Saskatoon Campus
 *
 */
//////////////////////////////////////
import React, { Component } from "react";
import styled from "styled-components";
import { Form, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import auths from "../api/auth";
import { FootNav, Navbar } from "../components";
import "../css/loginpage.css";

// Styled components with custom style for the cancel button
const Btn = styled.button`
  float: right;
`;
// Styled component for the card title
const Header = styled.h2`
  margin: 0;
  display: inline-block;
`;
const InputText = styled.input.attrs({
  className: `form-control`,
})`
  margin: 5px;
`;
const Label = styled.label`
  margin: 5px;
`;
//RegisterUser class to do the functionality of create new user
class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      tel: "",
      username: "",
      password: "",
      permission: ""
    };
  }
  //Onchange event of firstname field which handle Regex of firstname
  handleFirstNameReg = async (event) => {
    if (!event.target.value.match(/^[a-zA-Z]|\d$/)) {
      this.setState({ isValid: "First Name must be size between 8 to 12" });
    } else {
      this.setState({ isValid: "" });
      this.setState({ firstname: event.target.value });
    }
  };
  //Onchange event of lastname field which handle Regex of lastname
  handleLastNameReg = async (event) => {
    if (!event.target.value.match(/^[a-zA-Z]|\d$/)) {
      this.setState({ isValid: "Last Name must be size between 8 to 12" });
    } else {
      this.setState({ isValid: "" });
      this.setState({ lastname: event.target.value });
    }
  };
  //Onchange event of email field which handle Regex of email
  handleEmailReg = async (event) => {
    if (!event.target.value.match(/^[a-zA-Z]|\d$/)) {
      this.setState({ isValid: "Email must be size between 8 to 12" });
    } else {
      this.setState({ isValid: "" });
      this.setState({ email: event.target.value });
    }
  };
  //Onchange event of telephone field which handle Regex of telephone
  handleTelReg = async (event) => {
    if (!event.target.value.match(/^[a-zA-Z]|\d$/)) {
      this.setState({ isValid: "Telephone must be size between 8 to 12" });
    } else {
      this.setState({ isValid: "" });
      this.setState({ tel: event.target.value });
    }
  };
//Onchange event of username field which handle Regex of username
  handleUserReg = async (event) => {
    if (!event.target.value.match(/^[a-zA-Z]|\d$/)) {
      this.setState({ isValid: "Username must be size between 8 to 12" });
    } else {
      this.setState({ isValid: "" });
      this.setState({ username: event.target.value });
    }
  };
  //Onchange event of password field which handle Regex of password
  handlePasswordReg = async (event) => {
    if (!event.target.value.match(/^[a-zA-Z]|\d$/)) {
      this.setState({ isValid: "" });
    } else {
      this.setState({ password: event.target.value });
    }
  };

  handlepermission = async(event) => {
    this.setState({ permission: event.target.value});
  }
//Onchange event for register button
  handleRegister = async (event) => {
    event.preventDefault();

    const { firstname, lastname, email, tel, username, password,permission } = this.state;
    await auths
      .postNewUser({ firstname, lastname, email, tel, username, password, permission })
      .then(() => {
        /* if (response.data.message) {
          console.log("Unsuccessful");
          window.alert("Something went wrong");
        } else { */
        console.log("Successful");
        window.alert("User added successfully");
        this.props.history.push("/");
        // }
      });
  };
  render() {
    return (
      <>
        <Navbar />
        {/* Main Container of page */}
        <Card className="container mt-3 shadow">
          <Card.Body>
            <div className="row mb-3">
              <div className="col-sm-12 col-12 text-center">
                {/* Header of the page */}
                <Header className="">Add User</Header>
                <Link to="/isms/usermanagement">
                  <Btn className="btn btn-danger pull-right">X</Btn>
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div>
                {/* First name */}
                <Form.Group className="mb-3 col-md-auto">
                  <Label>First Name</Label>
                  <InputText type="text" onChange={this.handleFirstNameReg} />
                </Form.Group>
                {/* LastName */}
                <Form.Group className="mb-3 col-md-auto">
                  <Label>Last Name</Label>
                  <InputText type="text" onChange={this.handleLastNameReg} />
                </Form.Group>
                {/* Email */}
                <Form.Group className="mb-3 col-md-auto">
                  <Label>Email</Label>
                  <InputText type="text" onChange={this.handleEmailReg} />
                </Form.Group>
                {/* Mobile Number */}
                <Form.Group className="mb-3 col-md-auto">
                  <Label>Mobile Number</Label>
                  <InputText type="text" onChange={this.handleTelReg} />
                </Form.Group>
                {/* UserName */}
                <Form.Group className="mb-3 col-md-auto">
                  <Label>UserName</Label>
                  <InputText type="text" onChange={this.handleUserReg} />
                </Form.Group>
                {/* Password */}
                <Form.Group className="mb-3 col-md-auto">
                  <Label>Password</Label>
                  <InputText type="text" onChange={this.handlePasswordReg} />
                </Form.Group>
                {/* Role/Permission */}
                <Label>Permission</Label>
                <Form.Select className="mb-3 col-md-auto" onChange={this.handlepermission}>
                  <option>Select permission</option>
                  <option value="RISIA">RISIA</option>
                  <option value="RCIC">RCIC</option>
                  <option value="RISIA and RCIC">RCIC and RISIA</option>
                  <option value="admin">admin</option>
                  <option value="">No Certification</option>
                </Form.Select>
                <div className="text-center">
                  <Button
                    className="btn btn-primary"
                    onClick={this.handleRegister}
                    style ={{"width":"100%"}}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
        <FootNav />
      </>
    );
  }
}
export default RegisterUser;

//////////////////////////////////////               UserManagement.jsx                //////////////////////////////////////
/**
 *
 * @file Navbar.jsx
 * @copyright ISMS(International Student Management System)
 * @version 1.0.0
 * @author cyberbot team, software developer program
 * @release summer 2022
 * @owner Saskatchewan Polytechnic, Saskatoon Campus
 *
 */
//////////////////////////////////////
//import section for all the packages
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../images/navlogo.png";
import styled from "styled-components";

//styling components
const Container = styled.div.attrs({
  className: "container",
})`
    padding: 0px;
  `;
const Nav = styled.div.attrs({
  className: "navbar navbar-expand-lg",
})`
    background-color: #753b97;
    padding: 20px 0px;
    justify-content: center;
  `;
const Heading = styled.h1.attrs({
  className: "page-header",
})`
    color: white;
    margin: 0px 20px;
    text-transform: uppercase;
    text-align:center;
  `;
const HeaderDown = styled.div.attrs({
  className: "navbar ",
})`
    background-color: grey;
    padding:0px;
    justify-content: right !important;
  `;
const TextLine = styled.a.attrs({
  className: "m-3",
})`
    color: white;
    margin:5px 10px !important;
    text-decoration: none;
    float: right;
  `;
  // main Navbar class 
class Navbar extends Component {
  // Permission oriented usermanagement link
  handleManage=async event=>{
    let permission=localStorage.getItem('permission')
    if(permission==="admin"){
      window.location.href=`/isms/usermanagement`;
    }
  }
  //render the details
  render() {
    return (
      <Container>
        <Nav>
          {/* logo and header */}
          <img src={Logo} width="200px" height="100px" alt="Logo" />
          <Heading>International Student Management System</Heading>
        </Nav>
        <HeaderDown>
          {/* display section for username  */}
          <TextLine>Username:{localStorage.getItem('user_name')}</TextLine>
          <TextLine onClick={this.handleManage}>Permission/Manage:{localStorage.getItem('permission')}</TextLine>
          {/* logout link */}
          <TextLine href="/">Logout</TextLine>
        </HeaderDown>
      </Container>
    );
  }
}
export default Navbar;

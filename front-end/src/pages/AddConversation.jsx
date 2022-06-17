//////////////////////////////////////               UserManagement.jsx                //////////////////////////////////////
/**
 *
 * @file AddConversation.jsx
 * @copyright ISMS(International Student Management System)
 * @version 1.0.0
 * @author cyberbot team, software developer program
 * @release summer 2022
 * @owner Saskatchewan Polytechnic, Saskatoon Campus
 *
 */
//////////////////////////////////////

//Import React, Component and Library use in this page
import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Form, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
//call Apis from api/student to route back-end
import apis from '../api/student';
import conv_apis from "../api/conversation";

import "../css/loginpage.css";
//import NavBar and footer from components
import NavBar from "../components/Navbar";
import FootNav from "../components/FootNav";

// Styled component for card title
const Header = styled.h2`
  margin: 0px 20px;
  text-align:center;
  
`;
/*Create AddConversation component for page
This class is load all information with studentID into propagated box
This class allows user to create new conversation with subject,category,license requirement, sharedlink information
This class first use student_id(order) in student table like parameter to call api getstudentbyID in oreder to take all information of current student
*/
class AddConversation extends Component{
  //Create constructor of class
  constructor(props){
    super(props)
    //Create class variable: student_id: save order of student in database
    this.state={
      //student_id is order id can take from parameter address
      student_id:this.props.match.params.id,
      //std_id: unique student_id from banner
      std_id:'',
      firstName:'',
      lastName:'',
      email:'',
      program:'',
      subject:'',
      category:'',
      note:'',
      comments:'',
      sharedLink:'',
      UploadedFile:'',
      permission:'',
      //created by column data is came from user_name from user table login in session
      created:localStorage.getItem('user_name')
    }
  }
 // lifecycle method which executes after component renders
  componentDidMount = async() => {
    const {student_id}=this.state
    //call Api getstudentbyID to load basic information of student with student_id came from address
    await apis.getStudentById(student_id)
    //after get data from student table inside database isms, store in variables
    //back end will response data stored into variable data as array, we need to call out the first item
    //In this case we need 5 information std_id, firstName,lastName so we stored into state variables
                .then(
                  student=>{
                    this.setState({
            std_id: student.data.data[0].std_id,
            firstName: student.data.data[0].first_name,
            lastName: student.data.data[0].last_name,
            email: student.data.data[0].email,
            program:student.data.data[0].program,
                    })
                  }
                )
  }
  //handle for note text area. store value into variable
  handleNote= async event=>{
    this.setState({note:event.target.value})
  }
  //handle for comments text area. store value into variable
  handleComment= async event=>{
    this.setState({comments:event.target.value})
  }
  //handle for category text area. store value into variable
  handleCategory= async event=>{
    this.setState({category:event.target.value})
  }
  //handle for subject text area. store value into variable
  handleSubject= async event=>{
    this.setState({subject:event.target.value})
  }
  //handle for permission text area. store value into variable
  handlePermission= async event=>{
    this.setState({permission:event.target.value})
  }
  //handle for sharedLink text area. store value into variable
  handleLink= async event=>{
    this.setState({sharedLink:event.target.value})
  }
  //handle create new conversation post information into database with parameters.
  handleCreate= async event=>{
    await conv_apis.createConversation(this.state.student_id,this.state.note,this.state.category,this.state.subject,this.state.sharedLink,this.state.permission,this.state.created,this.state.comments)
    .then(
      //after post into database successfully notice to user by window alert
    window.alert('New Conversation added successfully'))
      //move back to briefshow page with the student_id(id for orders)
    window.location.href=`/isms/briefshow/${this.state.student_id}` 
    
    
}
//Create content html of page
  render(){
    
    return (
      
      <div className="container">
        <NavBar/>
        <div className="row mb-3">
          <div className="col-sm-12 col-12">
            {/* Card Title  */}
            <Header className="text-center mt-2">Add Notes</Header>
          </div>
        </div>
        {/* Card for form  */}
        <Card className="m-3 shadow" >
          <Card.Header>
            <div className="col-md-12">
              {/* Form  */}
              <Form className="m-3">
                <Form.Group>
                  <div className="row mb-3">
                    {/* Label for student Id and input load from database  */}
                    <Form.Label className="col-md-2">Student ID:</Form.Label>
                    <Form.Control className="col" value={this.state.std_id}></Form.Control>
  
                    {/* Label with student name and input load from database  */}
                    <Form.Label className="col-md-2">
                      First Name:
                    </Form.Label>
                    <Form.Control className="col" value={this.state.firstName}></Form.Control>
                    <Form.Label className="col-md-2">
                      Last Name:
                    </Form.Label>
                    <Form.Control className="col" value={this.state.lastName}></Form.Control>
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="row mb-3">
                    {/* Label for student Id and input load from database */}
                    <Form.Label className="col-md-2">Email:</Form.Label>
                    <Form.Control className="col" value={this.state.email}></Form.Control>
  
                    {/* Label with student name and input load from database  */}
                    <Form.Label className="col-md-2">
                      Program:
                    </Form.Label>
                    <Form.Control className="col" value={this.state.program}></Form.Control>
                  </div>
                </Form.Group>
  
                {/* Label with subject and input enter from user */}
                <Form.Group>
                  <div className="row mb-3">
                    <Form.Label className="col-md-2">Subject : </Form.Label>
                    <Form.Control type="text" onChange={this.handleSubject}
                      className="col"
                    ></Form.Control>
  
                    {/* Label with category enter from user */}
                    <Form.Label className="col-md-2">Category :</Form.Label>
                    <Form.Control type="text" onChange={this.handleCategory}
                      className="col"
                    ></Form.Control>
                    </div>
                    
                    {/* Label with permission and limit choice base on permission of user who login system in session
                        RCIC license can choose requirement RCIC or none
                        RISIA license can choose requirement RISIA or none 
                        RISIA and RCIC license can choose requirement both RISIA and RCIC or none 
                        admin license can choose only none license.
                    */}
                    <Form.Label className="row mb-3">License Requirement :</Form.Label>
                    <Form.Select className="col-md-2" onChange={this.handlePermission}>
                    {<option value={""}>NO SELECTION</option>}
                    {(localStorage.getItem('permission')==="RISIA"||localStorage.getItem('permission')==="RISIA and RCIC")&&<option value={"RISIA"}>RISIA</option>}
                    {(localStorage.getItem('permission')==="RCIC"||localStorage.getItem('permission')==="RISIA and RCIC")&&<option value={"RCIC"}>RCIC</option>}
                    {localStorage.getItem('permission')==="RISIA and RCIC"&&<option value={"RISIA and RCIC"}>RCIC and RISIA</option>}
                    {<option value={""}>No Certification</option>}
                    </Form.Select>
                  
                </Form.Group>
              </Form>
            </div>
          </Card.Header>
          <Card.Body>
            {/* Tabs with two function Note/Comment and Shared Link with category enter from user */}
          <Tabs >
            {/* List of tabs show in top of tabs component */}
                <TabList>
                <Tab>Note</Tab>
                <Tab>Shared Link</Tab>
                </TabList>
            {/* Table panel contains details of tabs Note/Comment and shared Link respectively */}    
                <TabPanel>
                <Form.Group>
                    <Form.Label className="col-md-2">Note</Form.Label>
                    <Form.Control className="col" type="textarea" style={{"height":"100px"}} value={this.state.note} onChange={this.handleNote}></Form.Control>
                    
                    <Form.Label className="col-md-2">
                      Comment:
                    </Form.Label>
                    <Form.Control className="col" type="textarea" style={{"height":"100px"}} onChange={this.handleComment}></Form.Control>
                </Form.Group>
                </TabPanel>
                <TabPanel>
                    <Form.Label className="col-md-2">Shared Link</Form.Label>
                    <Form.Control className="col" type="textarea" value={this.state.sharedLink}  style={{"height":"100px"}} onChange={this.handleLink}></Form.Control>
                </TabPanel>
                <TabPanel>
                  
                </TabPanel>
                    </Tabs>
          </Card.Body>
          
          {/* Create the notes for specific student when click on Create button handleCreate will be called and execute api */}
          <div style={{display:"inline-block"}}>
          
            <Button
              className="btn m-3 col-md-2"
              style={{ float: "right",background:"#744197",border:"none",cursor:"pointer" }}
              onClick={this.handleCreate}
            >
              Create
            </Button>
          {/* Link with specific pathname to come back to cancel and comback to brief-show page with student_id(id for orders)*/}
          
          <Link to={{pathname: `/isms/briefshow/${this.state.student_id}`}}>
            <Button
              className="btn btn-danger m-3 col-md-2"
              style={{ float: "right",cursor:"pointer" }}
            >
              Cancel
            </Button>
          </Link>
          
        
          </div>
        </Card>
        <FootNav/>
      </div>
    );
  }
}
// function component
export default AddConversation
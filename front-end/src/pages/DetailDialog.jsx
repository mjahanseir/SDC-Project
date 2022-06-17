//////////////////////////////////////               UserManagement.jsx                //////////////////////////////////////
/**
 *
 * @file DetailDialog.jsx
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
//Import React, Component and Library use in this page


import React,{Component} from 'react'

import "bootstrap/dist/css/bootstrap.min.css";
import { Card,Form,Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//Call apis from api/student to connect to back-end route
import apis from '../api/student'
//Call apis from api/conversation to connect to back-end route
import conv_apis from '../api/conversation'
//Call apis from api/upload to connect to back-end route
import UploadFile from '../components/uploadFile';
import "../css/loginpage.css";
//#endregion


/**
 * This class mainly load conversation/note between student selected in student list in Student Page 
 * This class also can load all information of this student in appropriate box 
 * This class also alow user can edit information via handle update
 */
class DetailDialog extends Component{
    constructor(props) {
        super(props)
         /**
        *Variable is used in this class created with id is student_id(id for orders of student) get from params
        */
        this.state = {
            conversationID: this.props.match.params.id,
            category:'',
            permission:'',
            create:'',
            subject:'',
            note:'',
            comments:'',
            sharedLink:'',
            studentID:'',
            lastupdatedby:localStorage.getItem("user_name"),
            std_id:'',
            firstName:'',
            lastName:'',
            program:'',
            tabIndex:'',
        }
}
// lifecycle method which executes after component renders
componentDidMount = async() => {
    // turn on isLoading flag which we load data
    const {conversationID,}=this.state
  //call api to get conversation basing on conversation ID in order to show details information of conversation
    await conv_apis.getConversationByConsID(conversationID)
                .then(
         
                    conversation => {
                        this.setState({
                            studentID: conversation.data.data[0].student_id,
                            category: conversation.data.data[0].category,
                            subject: conversation.data.data[0].subject,
                            note: conversation.data.data[0].note,
                            comments: conversation.data.data[0].comments,
                            sharedLink: conversation.data.data[0].sharedLink,
                            permission: conversation.data.data[0].permission,
                            create: conversation.data.data[0].createdby,
                           
                        })
                    } 
                )
    //call api to get student information by studentID(order of student) to get all information related with current selected student                
    await apis.getStudentById(this.state.studentID)
                    .then(
                        student=>{
                            this.setState({
                                std_id:student.data.data[0].std_id,
                                firstName: student.data.data[0].first_name,
                                lastName: student.data.data[0].last_name,
                                program: student.data.data[0].program
                            })
                        }
                    )
  
              
  }
  handleChangeNote= async event=>{
    this.setState({note:event.target.value})
  }
  handleChangeComment= async event=>{
    this.setState({comments:event.target.value})
  }
  handleSharedLink= async event=>{
    this.setState({sharedLink:event.target.value})
  }
  handleSubject= async event=>{
    this.setState({subject:event.target.value})
  }
  handleCategory= async event=>{
    this.setState({category:event.target.value})
  }
  handleUpdate= async event=>{
    
    await conv_apis.updateConversation(this.state.conversationID,this.state.note,this.state.comments,this.state.sharedLink,this.state.subject,this.state.category,this.state.lastupdatedby).then(res=>{
      window.alert('Conversation Updated Successfully');
      this.props.history.push(`/isms/briefshow/${this.state.studentID}`);
    })
  }
  render(){
      return(
          <Card className='container mt-3 shadow'>
               <Card.Header>
            <div className="col-md-12">
              {/* Form  */}
              <Form className="m-3">
                <Form.Group>
                  <div className="row mb-3">
                    {/* Label for student Id and input  */}
                    <Form.Label className="col-md-2">Student ID:</Form.Label>
                    <Form.Control className="col" value={this.state.std_id}></Form.Control>
  
                    {/* Label with student name and input  */}
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
  
                    {/* Label with student name and input  */}
                    <Form.Label className="col-md-2">
                      Program:
                    </Form.Label>
                    <Form.Control className="col" value={this.state.program}></Form.Control>
                  </div>
                </Form.Group>
  
                {/* Label with subject and input  */}
                <Form.Group>
                  <div className="row mb-3">
                    <Form.Label className="col-md-2">Subject : </Form.Label>
                    <Form.Control type="text" value={this.state.subject} onChange={this.handleSubject}
                      className="col"
                    ></Form.Control>
  
                    {/* Label with category and select options  */}
                    <Form.Label className="col-md-2">Category :</Form.Label>
                    <Form.Control type="text" value={this.state.category} onChange={this.handleCategory}
                      className="col"
                    ></Form.Control>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </Card.Header>
            {/* Basing on permission of user which is stored into localStorage during session
                Some user can have full permission to see all type of conversations, others can:
                Only if user with permission is same with license requirements can see the note or the note without license requirement can see by everyone
                user have two type of permission can see any type of note, admin can do it too */}
              
              <Card.Body>
    {
            ((localStorage.getItem('permission')===this.state.permission) || (this.state.permission==="") 
            || (localStorage.getItem('permission')==="RISIA and RCIC") || (localStorage.getItem('permission')==="admin")) ?
                <Tabs >
                <TabList>
                <Tab>Note</Tab>
                <Tab>Shared Link</Tab>
                <Tab>Uploaded File</Tab>
                </TabList>
    
            
            <TabPanel>
            <Form.Group>
          <Form.Label className="col-md-2">Note</Form.Label>
          {/* Basing on username of user which is stored into localStorage during session
                Only user who created the note can see and update inside note text box
                Other user only can give comments
                Shared Links tab and Upload file tab are open for every user can access*/}
      {
        ((localStorage.getItem('user_name')===this.state.create)) ?
        <Form.Control className="col" type="textarea" value={this.state.note} style={{"height":"100px"}} onChange={this.handleChangeNote}></Form.Control>:

        <Form.Control className="col" type="textarea" value={this.state.note} style={{"height":"100px"}} readOnly></Form.Control>	
        
      }	
      <Form.Label className="col-md-2">Comment:</Form.Label>
      {((localStorage.getItem('user_name')!==this.state.create)) ?
                <Form.Control className="col" type="textarea" value={this.state.comments} style={{"height":"100px"}} onChange={this.handleChangeComment}></Form.Control>:
                <Form.Control className="col" type="textarea" value={this.state.comments} style={{"height":"100px"}} readOnly></Form.Control>
      }
            </Form.Group>
            </TabPanel>
            <TabPanel>
                <Form.Group>
                    <Form.Label className="col-md-2">Shared Link</Form.Label>
                    <Form.Control className="col" type="textarea" value={this.state.sharedLink} style={{"height":"100px"}} onChange={this.handleSharedLink}></Form.Control>
                </Form.Group>
            </TabPanel>
            <TabPanel>
              <UploadFile />
            </TabPanel>
            </Tabs>:
            /* any user without appropriated permission only see information of student and can not see the note*/
            <Tabs >
            <TabList>
            <Tab>Note</Tab>
            <Tab>Shared Link</Tab>
            <Tab>Uploaded File</Tab>
            </TabList>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            </Tabs>
  }
              </Card.Body>
          <div style={{display:"inline-block"}}>
          {/* Button update to execute edit from user*/}
            <Button
              className="btn m-3 col-md-2"
              style={{ float: "right",background:"#744197",border:"none",cursor:"pointer" }}
              onClick={this.handleUpdate}
            >
              Update
            </Button>
        {/* Button cancle to comeback to briefshow/id page*/}
          <Link to={{pathname: `/isms/briefshow/${this.state.studentID}`}}>
            <Button
              className="btn btn-danger m-3 col-md-2"
              style={{ float: "right",cursor:"pointer" }}
            >
              Cancel
            </Button>
          </Link>
          
        
          </div>
        </Card>
      ) 
  }
}
export default DetailDialog;
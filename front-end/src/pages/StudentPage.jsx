//////////////////////////////////////               StudentPage.jsx                //////////////////////////////////////
/**
 *
 * @file StudentPage.jsx
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
import {Navbar,FootNav } from "../components";
import React, {Component} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import addStudent from "../images/download.png";
import {  Card  } from "react-bootstrap";
import apis from "../api/student"
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import "../css/loginpage.css";
//#endregion

const AddStudentButton = styled.button`
  color: #fff;
  background-color: #800080;
  border:none;
  border-radius:5px;
  padding:10px;
  margin:10px;
  lette-spacing:0px !important  ;
  float: right;
`;


const Label = styled.label`
  font-weight: bold;
  display:inline-block;
`;

const Wrapper = styled.div.attrs({
  className: "form-group container",
})`
  padding:0px;
  text-transform: capitalize;
`;
const Detail = styled.div`
    color: #0000ff;
    cursor: pointer;
`
const InputText = styled.input.attrs({
  className: "form-control",
})`
  display:inline-block;
  width: 400px;
`;
class Details extends Component {
  updateUser = event => {
      event.preventDefault()
      console.log(this.props.id)
      window.location.href=`/isms/briefshow/${this.props.id}`
  }

  render(){
      // invike the update view for the current row -> this.props
      return <Detail onClick={this.updateUser}>Details</Detail>
  }
}
class StudentPage extends Component{
  constructor(props) {
    super(props)
    this.state = {
        student: [],
        allstudents:[],
        isLoading: false,
        
    }
}
componentDidMount = async() => {
  // turn on isLoading flag which we load data
  this.setState({isLoading:true})

  await apis.getAllStudents()
              .then(
                  // this album is the data coming from api call
                  student => {
                      this.setState({
                          student: student.data.data,
                          // need to reference the data using syntax above right
                          // then turn isLoading off now that we're done
                          allstudents:student.data.data,
                          isLoading: false
                          
                      })
                  }
              )
}
handleFilter= async event=>{
  let {student}=this.state
  student=this.state.allstudents.filter(a=>a.std_id.toString().includes(event.target.value) || a.first_name.includes(event.target.value) ||a.last_name.includes(event.target.value));
  this.setState({student:student})
  }
  
	render(){
    const {student, isLoading} = this.state;
    const columns = [
			{
                Header: 'Orders',
                accessor:'student_id',
                style: {'whiteSpace':'unset'},
                // specify a row of data to display
                Cell: row => <div style={{textAlign: "center"}}>{row.value}</div>

            },
            {
                Header: 'Student ID ',
                accessor:'std_id',
                style: {'whiteSpace':'unset'},
                // specify a row of data to display
                Cell: row => <div style={{textAlign: "center"}}>{row.value}</div>

            },
            {
                Header: 'First name ',
                accessor:'first_name',
                style: {'whiteSpace':'unset'},
                // specify a row of data to display
                Cell: row => <div style={{textAlign: "center"}}>{row.value}</div>

            },
            {
                Header: 'Last Name',
                accessor:'last_name',
                style: {'whiteSpace':'unset'},
                // specify a row of data to display
                Cell: row => <div style={{textAlign: "center"}}>{row.value}</div>

            },
            {
              Header: '',
              accessor: '',
              width: 100,
              Cell: function(props) {
                // console.log(props.original.std_id);
                // const rows=props;
                // console.log(rows);
                  return(
                      <span>
                          <Details id={props.original.student_id} />
                      </span>
                  )
              }

          },
          ]
          let showTable = true
          if (!student.length) {
              showTable = false
          }
		return(
			<div className="container">
            <Navbar/>
            <Card className="shadow mt-2">
			    <Link to="/isms/addstudent">
					<AddStudentButton className="AddStudent">
						<img
						src={addStudent}
						width="30"
						height="30"
						
						></img>{" "}
						Add New / Prospective Student
					</AddStudentButton>
					</Link>
          <Wrapper>
				<Label className="m-3">Search: </Label>
				<InputText
                    type="text"
					          placeholder="Student ID"
                    onChange={this.handleFilter}
                />
                {showTable && (
                    <ReactTable 
                        data={student}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                   
                    />
                )}
            </Wrapper>
            </Card>
            <FootNav />
			</div>
		);
	}; 

}

export default StudentPage;
//#region for  IMPORT
/**
 *   @notice watch to address, if change path, must modify in the require part*/
//////////////////////////////////////               UserList.jsx                //////////////////////////////////////
/**
 *
 * @file UserList.jsx
 * @copyright ISMS(International Student Management System)
 * @version 1.0.0
 * @author cyberbot team, software developer program
 * @release summer 2022
 * @owner Saskatchewan Polytechnic, Saskatoon Campus
 *
 */
//////////////////////////////////////
import React, { Component } from "react";
import { Button, Form, Card } from "react-bootstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import apis from "../api/student";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
//#endregion

// Bootstrap styling for Detail tag
const Detail = styled.div`
  color: #0000ff;
  cursor: pointer;
`;
// Class component named "Details"
class Details extends Component {
  constructor(props) {
    super(props);
    // State for react component this is used to save permission, showModal as boolean
    this.state = {
      showModal: false,
      permission: "",
    };
  }
  // Function to handle the close of modal
  handleCloseModal=async (event)=>{
    this.setState({showModal:false})
  }
  // Function to handle the close of modal and call api to update permission of user
  handleClose = async (event) => {
    // set the state of showModal to false
    this.setState({ showModal: false });
    // Api call from "student.js" sending id,permission from the state
    await apis.updatePermission(this.props.id, this.state.permission).then(
      // window alert
      window.alert("Permission is updated!!")
    );
    // window reload
    window.location.reload();
  };

  // Function to handle the permission
  handlePermission = async (event) => {
    // This sets the state permission to what browser sends
    this.setState({ permission: event.target.value });
  };

  // Function to handle the Modal
  handleModal = (event) => {
    // prevents the default
    event.preventDefault();
    // This sets the state modal to true and permission from state
    this.setState({ showModal: true, permission: this.props.permission });
  };

  render() {
    return (
      <>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Change user's permission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Select
              className="mb-3 col-md-auto"
              onChange={this.handlePermission}
            >
              <option>Select permission</option>
              <option value="RISIA">RISIA</option>
              <option value="RCIC">RCIC</option>
              <option value="RISIA and RCIC">RCIC and RISIA</option>
              <option value="admin">admin</option>
              <option value="No Certification">No Certification</option>
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Detail onClick={this.handleModal}>Details</Detail>
      </>
    );
  }
}

// Class component named "UserList"
class UserList extends Component {
  constructor(props) {
    super(props);
    // State for react component this is used to save user, search, isLoading as boolean
    this.state = {
      user: [],
      isLoading: false,
      search: "",
    };
  }

  // This function is like a effect to run on load
  componentDidMount = async () => {
    // turn on isLoading flag which we load data
    this.setState({ isLoading: true });
    // api call from "Auth.js"
    await apis.getAllUsers().then((response) => {
      // set the user to response from api call
      this.setState({
        user: response.data.data,
        // need to reference the data using syntax above right
        // then turn isLoading off now that we're done
        isLoading: false,
      });
    });
  };
  render() {
    // get data from state
    const { user, isLoading } = this.state;
    // set up columns for the react table
    // requires Header and accessor for Column Header text and field the column is displaying
    const columns = [
      {
        Header: "First Name",
        accessor: "first_name",
        style: { whiteSpace: "unset" },
        // specify a row of data to display
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
      },
      {
        Header: "Last Name",
        accessor: "last_name",
        style: { whiteSpace: "unset" },
        // specify a row of data to display
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
      },
      {
        Header: "Username",
        accessor: "user_name",
        style: { whiteSpace: "unset" },
        // specify a row of data to display
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
      },
      {
        Header: "Permission",
        accessor: "permission",
        style: { whiteSpace: "unset" },
        // specify a row of data to display
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
      },
      {
        // empty header and accessor to display
        Header: "",
        accessor: "",
        Cell: function (props) {
          // returns the id and permission type to display
          return (
            <span>
              <Details
                id={props.original.user_id}
                permission={props.original.permission}
              />
            </span>
          );
        },
      },
    ];

    // variable "showTable" is set to true
    let showTable = true;
    return (
      <>
        {/* Card with styles */}
        <Card
          className="mx-auto "
          style={{ width: "100%", "margin-top": "40px" }}
        >
          {/* Display the table when showTable is true  */}
          {showTable && (
            // Table with user and columns and default page size with 10 result
            <ReactTable
              data={user}
              columns={columns}
              loading={isLoading}
              defaultPageSize={10}
              showPageSizeOptions={true}
              minRows={0}
            />
          )}
        </Card>
      </>
    );
  }
}

// export the "UserList" component
export default UserList;

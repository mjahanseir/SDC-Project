//////////////////////////////////////               UserManagement.jsx                //////////////////////////////////////
/**
 *
 * @file uploadFile.jsx
 * @copyright ISMS(International Student Management System)
 * @version 1.0.0
 * @author cyberbot team, software developer program
 * @release summer 2022
 * @owner Saskatchewan Polytechnic, Saskatoon Campus
 *
 */
//////////////////////////////////////
import React from "react";
import axios from 'axios';


class UploadFile extends React.Component{

  constructor(props){
    super(props);
    // state for react component with all the file fields
    this.state = {
      filename : '',
      selectedFile: null
    }
  }
  
   // function to handle files from input
  fileSelectedHandler = async event => {
    let file = event.target.files[0].name;
    this.setState({
      //Set the state from filename and proper file
      filename: document.getElementById('file').value,
      selectedFile: event.target.files[0]
    });
  }

  // function to handle an object with attached file
  fileUploadHandler = async event => {
    event.preventDefault();
    //FormData object will send a multipart/form-data to the server
    let formData = new FormData();
    formData.append('filename', this.state.filename);
    formData.append('file', this.state.selectedFile);
  
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    
    //sending requesto to server to send FormData object and its configuration
    axios.post("http://localhost:3001/isms/updateFile/1", formData, config)
        .then (res => {
            console.log(res.data);
            console.log(this.state.filename);
            console.log(formData);
            window.alert("File is uploaded")
        });
  }

  render(){
    return(
      <div>
        <form encType="multipart/form">
        <input type="file" name="file" id="file" placeholder="Upload Document" onChange={this.fileSelectedHandler}/>
        <button type="submit" onClick={this.fileUploadHandler}>Add File</button>
        <div>{this.state.filename}</div>
        </form>
      </div>
    );
  }
}

export default UploadFile;

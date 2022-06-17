//////////////////////////////////////               UserManagement.jsx                //////////////////////////////////////
/**
 *
 * @file index.jsx
 * @copyright ISMS(International Student Management System)
 * @version 1.0.0
 * @author cyberbot team, software developer program
 * @release summer 2022
 * @owner Saskatchewan Polytechnic, Saskatoon Campus
 * Main: Route for each page
 */
//////////////////////////////////////
import React, {Component} from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import {LoginView, RegisterUser,BriefShowStudent,AddConversation,DetailDialog,StudentPage,UserManagement,AddStudent,ResetPassword} from '../pages';
import"bootstrap/dist/css/bootstrap.min.css"

class App extends Component{
    render(){
        return(
            <Router>
                    {/*This template will contain forms to insert data and tables to show data.
                        Every single component has its own implementation.
                        If there is a situation to add more components or remove components
                    */}
                    <Switch>
                    {/* Component that Shows loging page */}
                    <Route exact path="/" extract component={LoginView}/>
                   
                   {/* Component that Shows the detailed student’s information */}
                    <Route path="/isms/briefshow/:id" extract component={BriefShowStudent}/>
                    
                    {/* Component that Shows the form to input user’s information data */}
                    <Route path="/isms/register" extract component={RegisterUser}/>

                    {/* Component that Shows the students’ basic information in a table with searching operation. This page has two options,  to add new student or setup user’s profiles (applicable to Admin). */}
                    <Route path="/isms/studentpage" extract component={StudentPage}/>

                    {/* Component that Shows the users’ basic information in a table. Option to add new User or Update user’s role. This page is applicable to Admin  */}
                    <Route path="/isms/usermanagement" extract component={UserManagement}/>

                    {/* Component that Shows a form to input user’s information data. */}
                    <Route path="/isms/addstudent" extract component={AddStudent}/>

                    {/* Component that Show a forms to add conversation to students */}
                    <Route path="/isms/addnote/:id" extract component={AddConversation}/>

                    {/* Component that Shows a form to reset password for users. */}
                    <Route path="/isms/resetpassword" extract component={ResetPassword}/>

                    {/* Component that shows a table with Detailed dialog between Students and Users */}
                    <Route path="/isms/detaildialog/:id" extract component={DetailDialog}/>
                    
                    </Switch>
            </Router>
        )
    }
}
export default App;
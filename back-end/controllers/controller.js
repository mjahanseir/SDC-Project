//////////////////////////////////////               CONTROLLER.JS                //////////////////////////////////////
/**
 *
 * @file controller.js
 * @copyright ISMS(International Student Management System)
 * @version 1.0.0
 * @author cyberbot team, software developer program
 * @release summer 2022
 * @owner Saskatchewan Polytechnic, Saskatoon Campus
 *
 */

//////////////////////////////////////                  SUMMARY                  //////////////////////////////////////
/**
 * @description All routes are on this page and for connection to the database is necessary to require connect.js
 *              Database in this application is Relational Database and use MySQL.
 * @returns for each route we get connection associate with the specific query to return proper result that is expecting for
 *          the route
 * @throws  for each route if the route could not retrieve data from table or connection has problem thow error
 *          with 400(or other 400~499 error) status for bad request response indicates server could not process
 *          the request regard to client error
 * @throws  if the connection is established and the route is running, this status is 200(or other request succeeded code
 *          between 200 to 299)
 * @callback each route has callback function attach to database object variable, that create in connect.js located in db folder
 *
 *
 *@module getAllStudents  this route  GET all student's information                 // Restful, CRUD -> Read
 *@module getStudentById  this route  GET one student's information                 // Restful, CRUD -> Read
 *@module createStudent   this route  POST a student's information                  // Restful, CRUD -> Create
 *@module addStudent      this route  POST a new student's information              // Restful, CRUD -> Create
 *@module updateStudent   this route  update a student's information                // Restful, CRUD -> Update
 *@module deleteStudent   this route  delete a student from table                   // Restful, CRUD -> Delete
 *@module getAllUsers     this route  GET all user's information from database      // Restful, CRUD -> Read
 *@module getUserById     this route  GET one user's information from user table    // Restful, CRUD -> Read
 *@module getUsersView
 *@module createUser      this route  Create a new user and POST it in database     // Restful, CRUD -> Create
 *@module addUser         this route  POST a new user's information                 // Restful, CRUD -> Create
 *@module updateUser      this route  update a user's information from table        // Restful, CRUD -> Update
 *@module deleteUser      this route  delete a user from table                      // Restful, CRUD -> Delete
 *@module resetPassword   this route  for reset password andupdate user information // Restful, CRUD -> Update
 *@module login           this route  for login user into systme                    // Restful, CRUD -> Read
 *@module getConversation this route  GET conversation for each student             // Restful, CRUD -> Read
 *@module getConversationByConsID  this route  GET conversation for specific student// Restful, CRUD -> Read
 *@module createConversation       this route  create a new conversation            // Restful, CRUD -> Create
 *@module updateConversation        this route  update a conversation   from table  // Restful, CRUD -> Update
 *@module updateFile     this route  POST a file and uplad it                       // Restful, CRUD -> Create
 */

//////////////////////////////////////               SETUPS                //////////////////////////////////////

//#region for  IMPORT
/**  attach the database setting in this file by using require
 *   @notice watch to address, if change path, must modify in the require part*/

const dayjs = require('dayjs');
const dbObject = require("../db/connect");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//#endregion

//////////////////////////////////////              STUDENTS               //////////////////////////////////////

//#region for  GET ALL STUDENTS
/**
 * @module    get all students from the database and show them in a JSON file. In this module, use Read in CRUD operation also
 *            use Get method
 * @callback  anonymous callback function gets the query to return all students filed in the database, the result of the query:
 *            - if failed go to the first part(error), throws with 400 and JSON object return unsuccessful and error.
 *            - if the result of the query is successful, return status 200, which means the process is succesful and returns
 *                data store in the json object.
 * @params  prospective,std_id,first_name,middle_name,last_name,gender, birthdate,email, country,academic_period, campus,program,
 *          degree, year, graudate_ind, enroll
 * @throws   tthrows error 400 if it could not show students information
 * @throws   throws status 200 and return students information
 * @returns  send successfull message.
 */
getAllStudents = async (req, res) => {
  dbObject.getConnection((err, connection) => {
    connection.query(
      "SELECT * FROM student ORDER BY student_id DESC",
      (err, rows) => {
        connection.release();
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, data: rows });
      }
    );
  });
};
//#endregion

//#region for  GET STUDENT BY ID
/**
 * @module    same as GET ALL STUDENTS, but this module return specific student by student_id. when process is successful and
 *            student by specific id is in the database return the student's information and if query does not return anything
 *            throw an error to user
 *            In this module, use Read in CRUD operation also use Get method
 * @callback  in the first part of the module, save student id that looking for and save it in local studentId varibale. Then
 *            save qurey for return all fileds of the specific student.
 *            anonymous callback function gets the query, studentID and revoke other nested callback function to return result
 *            of searching specific student:
 *            - if result is failed, throws with 400 and JSON object return unsuccessful and error.
 *            - if the result of the query is successful, return status 200, which means the process is succesful and returns
 *              students inormation in JSON object to show user.
 * @params  prospective,std_id,first_name,middle_name,last_name,gender, birthdate,email, country,academic_period, campus,program,
 *          degree, year, graudate_ind, enroll
 * @throws   tthrows error 400 if it could not show the student information
 * @throws   throws status 200 and return the student information
 * @returns  send successfull message
 */
getStudentById = async (req, res) => {
  var studentId = req.params.id;

  var sql = "SELECT * FROM student WHERE student_id = ?";
  dbObject.getConnection((err, connection) => {
    connection.query(sql, studentId, (err, rows) => {
      connection.release();
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: rows });
    });
  });
};
//#endregion

//#region for   CREATE A NEW STUDENT
/**
  * @module    get student's information and put into student table and create a new student with POST method.
  *            in the first part save sql query for insert and save values get from user and save in same order in array variable named values
  * @callback  first anonymous callback function after checking connection invoke query and in second function check query and values saved in array
  *            same as other part response proper output with JSON object and messages:
  *            - if error happend, throws with 400 means unsuccessful result
  *            - if successful, return status 200 and return that student information in JSON object 
  * @params  prospective,std_id,first_name,middle_name,last_name,gender, birthdate,email, country,academic_period, campus,program, degree, year, 
             graudate_ind, enroll
  * @throws   throws error 400 if it could not add information to user
  * @returns  send successfull message to user
  */
createStudent = async (req, res) => {
  var sql =
    "INSERT INTO student (prospective, std_id, first_name, middle_name, last_name, gender, birthdate, email, country, academic_period, campus, program, degree, year, graudate_ind, enroll) VALUES ?";
  var values = [
    [
      req.body.prospective,
      req.body.std_id,
      req.body.first_name,
      req.body.middle_name,
      req.body.last_name,
      req.body.gender,
      req.body.birthdate,
      req.body.email,
      req.body.country,
      req.body.academic_period,
      req.body.campus,
      req.body.program,
      req.body.degree,
      req.body.year,
      req.body.graudate_ind,
      req.body.enroll,
    ],
  ];

  dbObject.getConnection((err, connection) => {
    connection.query(sql, [values], (err, rows) => {
      connection.release();
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ message: "Student Created" });
    });
  });
};
//#endregion


//#region for   UPDATE STUDENT
/**
  * @module    for changing and other data manipulation first retrive student's information by student_id and update data. Then put into student table
  *            and replace with old information. This module use PUT method.
  *            same as get student by id store student id in local variable, save query in sql and values as give from students in values array
  * @callback  like other student's modules first anonymous callback function after checking connection, query and  check query in the next steps
  *            same as other part response proper output with JSON object and messages:
  *            - if error happend, status 400 otehrwise status 200 and return student information in JSON object 
  * @params  prospective,std_id,first_name,middle_name,last_name,gender, birthdate,email, country,academic_period, campus,program, degree, year, 
             graudate_ind, enroll
  * @throws   throws error 400 if it could not add information to user
  * @returns  send successfull message to user
  */
updateStudent = async (req, res) => {
  var studentId = req.params.id;
  var sql =
    "UPDATE student SET std_id = ?, first_name = ?, middle_name = ?, last_name = ?, gender = ?, birthdate = ?, email = ?, country = ?, academic_period = ?, campus = ?, program = ?, degree = ?, year = ?, graudate_ind = ?, enroll = ? WHERE student_id = "+studentId;
  var values = [
    req.body.std_id,
    req.body.first_name,
    req.body.middle_name,
    req.body.last_name,
    req.body.gender,
    req.body.birthdate,
    req.body.email,
    req.body.country,
    req.body.academic_period,
    req.body.campus,
    req.body.program,
    req.body.degree,
    req.body.year,
    req.body.graudate_ind,
    req.body.enroll,
  ];

  dbObject.getConnection((err, connection) => {
    connection.query(sql, values, (err, rows) => {
      connection.release();
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ message: "Student Updated" });
    });
  });
};
//#endregion

//#region for   DELETE STUDENT
/**
  * @module    Delete student is the last part of CRUD operation and for this module first get student by id and run the query for remove all infoemation 
  *            of that student
  * @callback  two anonymous callback functions are responsible to return proper result and if error happened or process is successful return status 400
  *            or 200 in order for error or success
  * @params  prospective,std_id,first_name,middle_name,last_name,gender, birthdate,email, country,academic_period, campus,program, degree, year, 
             graudate_ind, enroll
  * @throws   throws error 400 if it could not add information to user
  * @returns  send successfull message to user
 */

deleteStudent = async (req, res) => {
  var studentId = req.params.id;
  var sql = "DELETE FROM student WHERE student_id = ?";
  dbObject.getConnection((err, connection) => {
    connection.query(sql, studentId, (err, rows) => {
      connection.release();
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ message: "Student Deleted" });
    });
  });
};
//#endregion

//////////////////////////////////////                USERS               //////////////////////////////////////

//#region for    GET ALL USERS
/**
 * @module    get all users from the database and show them in a JSON file. In this module, use Read in CRUD operation also
 *            use Get method
 * @callback  anonymous callback function gets the query to return all users filed in the database, the result of the query
 *            if failed first part(error), throws with 400 and JSON object return unsuccessful and error.
 *            if the result of the query is the triumphant return status 200, which means the process is succesful and returns
 *            data store in the json object.
 * @params  user_id, first_name, last_name, email, tel, user_name,password
 * @throws   tthrows error 400 if it could not show students information
 * @throws   throws status 200 and return students information
 * @returns  send successfull message
 */
getAllUsers = async (req, res) => {
  dbObject.getConnection((err, connection) => {
    connection.query("SELECT * FROM user", (err, rows) => {
      connection.release();
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: rows });
    });
  });
};

//#endregion

//#region for  GET USER Permission BY ID
/**
 * @module    same as GET ALL USERS permission, but this module return specific user by user_id. when process is successful and
 *            user by specific id is in the database return the user's information and if query does not return anything
 *            throw an error to user
 *            In this module, use Read in CRUD operation also use Get method
 * @callback  in the first part of the module, save user id that looking for and save it in local userId varibale. Then
 *            save qurey for return all fileds of the specific user.
 *            anonymous callback function gets the query, userID and revoke other nested callback function to return result
 *            of searching specific user:
 *            - if result is failed, throws with 400 and JSON object return unsuccessful and error.
 *            - if the result of the query is successful, return status 200, which means the process is succesful and returns
 *              users inormation in JSON object to show user.
 * @params  user_id, first_name, last_name, email, tel, user_name,password
 * @throws   tthrows error 400 if it could not show the user information
 * @throws   throws status 200 and return the user information
 * @returns  send successfull message
 */
updatePermission = async (req, res) => {
  var user_id = req.body.id;
  var permission = req.body.permission;
  
  var sql = "UPDATE user SET permission=?  WHERE user_id = " + user_id;
  dbObject.getConnection((err, connection) => {
    connection.query(sql, permission, (err, rows) => {
      connection.release();
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: rows });
    });
  });
};

//#endregion


//#region for   CREATE A NEW USER
/**
 * @module    ceaate a new user and get user's information and send to user table
 *            save query for insert information in a variable and get data from customer save it in an array, then check the connection and throw proper information
 * @params  user_id, first_name, last_name, email,tel ,user_name, password
 * @throws   throws error 400 if it could not add information to user
 * @returns  send successfull message to user
 */
createNewUser = async (req, res) => {
  try {
    // I added not for isAuthenticated
    const userData = req.body.vals; // grab onto the new user array of values
    // console.log(req.body.vals);
    bcrypt.hash(userData[5], saltRounds, (err, hash) => {
      if (err) {
        console.error(err);
      }
      userData[5] = hash; // replace plain text password with hash
      const vals = [
        userData[0],
        userData[1],
        userData[2],
        userData[3],
        userData[4],
        userData[5],
        userData[6],
      ];

      const queryString = `INSERT INTO user (first_name,last_name ,email ,tel ,user_name, password, permission) VALUES (?,?,?,?,?,?,?)`;
      dbObject.execute(queryString, vals, (err, result) => {
        if (err) throw err;
        else {
          return res.status(200).json({ success: true });
        }
      });
    });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};


//#region for   ADD A USER
/**
 * @module    Add a new user , send to user table
 *            save query for insert information in a variable and get data from customer save it in an array, then check the connection and throw proper information
 * @params  user_id, first_name, last_name, email,tel ,user_name, password
 * @throws   throws error 400 if it could not add information to user
 * @returns  send successfull message to user
 */
addUser = async (req, res) => {
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var email = req.body.email;
  var tel = req.body.tel;
  var user_name = req.body.user_name;
  var password = req.body.password;
  var permission = req.body.permission;
  var role = req.body.role;

  var sql = `INSERT INTO user (first_name,last_name ,email ,tel ,user_name, password,role) VALUES ('${first_name}','${last_name}','${email}','${tel}','${user_name}', '${password}', '${permission}')`;

  dbObject.getConnection((err, connection) => {
    connection.query(sql, (err, rows) => {
      connection.release();
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ message: "User Added" });
    });
  });
};
//#endregion

//#region for   UPDATE USER
/**
 * @module    for changing and other data manipulation first retrieve user's information by user_id and update data. Then put into user table
 *            and replace with old information. This module use PUT method.
 *            same as get user by id store user id in local variable, save query in sql and values as give from users in values array
 * @callback  like other user's modules first anonymous callback function after checking connection, query and  check query in the next steps
 *            same as other part response proper output with JSON object and messages:
 *            - if error happened, status 400 otherwise status 200 and return user information in JSON object
 * @params  user_id, first_name, last_name, email, tel, user_name,password
 * @throws   throws error 400 if it could not add information to user
 * @returns  send successful message to user
 */
updateUser = async (req, res) => {
  var userId = req.params.id;
  var sql =
    "UPDATE user SET user_id = ?, first_name = ?, last_name = ?, role = ?, email = ?, tel = ?, user_name = ?, password = ?  WHERE user_id = " +
    userId;
  var values = [
    req.body.user_id,
    req.body.first_name,
    req.body.last_name,
    req.body.role,
    req.body.email,
    req.body.tel,
    req.body.user_name,
    req.body.password,
  ];
  dbObject.getConnection((err, connection) => {
    connection.query(sql, values, (err, rows) => {
      connection.release();
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ message: "User Updated" });
    });
  });
};
//#endregion

//#region for   DELETE USER
/**
 * @module    Delete user is the last part of CRUD operation and for this module first get user by id and run the query for remove all information
 *            of that user
 * @callback  two anonymous callback functions are responsible to return proper result and if error happened or process is successful return status 400
 *            or 200 in order for error or success
 * @params  user_id, first_name, last_name, email, tel, user_name,password
 * @throws   throws error 400 if it could not add information to user
 * @returns  send successful message to user
 */
deleteUser = async (req, res) => {
  var userId = req.params.id;
  var sql = "DELETE FROM user WHERE user_id = ?";
  dbObject.getConnection((err, connection) => {
    connection.query(sql, userId, (err, rows) => {
      connection.release();
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ message: "User Deleted" });
    });
  });
};
//#endregion

//#region for   RESET PASSWORD
/**
 * @module    Reset Password provides reset password for user by getting user_id and reset password
 * @callback  two anonymous callback functions like other routes responsible to return proper result or error
 * @params  user_id, user_name,password
 * @throws   throws error 400 if it could not add information to user
 * @returns  send successful message to user
 */
resetPassword = async (req, res) => {
  try {
    var userName = req.body.vals[0];
    //  not for isAuthenticated
    // grab onto the new user array of values
    bcrypt.hash(req.body.vals[1], saltRounds, (err, hash) => {
      if (err) {
        console.error(err);
      }
      req.body.vals[1] = hash;
      console.log(req.body.vals[1]);
      var sql =
        "UPDATE user SET  password = ? WHERE user_name = '" + userName + "'";
      var values = [req.body.vals[1]];
      dbObject.getConnection((err, connection) => {
        connection.query(sql, values, (err, rows) => {
          connection.release();
          if (err) {
            return res.status(400).json({ success: false, error: err });
          }
          return res.status(200).json({ message: "Password Updated" });
        });
      });
    });
  } catch {}
};

//#endregion

//#region for   LOGIN
/**
 * @module    Login page for users
 * @callback  two anonymous callback functions like other routes responsible to return proper result or error
 * @params   user_name,password
 * @throws   throws error 400 if it could not add information to user
 * @returns  send successful message to user
 */
 login = async (req, res) => {
  dbObject.getConnection((err, connection) => {
    if (err) {
      return res.send({ message: "Wrong username" });
    }
    connection.query(
      "SELECT * from user where user_name=?",
      req.body.vals[0],
      (error, rows) => {
        
        let user = rows[0];
        if(error|| user===undefined){
          return res.send({ message: "Wrong username" });
        }
        let match = bcrypt.compareSync(req.body.vals[1], user.password);

        if (match) {
          console.log("password matched");
          res.status(200).json({ data: user.permission });
        } else {
          console.log("Wrong password");
          return res.json({ message: "Wrong password" });
        }
      }
    );
  });
};
//#endregion

//////////////////////////////////////           CONVERSATION           //////////////////////////////////////

//#region for  Get CONVERSATION by student ID and by Conversation ID
/**
 * @module    get information for each student and get conversation result
 * @params    conversation_id,category,datecreated,createdby,lastupdatedby,subject,sharedLink,permission
 * @throws    throws error 400 if it could not show the user information
 * @throws    throws status 200 and return the user information
 * @returns   send successfull message
 */
getConversation = async (req, res) => {
  var studentId = req.params.id;

  var sql =
    "SELECT conversation_id,category,datecreated,createdby,lastupdatedby,subject,sharedLink,permission FROM conversation JOIN student USING(student_id) WHERE student_id= ?";
  dbObject.getConnection((err, connection) => {
    connection.query(sql, studentId, (err, rows) => {
      connection.release();
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: rows });
    });
  });
};
getConversationByConsID = async (req, res) => {
  var cons_id = req.params.id;
  var sql =
    "SELECT student_id,category,datecreated,createdby,lastupdatedby,subject,note,comments,sharedLink,permission FROM conversation JOIN student USING(student_id) WHERE conversation_id= ?";
  dbObject.getConnection((err, connection) => {
    connection.query(sql, cons_id, (err, rows) => {
      connection.release();
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: rows });
    });
  });
};
//#endregion

//#region for  CREATE CONVERSATION
/**
 * @module    Create a new conversation
 * @params    note , comments, sharedLink
 * @throws   throws error 400 if it could not show the user information
 * @throws   throws status 200 and return the user information
 * @returns  send successfull message
 */
 createConversation = async (req, res) => {
  var student_id = req.body.student_id;
  var note = req.body.note;
  var category = req.body.category;
  var subject = req.body.subject;
  var sharedLink = req.body.sharedLink;
  var permission = req.body.permission;
  var created = req.body.created;
  var comments = req.body.comments;
  var date=dayjs();
  
  var sql = `INSERT INTO conversation (student_id,note,category,subject,sharedLink,permission,createdby,comments,datecreated) VALUES ('${student_id}','${note}','${category}','${subject}','${sharedLink}','${permission}','${created}','${comments}','${date.format()}')`;

  dbObject.getConnection((err, connection) => {
    connection.query(sql, (err, rows) => {
      connection.release();
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ message: "User Created" });
    });
  });
};
//#endregion
//#region for  Update CONVERSATION by Conversation ID
/**
 * @module    put information of conversation and update new information
 * @params    conversation_id,category,datecreated,createdby,lastupdatedby,subject,sharedLink,permission
 * @throws    throws error 400 if it could not show the user information
 * @throws    throws status 200 and return the user information
 * @returns   send successfull message
 */
updateConversation = async (req, res) => {
  var conversation_id = req.params.id;
  var note = req.body.note;
  var comments = req.body.comments;
  var sharedLink = req.body.sharedLink;
  var subject=req.body.subject;
  var category=req.body.category
  var lastupdatedby=req.body.lastupdatedby
 
  var sql =
    "UPDATE conversation SET note = ?, comments = ?, sharedLink = ?, subject=?, category=?, lastupdatedby=? WHERE conversation_id = " +
    conversation_id;
  var values = [note, comments, sharedLink,subject,category,lastupdatedby];
  dbObject.getConnection((err, connection) => {
    connection.query(sql, values, (err, rows) => {
      connection.release();
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ message: "Conversation Updated" });
    });
  });
};
//#endregion
//#region for  File Upload by Conversation ID
/**
 * @module    post file upload from local computer into conversation table by conversation id
 * @params    conversation_id,file upload
 * @throws    throws error 400 if it could not show the user information
 * @throws    throws status 200 and return the user information
 * @returns   send successfull message
 */

updateFile = async (req, res) => {
  let conversation_id = req.params.id;
  let uploadFile;
  let uploadFileName;
  let uploadPath;
  console.log(req.params.id);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No files were uploaded" });
  }

  uploadFile = req.files.file;
  uploadFileName = `${conversation_id}_` + req.files.file.name;

  uploadPath = __dirname + "\\upload\\" + uploadFileName;

  uploadFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).json({ success: false, error: err });
    dbObject.getConnection((err, connection) => {
      connection.query(
        `UPDATE conversation SET file_upload = ? WHERE conversation_id = ${conversation_id}`,
        uploadFileName,
        (err, rows) => {
          connection.release();
          if (!err) {
            return res.status(200).json({ message: "Updated File" });
          } else {
            return res.status(500).json({ success: false, error: err });
          }
        }
      );
    });
  });
};
//#endregion
//////////////////////////////////////              MODULE  EXPORTS               //////////////////////////////////////
/**
 * in the exports section we export all moudules as created and prepare them to use it in other pages or modules
 * @params   all routes
 * @exports  all routes
 */
module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllUsers,
  createNewUser,
  deleteUser,
  resetPassword,
  login,
  getConversation,
  getConversationByConsID,
  createConversation,
  updateConversation,
  updateFile,
  updatePermission,
};

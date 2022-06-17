# SDC-Project
##  Backend
We use backend as the bridge for our connectivity between database and apis used in front end. Server receives request from frontend and can accepts parameters through routes. These parameters are mostly ids. Server excutes CRUD operations (Create, Read, Update and Delete) to manage data. Server send a response after excuting a specific CRUD operation. The image shows a general idea about data processing when a route is invoked. This section we will describe the implementation of the backend project..

### Server
Server.js is the file that defines the listening port, URLs, Upload File managemet and Database. To developed backend we utilized the following libraries,
    1. Name: Express
    Version: "^4.18.1" Description:
     Express is a framework to do the server side functionality. This
    package provides plugins, template code, middleware packages, and routing
    functionality for faster and efficient web development.
    2. Name: MySQL
     Version: "^2.18.1"
    Description: My-Sql package is used to create database connection with our application to My-sql database.
    3. Name: MySQL2
    Version: "^2.3.3"
    Description: Updated version of MySQL for recent versions of MySQL.
    4. Name: Cors
    Version: “^2.8.5”
    Description: Provide Connect/Express middleware that can be used to enable CORS with various options. For this project, the server credentials.
    5. Name: Express-FileUpload
    Version: “^1.4.0”
    Description: Manage uploaded files and storage into the server.
    6. Name: Bcrypt
    Version: “^5.0.1”
    Description: Bcrypt is a password hashing module.
    7. Name: Passport
    Version: “^0.6.0”
    Description: Passport is authentication middleware for Node.js.
    8. Name: Passport-local
    Version: “^1.0.0”
    Description: Passport strategy for authenticating with a username and password in Node.js application.

### Controller
As well as Server, Controller is the important backend module and we put all CRUD operations. In controller we have four main sections: student, user, conversation and login. For each part we have some modules to access data and run quries. For student and user we get all or one row of table in database, also create, update and delete are important modules in this part. In conversation like other parts, in addition we have update file as well.

    Student:
    - getAllStudents 
    - getStudentById 
    - createStudent
    - addStudent
    - updateStudent 
    - deleteStudent
    User
    - getAllUsers
    - getUserById
    - getUsersView
    - createNewUser 
    - addUser
    - updateUser
    - deleteUser
     Conversation:
    - getConversation
    - getConversationByConsID 
    - createConversation
    - updateConversation
    - updateFile
     Login:
     - resetPassword 
     - login


### Routes
We created all modules and export it in the controller, in this part those modules are import and assign in the proper route. Each CRUD operation assign in specific route and user directed to that route(addtress) to access to the system.
routes:
       router.get("/getallstudent", controller.getAllStudents);
       router.get("/getstudent/:id", controller.getStudentById);
       router.post("/newstudent", controller.createStudent);
       router.post("/addstudent", controller.addStudent);
       router.put("/updatestudent/:id", controller.updateStudent);
       router.delete("/deletestudent/:id", controller.deleteStudent);
       router.get("/getconversationid/:id", controller.getConversation);
       router.get("/getconversationbyconsid/:id", controller.getConversationByConsID);
       router.post("/newconversation", controller.createConversation);
       router.put("/updateconversation/:id", controller.updateConversation)
       router.get("/user/getuser", controller.getAllUsers);
       router.get("/user/getuser/:id", controller.getUserById);
       router.get("/user/getUsersView", controller.getUsersView);
       router.post("/register", controller.createNewUser);
       router.post("/user/adduser", controller.addUser);
       router.post("/login", controller.login);
       router.put("/user/updateuser/:id", controller.updateUser);
       router.delete("/deleteuser/:id", controller.deleteUser);
       router.put("/resetpassword/:id", controller.resetPassword);
       router.post("/updateFile/:id", controller.updateFile);


### Login Server Side
We have to hightlight main functions from the security implementation. This part covers hashing and salting for encrypting passwords.
Bcrypt.hash(): -Bcrypt.hash is the hashing function allows us to build a password security platform that scales with computation power and always hashes every password with a salt.
This takes two arguments one is password to be hashed and another salt rounds and hashes the password accordingly.
SaltRounds: - salt rounds mean the cost factor. The cost factor controls how much time is needed to calculate a single Bcrypt hash. In this application we used salt rounds of 10 which means that many hashing rounds are done.
Bcrypt.compareSync(): - This function takes only two arguments and returns a Boolean value true or false. In this application we are comparing the user enter password with the hashed password saved in the database for the match.
   To setup, we follow these steps:
    1. In “route.js” file in users’ routes there is route with post “/login” calls the controller function called “login.”
    2. Most of the login work is done in “controller.js” file function called “login”
    3. First, we try to connect to database and search for username with SQL query.
    4. Save the password from the database if the username found.
    5. Then using bcrypt.compareSync function we compare with passed in password with
    already hashed password in database.
    6. If matched, we send back response to frontend using route.

### Database Connection
We created a relational database for storing data. Database manager is set up with correct parameters to get connectivity. Host, User and Password vary depending on MySQL setup initial parameters. As local computer, we used localhost, root as user and isms as database. If database is in the other server or on the Internet we use IP(Internet Protocol) address in the host name. All database information located in db/connect.js.
Our application is developed and tested in local computer. To create a Database pool connection, we set up the following parameters.


## Database
To manage all data from students, we design a relational database. This database was standarized and normalized taking the raw data as model and the requirements to complete the users idea. Raw data was provided in Excel Spreadsheets which is the current data.

## Front end
When we create a react project, the batch process from npx generates automatically the project structure. Our implementation is based on this structure and we describe our setup in the following table.

Modules: 
    Public      : Contains index.html. This attached main file inserts the content.
    Source      : Contains the developed application.
    source/api  :  Contains the request routes to server.
    source/app  : This folder is destined to define routes to get requests.
    source/components : Contains the main template components
    source/css  : Contains the style sheet for Login
    source/images     : Contains images used in the system.
    source/api  :  Contains the request routes to server. source/app source/components source/css source/images 
    source/pages: Contains the content components


To develope frontend we utilized the following libraries,
Version: "^5.1.3" Description:
, This package bootstrap is used to import
Usage: Using the import statement we can include the bootstrap package in our application.
Version: "^18.1.0" Description:
Usage: Using the import statement we can include the react package in our application.
Version: "^18.1.0" Description:
Usage: Using the import statement we can include the react-dom package in our application.
1. Name: Bootstrap
2. Name: React
 Version: "^2.4.0"
React package is used to create interactive UIs. Design simple views for
each state in our application, and React will efficiently update and render different
page layouts.
3. Name: React-bootstrap
 Description:
React package is used to create interactive UIs. Design simple views for
each state in our application, and React will efficiently update and render different
page layouts.
Usage: Using the import statement we can include the react-bootstrap package in our application.
4. Name: React-dom
 React package is a source for components, state, props.
The main usage is mounting our application to the index.
5. Name: React-router-dom
Version: "^18.1.0"
Description: React-router- dom package is used to do dynamic routing within our app.
Usage: Using the import statement we can include the react-router-dom package in
our application.
6. Name:React-scripts
Version: "^5.0.1"
Description: React-scripts package is used to start sets up the development environment and starts a server.
Usage: Using the import statement we can include the react-scripts package in our application.
7. Name: Styled-Components
Version: "^5.3.5"
Description: Styled-components package is used to add component level styles in
our application
Usage: Using the import statement we can include the styled-components package in our application.

### Components
The developed components with specific operation, the following table describes that operation.
      - LoginView  : Shows loging page
      - BriefShowStudent: Shows the detailed student’s information 
      - RegisterUser: Shows the form to input user’s information data
      - StudentPage : Shows the students’ basic information in a table with searching operation. This page has two options, to add new student or setup user’s profiles (applicable to Admin).
      - UserManagement : Shows the users’ basic information in a table. Option to add new User or Update user’s role. This page is applicable to Admin
      - AddStudent : Shows a form to input user’s information data.
      - AddConversation : Show a forms to add conversation to students
      - ResetPassword : Shows a form to reset password for users.
      - DetailDialog : Shows a table with Detailed dialog between Students and Users
      - Navbar.jsx : Show the Header, also shows the page status with the current user.
      - FootNav.jsx : Shows additional Saskatchewan Polytechnic Information.

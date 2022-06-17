# International Student Management System

This project involves creating a web application that has the ability to support the student advisors at Saskatchewan Polytechnic. 
The back-end provides connections to database and pathes to retrive and manipulate data.

### structure:
-- back-end 
---- controllers
------ controller['./controller/controller.js'] : contains all routes 
---- db
------ modules
-------- conversation-model
------ connect['./db/connect.js']   : connect to DataBase server and set up username and password to connect to database
---- routes
------ route['./routes/route.js']     : set up all routes create and export in CONTROLER.JS

### Server connection
- If database server changed or ip address manipulated, in connect.js page host:'...' must change
- If databade user name or password changed, in connect.js page user: '...' and password: '...' must change

### Troubleshoot
- If server does not work properly delete 'node_module' folder and package-lock.json then use 'npm i' in termial

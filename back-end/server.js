//////////////////////////////////////               ROUTE.JS                //////////////////////////////////////
/**
 * 
 * @file route.js
 * @copyright ISMS(International Student Management System)
 * @version 1.0.0
 * @author cyberbot team, software developer program
 * @release Summer 2022
 * @owner Saskatchewan Polytechnic, Saskatoon Campus
 * 
 */

//////////////////////////////////////                 SUMMARY                  //////////////////////////////////////
/**
 * Main page for backend
 * in this page all require are add 
 * Express module for connectivity add
 * database created in db/connect.js and require in the main page 
 * same as databse all routes that create in routes/route.js is add in this page
 * @module  express
 * @function Mainpage
 */
const express = require('express');
const backend = express();
const cors = require('cors')
const db = require('./db/connect');
const router = require('./routes/route');

const fileUpload = require('express-fileupload');
backend.use(fileUpload());
backend.use(express.static('upload'));
backend.use(express.json());
backend.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
/**
 * redirect the first page to isms/main and use router to run
 */
backend.get('/', function (req, res) {
    res.redirect("/isms/main");
});

backend.use('/isms', router);

/**
 * use port 3001 to start and listen this port
 * this is an arbitary port and we can use any other ports, if this port conflict with other applicatrion
 * use any port betwween 1024~65535 
 */
backend.listen(3001, () => {
    console.log('Server is running');
});
//////////////////////////////////////               COONECT.JS                //////////////////////////////////////
/**
 * @file connect.js
 * @copyright ISMS(International Student Management System)
 * @version 1.0.0
 * @author cyberbot team, software developer program
 * @release Summer 2022
 * @owner Saskatchewan Polytechnic, Saskatoon Campus
 */

//////////////////////////////////////                  SUMMARY                  //////////////////////////////////////
/**
 * @description  connect to MySQL Relational Database .
 * @returns      database connectivity and check connection
 * @param mysql  import mysql2 after install the package
 * @param pool   save database login and ip coonection
 * @notice       watch carefully ip address:
 *               - if database run in local machine use localhost
 *               - if MySql run in diffrent server put server's ip address
 *
 *               be carfull for user name and password:
 *               - username must be same as username for MySql connection
 *               - password must be same as password for MySql connection
 *
 *               not any other change require
 *               - if connection setup properly recieve 'MySQL Database connection successful' in terminal
 *               - otherwise get an error
 *
 * @troubleshoot look at notice part's steps(above) carefully and check database connectivity
 *              - most error caused for ip address conflict, if in MySql machine use DHCP or any changing ip address
 *                follow these steps to find ip address and if it is different with host, put correct address:
 *                  - in Windows OS : run command prompt and use ipconfig to find ip address
 *                  - in Mac OS : run termilal and use ifconfig to find ip address
 *              - for finding username and password:
 *                  - run mysql and in first page find mysql connections
 *                  - in manage connection page can find more connection details
 *                  - watch for spelling and characters for both username and password, both must be match with
 *                     user and password as we are using in this page
 *
 */

//////////////////////////////////////               SETUPS                //////////////////////////////////////
const mysql = require("mysql2");
/**
 * if for any reason must to change machine, username and passord change host, user, password with correct data
 */

// const pool = mysql.createPool({
//     host: '192.168.75.129',
//     user: 'student',
//     password: 'letmein',
//     database: 'isms'
// });

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'letmein',
    database: 'isms'
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("MySQL Database connection successful");
});

//////////////////////////////////////              MODULE  EXPORTS               //////////////////////////////////////
module.exports = pool;

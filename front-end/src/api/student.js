import axios from 'axios';
// Basic api route to send data from browser to backend
const api=axios.create({
    baseURL:'http://localhost:3001/isms'

})
// Route for create a new student
export const createStudent = (
    studentID,
    firstname,
    middlename,
    lastname,
    gender,
    dayofbirth,
    country,
    saskemail,
    campus,
    period,
    year,
    program,
    degree,
    graduate,
    enroll,
    prospective) => api.post(`/newstudent`, {
    "prospective": prospective,
    "std_id": studentID,
    "first_name": firstname,
    "middle_name": middlename,
    "last_name": lastname,
    "gender": gender,
    "birthdate": dayofbirth,
    "email": saskemail,
    "country": country,
    "academic_period": period,
    "campus": campus,
    "program": program,
    "degree": degree,
    "year": year,
    "graudate_ind": graduate,
    "enroll": enroll
}); 
//Route for get all the student details
export const getAllStudents=()=>api.get(`/getallstudent`);
//Route for get a particular student details using id
export const getStudentById=id=>api.get(`/getstudent/${id}`);
//Route for update the student
export const updateStudent = (
    id,
    studentID,
    firstname,
    middlename,
    lastname,
    gender,
    dayofbirth,
    country,
    saskemail,
    campus,
    period,
    year,
    program,
    degree,
    graduate,
    enroll,) => api.put(`/updatestudent/${id}`, {
    "std_id": studentID,
    "first_name": firstname,
    "middle_name": middlename,
    "last_name": lastname,
    "gender": gender,
    "birthdate": dayofbirth,
    "email": saskemail,
    "country": country,
    "academic_period": period,
    "campus": campus,
    "program": program,
    "degree": degree,
    "year": year,
    "graudate_ind": graduate,
    "enroll": enroll
}); 
//Route for delete the student details from database
export const deleteStudent=id=>api.delete(`/deletestudent/${id}`);
// Route for get all the users from database
export const getAllUsers=()=>api.get(`/getalluser`);
//Route for update the permission in database
export const updatePermission=(id,permission)=>api.put(`/updatepermission/`,{id:id,permission:permission});
 //export all the student and user related apis
const apis={
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
    getAllUsers,
    updatePermission,
    getStudentById
}
export default apis;
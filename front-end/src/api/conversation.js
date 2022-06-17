import axios from 'axios';
// Basic api route to send data from browser to backend
const conv_api=axios.create({
    baseURL:'http://localhost:3001/isms'

})
 /** Route for get conversation
   * @param getConversationByID  get the conversation from the database */
export const getConversationByID=id=>conv_api.get(`/getconversationid/${id}`)
export const getConversationByConsID=id=>conv_api.get(`/getconversationbyconsid/${id}`)
// Route for get all the conversations from the database
export const getAllConversation=()=>conv_api.get(`/getallconversation`)
//Route for updating the conversation
export const updateConversation=(id,note,comments,sharedLink,subject,category,lastupdatedby)=>conv_api.put(`/updateconversation/${id}`,{note:note,comments:comments,sharedLink:sharedLink,subject:subject,category:category,lastupdatedby:lastupdatedby})
//Route for creating a new student conversation
export const createConversation=(student_id,note,category,subject,sharedLink,permission,created,comments)=>conv_api.post(`/newconversation`,{"student_id":student_id,"note":note,"category":category,"subject":subject,"sharedLink":sharedLink,"permission":permission,"created":created,"comments":comments});
//All conversation related apis
const conv_apis={
    getAllConversation,
    getConversationByID,
    createConversation,
    getConversationByConsID,
    updateConversation
}
export default conv_apis
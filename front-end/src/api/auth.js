// import npm package axios
import axios from "axios";

// Basic api route to send data from browser to backend
const auth = axios.create({
  baseURL: "http://localhost:3001/isms",
});

export default {
  /** Route for get login status
   * @param getLoginStatus  get the login status from the database */

  getLoginStatus: async () => {
    try {
      const res = await axios.get("/api/login/status");
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  },

  /** Route for login
   * @param postUserLogin  This route is sending the 2 parameters - username and password
   * requesting the password match from database */

  postUserLogin: async (user) => {
    try {
      const res = await auth.post("/login", {
        vals: [user.loginUsername, user.loginPassword],
      });

      return res;
    } catch (err) {}
  },

  /** Route for logout
   * @param getLoggedOut  This route is to logout the user from application */

  getLoggedOut: async () => {
    try {
      const res = await auth.get("/user/logout");
      return res;
    } catch (err) {
      return console.log(err);
    }
  },

  /** Route for creating new user login
   * @param postNewUser This route sends user firstname, lastname, email, telephone, username, password and permission
   *  to the backend to save details in database */

  postNewUser: async (newUser) => {
    try {
      const {
        firstname,
        lastname,
        email,
        tel,
        username,
        password,
        permission,
      } = newUser;

      const res = await auth.post("/register", {
        vals: [firstname, lastname, email, tel, username, password, permission],
      });
      return res;
    } catch (err) {
      return console.log(err);
    }
  },

  /** Route to delete the user
   * @param deleteUserById This route deletes the user in the database */

  deleteUserById: async (id) => {
    try {
      const res = await auth.delete(`/user/${id}`);
      return res;
    } catch (err) {
      return console.log(err);
    }
  },

  /** Route for reset password
   * @param resetPassword This route send username and password from browser
   *  to backend to reset the password and save the new password in database */

  resetPassword: async (user) => {
    try {
      const { username, password } = user;
      const res = await auth.put(`/resetpassword/${user}`, {
        vals: [username, password],
      });

      return res;
    } catch (err) {}
  },
};

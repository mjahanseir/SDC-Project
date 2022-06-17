//////////////////////////////////////               UserManagement.jsx                //////////////////////////////////////
/**
 *
 * @file AddNewStudent.jsx
 * @copyright ISMS(International Student Management System)
 * @version 1.0.0
 * @author cyberbot team, software developer program
 * @release summer 2022
 * @owner Saskatchewan Polytechnic, Saskatoon Campus
 *
 */
//////////////////////////////////////

//#region for IMPORT
/**
 *   @notice watch to address, if change path, must modify in the require part*/
import React, { Component } from "react";
import apis from "../api/student";
import { Form, Button, Card } from "react-bootstrap";
import { Navbar, FootNav } from "../components";
import { Link } from "react-router-dom";
import "../css/loginpage.css";

//#endregion

// Class component named "AddStudent"
class AddStudent extends Component {
  constructor(props) {
    super(props);
    // state for react component with all the fields
    this.state = {
      studentID: "",
      firstname: "",
      middlename: "",
      lastname: "",
      gender: "",
      dayofbirth: "",
      country: "",
      saskemail: "",
      campus: "",
      period: "",
      year: "",
      program: "",
      degree: "",
      graduate: "",
      enroll: "",
      prospective: false,
    };
  }

  // function to handle student ID
  handleValidatedStudentID = async (event) => {
    // condition for checking regex
    if (!event.target.value.match(/^[a-zA-Z]|\d$/)) {
      // if failed set the state with the message
      this.setState({ isValid: "Student ID must be size between 8 to 12" });
    } else {
      // if passed set the state studentID with passed value
      this.setState({ isValid: "" });
      this.setState({ studentID: event.target.value });
    }
  };

  // function to handle first name
  handleValidatedFirstName = async (event) => {
    // condition for checking regex
    if (!event.target.value.match(/^[a-zA-Z]|\d$/)) {
      // if failed set the state with the message
      this.setState({ isValid: "First Name must be size between 8 to 12" });
    } else {
      // if passed set the state firstname with passed value
      this.setState({ isValid: "" });
      this.setState({ firstname: event.target.value });
    }
  };

  // function to handle middle name
  handleValidatedMiddleName = async (event) => {
    // condition for checking regex
    if (!event.target.value.match(/^[a-zA-Z]|\d$/)) {
      // if failed set the state with the message
      this.setState({ isValid: "Middle Name must be size between 8 to 12" });
    } else {
      // if passed set the state middlename with passed value
      this.setState({ isValid: "" });
      this.setState({ middlename: event.target.value });
    }
  };

  // function to handle last name
  handleValidatedLastName = async (event) => {
    // condition for checking regex
    if (!event.target.value.match(/^[a-zA-Z]|\d$/)) {
      // if failed set the state with the message
      this.setState({ isValid: "Last Name must be size between 8 to 12" });
    } else {
      // if passed set the state lastname with passed value
      this.setState({ isValid: "" });
      this.setState({ lastname: event.target.value });
    }
  };

  // function to handle day of birth
  handleValidatedDayOfBirth = async (event) => {
    // set the state dayofbirth with passed value
    this.setState({ dayofbirth: event.target.value });
  };

  // function to handle country
  handleValidatedCountry = async (event) => {
    // set the state country with passed value
    this.setState({ country: event.target.value });
  };

  // function to handle email
  handleValidatedEmail = async (event) => {
    // condition for checking regex
    if (!event.target.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/)) {
      // if failed set the state with the message
      this.setState({ isValid: "Verify Email" });
    } else {
      // if passed set the state saskemail with passed value
      this.setState({ isValid: "" });
      this.setState({ saskemail: event.target.value });
    }
  };

  // function to handle campus
  handleValidatedCampus = async (event) => {
    // set the state campus with passed value
    this.setState({ campus: event.target.value });
  };

  // function to handle period
  handleValidatedPeriod = async (event) => {
    // set the state period with passed value
    this.setState({ period: event.target.value });
  };

  // function to handle year
  handleValidatedYear = async (event) => {
    // set the state year with passed value
    this.setState({ year: event.target.value });
  };

  // function to handle program
  handleValidatedProgram = async (event) => {
    // set the state program with passed value
    this.setState({ program: event.target.value });
  };

  // function to handle Degree
  handleValidatedDegree = async (event) => {
    // set the state degree with passed value
    this.setState({ degree: event.target.value });
  };

  // function to handle Graduate
  handleValidatedGraduate = async (event) => {
    // set the state graduate with passed value
    this.setState({ graduate: event.target.value });
  };

  // function to handle Enroll
  handleValidatedEnroll = async (event) => {
    // set the state enroll with passed value
    this.setState({ enroll: event.target.value });
  };

  // function to handle gender male
  handleGenderMale = async (event) => {
    // set the state gender with passed value
    this.setState({ gender: "M" });
  };

  // function to handle gender female
  handleGenderFemale = async (event) => {
    // set the state gender with passed value
    this.setState({ gender: "F" });
  };

  // function to handle gender none
  handleGenderNone = async (event) => {
    // set the state gender with passed value
    this.setState({ gender: "N" });
  };

  // function to handle prospective student
  handleProspectiveStudent = async (event) => {
    // set the state prospective with boolean
    this.setState({ prospective: true });
  };

  // function to handle submit
  handleInsertStudent = async (event) => {
    // api call from "Auth.js" and sending all the state values as parameters
    await apis
      .createStudent(
        this.state.studentID,
        this.state.firstname,
        this.state.middlename,
        this.state.lastname,
        this.state.gender,
        this.state.dayofbirth,
        this.state.country,
        this.state.saskemail,
        this.state.campus,
        this.state.period,
        this.state.year,
        this.state.program,
        this.state.degree,
        this.state.graduate,
        this.state.enroll,
        this.state.prospective
      )
      .then((response) => {});
    // on response display window alert
    window.alert("Student added successfully");
    // redirect to the student page
    this.props.history.push("/isms/studentpage");
  };

  render() {
    return (
      <>
        <Navbar />
        {/* Card with title */}
        <Card.Title className="mt-3 mb-3 text-center">
          Add New Student
        </Card.Title>
        {/* Card */}
        <Card className="mx-auto container shadow">
          <Card.Body style={{ padding: "1rem 2rem" }}>
            {/* Form  */}
            <Form>
              <Form.Group className="row mb-3">
                {/* Prospective Student Checkbox  */}
                <div className=" col">
                  <Form.Check
                    label="Prospective Student"
                    onChange={this.handleProspectiveStudent}
                  />
                </div>
                {/* Student ID label with input  */}
                <Form.Label className="col-sm-2" style={{ textAlign: "right" }}>
                  Student ID:
                </Form.Label>
                <Form.Control
                  className="col pt-0"
                  onChange={this.handleValidatedStudentID}
                ></Form.Control>
              </Form.Group>
              {/* First and Last name with input and label  */}
              <Form.Group>
                <div className="row mb-3">
                  <Form.Label className="col-md-2">First name:</Form.Label>
                  <Form.Control
                    className="col"
                    onChange={this.handleValidatedFirstName}
                  ></Form.Control>
                  <Form.Label className="col-md-2">Middle Name:</Form.Label>
                  <Form.Control
                    className="col"
                    onChange={this.handleValidatedMiddleName}
                  ></Form.Control>
                  <Form.Label className="col-md-2">Last name:</Form.Label>
                  <Form.Control
                    className="col"
                    onChange={this.handleValidatedLastName}
                  ></Form.Control>
                </div>
                {/* Check box for Gender  */}
                <div className="row mb-3">
                  <Form.Label className="col-lg-2">Gender:</Form.Label>
                  <div className="form-check col-lg-1">
                    <input
                      className="form-check-input col"
                      type="radio"
                      onChange={this.handleGenderMale}
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label className="form-check-label col">Male</label>
                  </div>
                  <div className="form-check col-lg-1">
                    <input
                      className="form-check-input col"
                      type="radio"
                      onChange={this.handleGenderFemale}
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />
                    <label className="form-check-label col">Female</label>
                  </div>
                  <div className="form-check col-lg-1">
                    <input
                      className="form-check-input col"
                      type="radio"
                      onChange={this.handleGenderNone}
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />
                    <label className="form-check-label col">None</label>
                  </div>
                  {/* Date of Birth with input and label  */}
                  <Form.Label
                    className="col-lg-2"
                    style={{ textAlign: "right" }}
                  >
                    Birth Date:
                  </Form.Label>
                  <Form.Control
                    type="date"
                    className="col pt-0"
                    onChange={this.handleValidatedDayOfBirth}
                  ></Form.Control>
                </div>
                {/* Country input and label  */}
                <div className="row mb-3">
                  <Form.Label className="col-md-2">Country:</Form.Label>
                  <Form.Select
                    className="col"
                    onChange={this.handleValidatedCountry}
                  >
                    <option>-- Select Country --</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">
                      Antigua and Barbuda
                    </option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">
                      Bosnia and Herzegovina
                    </option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">
                      British Indian Ocean Territory
                    </option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">
                      Central African Republic
                    </option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">
                      Cocos (Keeling) Islands
                    </option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo, the Democratic Republic of the">
                      Congo, the Democratic Republic of the
                    </option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">
                      Dominican Republic
                    </option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Malvinas)">
                      Falkland Islands (Malvinas)
                    </option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">
                      French Southern Territories
                    </option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">
                      Heard Island and Mcdonald Islands
                    </option>
                    <option value="Holy See (Vatican City State)">
                      Holy See (Vatican City State)
                    </option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran, Islamic Republic of">
                      Iran, Islamic Republic of
                    </option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea, Democratic People's Republic of">
                      Korea, Democratic People's Republic of
                    </option>
                    <option value="Korea, Republic of">
                      Korea, Republic of
                    </option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People's Democratic Republic">
                      Lao People's Democratic Republic
                    </option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">
                      Libyan Arab Jamahiriya
                    </option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="Macedonia, the Former Yugoslav Republic of">
                      Macedonia, the Former Yugoslav Republic of
                    </option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia, Federated States of">
                      Micronesia, Federated States of
                    </option>
                    <option value="Moldova, Republic of">
                      Moldova, Republic of
                    </option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">
                      Netherlands Antilles
                    </option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">
                      Northern Mariana Islands
                    </option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestinian Territory, Occupied">
                      Palestinian Territory, Occupied
                    </option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">
                      Russian Federation
                    </option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Kitts and Nevis">
                      Saint Kitts and Nevis
                    </option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Pierre and Miquelon">
                      Saint Pierre and Miquelon
                    </option>
                    <option value="Saint Vincent and the Grenadines">
                      Saint Vincent and the Grenadines
                    </option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">
                      Sao Tome and Principe
                    </option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia and Montenegro">
                      Serbia and Montenegro
                    </option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and the South Sandwich Islands">
                      South Georgia and the South Sandwich Islands
                    </option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">
                      Svalbard and Jan Mayen
                    </option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">
                      Syrian Arab Republic
                    </option>
                    <option value="Taiwan, Province of China">
                      Taiwan, Province of China
                    </option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania, United Republic of">
                      Tanzania, United Republic of
                    </option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-Leste">Timor-Leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">
                      Trinidad and Tobago
                    </option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands">
                      Turks and Caicos Islands
                    </option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">
                      United States Minor Outlying Islands
                    </option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="Virgin Islands, British">
                      Virgin Islands, British
                    </option>
                    <option value="Virgin Islands, U.s.">
                      Virgin Islands, U.s.
                    </option>
                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </Form.Select>
                  {/* SaskPolytech email with input and label  */}
                  <Form.Label className="col">Saskpolytech E-mail:</Form.Label>
                  <Form.Control
                    className="col"
                    onChange={this.handleValidatedEmail}
                  ></Form.Control>
                </div>
                {/* Campus Select with options and label  */}
                <div className="row mb-3">
                  <Form.Label className="col-md-2">Campus:</Form.Label>
                  <Form.Select
                    className="col"
                    onChange={this.handleValidatedCampus}
                  >
                    <option>-- Select Campus --</option>
                    <option value="Moose Jaw">Moose Jaw</option>
                    <option value="Prince Albert">Prince Albert</option>
                    <option value="Regina">Regina</option>
                    <option value="Saskatoon">Saskatoon</option>
                  </Form.Select>
                  {/* Academic period with options and label  */}
                  <Form.Label className="col">Academic Period:</Form.Label>
                  <Form.Select
                    className="col"
                    onChange={this.handleValidatedPeriod}
                  >
                    <option>-- Select Period --</option>
                    <option value="Spring Semester 2022/2023">
                      Spring Semester 2022/2023
                    </option>
                    <option value="Summer Semester 2022/2023">
                      Summer Semester 2022/2023
                    </option>
                    <option value="Fall Semester 2022/2023">
                      Fall Semester 2022/2023
                    </option>
                    <option value="Winter Semester 2022/2023">
                      Winter Semester 2022/2023
                    </option>
                    <option value="Spring Semester 2021/2022">
                      Spring Semester 2021/2022
                    </option>
                    <option value="Summer Semester 2021/2022">
                      Summer Semester 2021/2022
                    </option>
                    <option value="Fall Semester 2021/2022">
                      Fall Semester 2021/2022
                    </option>
                    <option value="Winter Semester 2021/2022">
                      Winter Semester 2021/2022
                    </option>
                  </Form.Select>
                </div>
                {/* Year and Program with label and input  */}
                <div className="row mb-3">
                  <Form.Label className="col-md-2">Year:</Form.Label>
                  <Form.Select
                    className="col"
                    onChange={this.handleValidatedYear}
                  >
                    <option>-- Select Year --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                  <Form.Label className="col">Program:</Form.Label>
                  <Form.Select
                    className="col"
                    onChange={this.handleValidatedProgram}
                  >
                    <option>-- Select Program --</option>
                    <option value="Business">Business</option>
                    <option value="Civil Engineering Technologies">
                      Civil Engineering Technologies
                    </option>
                    <option value="Business Information Systems">
                      Business Information Systems
                    </option>
                    <option value="Office Administration">
                      Office Administration
                    </option>
                    <option value="Computer Engineering">
                      Computer Engineering
                    </option>
                    <option value="Environmental Engineering">
                      Environmental Engineering
                    </option>
                    <option value="Project Management">
                      Project Management
                    </option>
                  </Form.Select>
                </div>
                {/* Degree with options and label  */}
                <div className="row">
                  <Form.Label className="col-md-2">Degree:</Form.Label>
                  <Form.Select
                    className="col"
                    onChange={this.handleValidatedDegree}
                  >
                    <option>-- Select Degree --</option>
                    <option value="DIPC">DIPC</option>
                    <option value="CERT">CERT</option>
                    <option value="PGCERT">PGCERT</option>
                  </Form.Select>
                  {/* Graduate Ind with label and input  */}
                  <Form.Label className="col" style={{ textAlign: "right" }}>
                    Graduate Ind:
                  </Form.Label>
                  <Form.Select
                    className="col"
                    onChange={this.handleValidatedGraduate}
                  >
                    <option>-- Select Option --</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </Form.Select>
                  {/* Enroll with label and input  */}
                  <Form.Label className="col" style={{ textAlign: "right" }}>
                    Enroll:
                  </Form.Label>
                  <Form.Select
                    className="col"
                    onChange={this.handleValidatedEnroll}
                  >
                    <option>-- Select Option --</option>
                    <option value="EI">EI</option>
                    <option value="EL">EL</option>
                  </Form.Select>
                </div>
              </Form.Group>
            </Form>
            {/* Button to save new student  */}
            <Button
              className="btn btn-primary mt-3"
              style={{ float: "right" }}
              onClick={this.handleInsertStudent}
            >
              Save new student
            </Button>
            {/* redirect to student page  */}
            <Link to={`/isms/studentpage`}>
              <Button
                className="btn btn-primary mt-3"
                style={{ float: "Left" }}
                onClick={this.handleUpdateStudent}
              >
                Student
              </Button>
            </Link>
          </Card.Body>
        </Card>
        <FootNav />
      </>
    );
  }
}

// export the component "AddStudent"
export default AddStudent;

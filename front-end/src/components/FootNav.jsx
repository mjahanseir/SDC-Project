//////////////////////////////////////               UserManagement.jsx                //////////////////////////////////////
/**
 *
 * @file FootNav.jsx
 * @copyright ISMS(International Student Management System)
 * @version 1.0.0
 * @author cyberbot team, software developer program
 * @release summer 2022
 * @owner Saskatchewan Polytechnic, Saskatoon Campus
 *
 */
//////////////////////////////////////

//import section for all the packages
import React,{Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styled from 'styled-components';
//styling the components
const Container = styled.div.attrs({
    className:'container'
})`
padding:20px 0px;
`

const Footerdiv = styled.div`
background-color:#75767A;
`

const TextP = styled.p`
    text-align:center;
    color:white;
`
const AText = styled.a`
    margin:0px 5px;
    cursor:pointer;
    text-decoration:none;
    color:white;
`
//Main footnav class
class FootNav extends Component{
render(){
    return(
        <Container>
            <Footerdiv>
                {/* footer section */}
                <TextP>
                    <AText href='https://saskpolytech.ca/disclaimer.aspx'>Disclaimer</AText>|
                    <AText href='https://saskpolytech.ca/privacy.aspx'>PrivacyVision</AText>|
                    <AText href='https://saskpolytech.ca/'>© Saskatchewan Polytechnic</AText>|
                    <AText href='https://saskpolytech.ca/about/about-us/vision-mission-mandate.aspx'>Vision</AText>
                </TextP>
            </Footerdiv>
        </Container>
    )
}
}

export default FootNav;
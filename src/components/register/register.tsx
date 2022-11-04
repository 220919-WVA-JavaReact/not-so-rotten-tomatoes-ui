import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { User } from '../../models/user';
import { Navigate } from 'react-router-dom';

interface IRegisterProps {
  currentUser: User | undefined,
  setCurrentUser: (nextUser: User) => void
}

function Register(props: IRegisterProps){
    return(
      props.currentUser? // condition to be evaluated, ie: if(user)
        // <p> Welcome {props.currentUser.username}! </p> // if true
        <Navigate to="/dashboard" />
        :
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

        <MDBInput wrapperClass='mb-4' label='Your Name' id='form1' type='username' />
        <MDBInput wrapperClass='mb-4' label='Your Email' id='form2' type='email' />
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />
        <MDBInput wrapperClass='mb-4' label='Repeat your password' id='form2' type='password' />

        <MDBBtn className='mb-4' size='lg'>Register</MDBBtn>
    </MDBContainer>
    );
}

export default Register;
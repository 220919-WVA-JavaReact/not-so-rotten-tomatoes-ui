import React, { SyntheticEvent, useState } from 'react';
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

  //register feature, takes in email, username, and password and persists to database

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let register = async (e: SyntheticEvent) => {
    if (!email || !username || !password){
      //if a field is not filled out then throw an error message
      setErrorMessage('Please enter valid credentials');
    }else {
      setErrorMessage('');

      let response = await fetch(
        'http://localhost:8080/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, username, password}),
        }
      );

        //if the user is able to login then get the headers and save the token to the session storage aka logging in once registered
      if (response.status === 200) {
        let token = response.headers.get('Authorization');
        console.log('Authorization: ' + response.headers.get('Authorization'));
        if (token){
          sessionStorage.setItem('token', token);
        }
        props.setCurrentUser(await response.json());

      } else {
        setErrorMessage('Could not validate the provided credentials');
      }


    }
  }



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
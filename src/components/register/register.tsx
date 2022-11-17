import { MDBBtn, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import React, { SyntheticEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User } from '../../models/user';

interface IRegisterProps {
  currentUser: User | undefined;
  setCurrentUser: (nextUser: User) => void;
}

function Register(props: IRegisterProps) {
  //register feature, takes in email, username, and password and persists to database

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let regUsername = (e: SyntheticEvent) => {
    setUsername((e.target as HTMLInputElement).value);
  };

  let regEmail = (e: SyntheticEvent) => {
    setEmail((e.target as HTMLInputElement).value);
  };

  let regPassword = (e: SyntheticEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  let register = async (e: SyntheticEvent) => {
    //console.log("step 1")
    if (!email || !username || !password) {
      //if a field is not filled out then throw an error message
      //console.log('nope')
      setErrorMessage('Please enter valid credentials');
    } else {
      setErrorMessage('');
      // ${process.env.REACT_APP_API_URL}
      let response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      }).then((res) => {
        navigateHome();
      });

      //if the user is able to login then get the headers and save the token to the session storage aka logging in once registered
      // if (response.status === 201) {
      //   let token = response.headers.get('Authorization');
      //   //console.log('Authorization: ' + response.headers.get('Authorization'));
      //   if (token) {
      //     sessionStorage.setItem('token', token);
      //   }
      //   props.setCurrentUser(await response.json());
      // } else {
      //   setErrorMessage('Could not validate the provided credentials');
      // }
    }
  };

  const navigateHome = () => {
    <Navigate to="/login" />;
  };

  return props.currentUser ? ( // condition to be evaluated, ie: if(user)
    // <p> Welcome {props.currentUser.username}! </p> // if true
    <Navigate to="/dashboard" />
  ) : (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

      <MDBInput
        wrapperClass="mb-4"
        label="Your Username"
        id="form1"
        type="username"
        onChange={regUsername}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Your Email"
        id="form2"
        type="email"
        onChange={regEmail}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form3"
        type="password"
        onChange={regPassword}
      />
      {/* <MDBInput wrapperClass='mb-4' label='Repeat your password' id='form4' type='password' /> */}

      {errorMessage ? <p>{errorMessage}</p> : <></>}

      <Link to="/login">
        <MDBBtn className="mb-4" onClick={register}>
          Register
        </MDBBtn>
      </Link>
    </MDBContainer>
  );
}

export default Register;

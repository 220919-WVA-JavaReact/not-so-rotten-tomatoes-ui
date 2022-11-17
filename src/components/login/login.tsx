import { MDBBtn, MDBCheckbox, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import { SyntheticEvent, useState } from 'react';
import {Link, Navigate } from 'react-router-dom';
import { User } from '../../models/user';

interface ILoginProps {
  currentUser: User | undefined;
  setCurrentUser: (nextUser: User) => void;
}

function Login(props: ILoginProps) {
  //Destructuring assignment -- sets username to first ele of userState array, and setUsername to the second ele of userState array.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let logout = false;

  let updateUsername = (e: SyntheticEvent) => {
    //username = (e.target as HTMLInputElement).value; -- do not need to use this when using Hooks, need to use below.
    setUsername((e.target as HTMLInputElement).value);
  };

  let updatePassword = (e: SyntheticEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  let login = async (e: SyntheticEvent) => {
    if (!username || !password) {
      setErrorMessage('You must have a valid username and password');
    } else {
      setErrorMessage('');

      let response = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //credentials: 'include', //property needed to work with java http sessions. Not necessary for JWTs
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        logout = true;
        let token = response.headers.get('Authorization');
        // console.log('Authorization: ' + response.headers.get('Authorization'));
        if (token) {
          sessionStorage.setItem('token', token);
        }
        props.setCurrentUser(await response.json());
      } else {
        setErrorMessage('Could not validate the provided credentials');
      }
    }
  };

  return props.currentUser ? (
    <Navigate to="/dashboard" />
  ) : (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
      <MDBInput
        wrapperClass="mb-4"
        label="Username"
        id="form1"
        type="username"
        onChange={updateUsername}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form2"
        type="password"
        onChange={updatePassword}
      />
      <div>
        <p>{errorMessage}</p>
      </div>

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox
          name="flexCheck"
          value=""
          id="flexCheckDefault"
          label="Remember me"
        />
      </div>

      <MDBBtn className="mb-4"  onClick={login}>
        Sign in
      </MDBBtn>

      <div className="text-center">
        <p>
          Not a member? <Link to="/register">Register</Link>
        </p>
        {/* Might use later for SSO login??-------------------------------------
        <p>or sign up with:</p>

        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm"/>
          </MDBBtn>

        </div> */}
      </div>
    </MDBContainer>
  );
}

export default Login;

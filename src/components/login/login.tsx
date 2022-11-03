import { SyntheticEvent, useState } from 'react';

import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';


function Login(){

     //Destructuring assignment -- sets username to first ele of userState array, and setUsername to the second ele of userState array.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let updateUsername = (e: SyntheticEvent) => {
    //username = (e.target as HTMLInputElement).value; -- do not need to use this when using Hooks, need to use below.
    setUsername((e.target as HTMLInputElement).value);
  };
  let updatePassword = (e: SyntheticEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };
  let login = async (e: SyntheticEvent) => {
    console.log(`Username is: ${username}, password is ${password}`);
    if (!username || !password) {
      setErrorMessage('You must have a valid username and password');
    } else {
      setErrorMessage('');
    
      let response = await fetch(
        'http://localhost:8080/auth',  {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
               // credentials: 'include', //property needed to work with java http sessions. Not necessary for JWTs
                body: JSON.stringify({ username, password }),
              }
      );

      if (response.status === 200) {
        let data = await response.json();
        console.log(data);
      } else {
        setErrorMessage('Could not validate the provided credentials');
      }
    }
  };

  return(
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='username' onChange={updateUsername}/>
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={updatePassword}/>
      <div>
        <p>{errorMessage}</p>
      </div>

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn className="mb-4" onClick={login}>Sign in</MDBBtn>

      <div className="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
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
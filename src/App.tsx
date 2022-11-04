import React, { useState } from 'react';
import { User } from './models/user';
import Login from './components/login/login';
import NaviBar from './components/nav/nav';
import Register from './components/register/register';
import Home from './components/home/home';

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';

function App() {

  //provide the state of the authorized user
  const [authUser, setAuthUser] = useState<User>();

  return (
    <BrowserRouter>
    <NaviBar currentUser={authUser} setCurrentUser={setAuthUser} />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login currentUser={authUser} setCurrentUser={setAuthUser} />} />
      <Route path="/register" element={<Register currentUser={authUser} setCurrentUser={setAuthUser}/>} />
      <Route path="/dashboard" element={<Dashboard currentUser={authUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { User } from './models/user';
import Login from './components/login/login';
import NaviBar from './components/nav/nav';
import Register from './components/register/register';
import Home from './components/home/home';

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Recipes from './components/recipes/recipes';

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
      <Route path="/recipes" element ={<Recipes currentUser={authUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

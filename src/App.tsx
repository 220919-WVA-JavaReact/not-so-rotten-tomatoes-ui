import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React, { useState } from 'react';
import Home from './components/home/home';
import Login from './components/login/login';
import NaviBar from './components/nav/nav';
import Register from './components/register/register';
import { User } from './models/user';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Recipes from './components/recipes/recipes';
import MoreInfoCard from './components/morinfocard/moreinfocard';

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
      <Route path="/dashboard" element={<Dashboard currentUser={authUser}/>} />
      <Route path="/recipes" element ={<Recipes currentUser={authUser} />} />
      <Route path='/recipes/:id' element ={<MoreInfoCard />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Login currentUser={authUser} setCurrentUser={setAuthUser} />
          }
        />
        <Route
          path="/register"
          element={
            <Register currentUser={authUser} setCurrentUser={setAuthUser} />
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard currentUser={authUser} />}
        />
        <Route path="/recipes" element={<Recipes currentUser={authUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

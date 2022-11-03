import React from 'react';
import logo from './logo.svg';
import Login from './components/login/login';
import NaviBar from './components/nav/nav';

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <NaviBar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

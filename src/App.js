// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/Auth/PrivateRoute';
import FileUploader from './components/Upload/FileUploader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/upload" element={
            <PrivateRoute>
            <FileUploader /> 
            </PrivateRoute>  }/>
      </Routes>
    </Router>
  );
}

export default App;

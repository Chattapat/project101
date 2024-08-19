import React from 'react';
import logo from './logo.svg';  // Ensure TypeScript can handle importing .svg files
import Navbar from './Navbar';
import Users from './User';
import UserCreate from './UserCreate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserUpdate from './UserUpdate';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="create" element={<UserCreate />} />
        <Route path="update/:id" element={<UserUpdate />} />
      </Routes>
    </div>
  );
}

export default App;

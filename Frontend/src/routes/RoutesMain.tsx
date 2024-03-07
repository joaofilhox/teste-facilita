import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/homePage';
import Register from '../pages/registerPage';

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default MainRoutes;

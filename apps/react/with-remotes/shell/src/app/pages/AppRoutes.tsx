import React from 'react';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';

const Myremote = React.lazy(() => import('myremote/Module'));

const Remote1 = React.lazy(() => import('remote1/Module'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/myremote" element={<Myremote />} />
      <Route path="/remote1" element={<Remote1 />} />
    </Routes>
  );
};

export default AppRoutes;

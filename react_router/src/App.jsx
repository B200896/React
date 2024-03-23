import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Contact from './Contact';

function App() {
  return (
    <>
    <Header />
    <Outlet />
    {/* <Outlet />
    <Contact /> */}
    </>
  );
}

export default App;

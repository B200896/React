import { useState } from 'react'
import './App.css'
import Header from './Header';
import { createBrowserRouter } from 'react-router-dom';



function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Header/>
    }
  ])
  

  return (
    <>
    <Header/>
    </>
  )
}

export default App

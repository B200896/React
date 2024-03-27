import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Header from './Header.jsx'
import { RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import { Route } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path ="" element ={<App/>}>
      <Route path="/" element ={<Header/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Image from './Imagee.jsx' 
import Our_products from './Our_products.jsx'
import {RouterProvider, createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import { Route} from 'react-router-dom'
// import './index.css'
const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App/>}>
      <Route path="/" element={<Image/>}/>
      <Route path="Our products" element={<Our_products/>}/>


    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

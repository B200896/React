import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './Home/Home.jsx'
import Product from './Our/Product.jsx'
import About from './About/About.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
// import './index.css'

const router = createBrowserRouter(

   createRoutesFromElements(

     <Route path = '/' element = {<App />}>
        <Route path='' element = {<Home />}/>
        <Route path='our_product' element = {<Product />} />
        <Route path='about' element = {<About />} />
     </Route>
   )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
<<<<<<< HEAD
import Image from './Imagee.jsx' 
import Our_products from './Our_products.jsx'
import {RouterProvider, createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import { Route} from 'react-router-dom'
=======
import Home from './Home/Home.jsx'
import Product from './Our/Product.jsx'
import About from './About/About.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
>>>>>>> 152de3c819fb78fb1f0c1234fb384d7ef0c6a1b8
// import './index.css'
const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App/>}>
      <Route path="/" element={<Image/>}/>
      <Route path="Our products" element={<Our_products/>}/>


    </Route>
  )
)

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
<<<<<<< HEAD
    <RouterProvider router={router}/>
=======
   <RouterProvider router={router} />
>>>>>>> 152de3c819fb78fb1f0c1234fb384d7ef0c6a1b8
  </React.StrictMode>,
)

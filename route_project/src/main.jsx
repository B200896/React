import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './Home.jsx'
import About from './About.jsx'
import Product from './Product.jsx'
import Contact from './Contact.jsx'

const router = createBrowserRouter(

   createRoutesFromElements(

     <Route path = "/" element = {<App />}>
       <Route path='' element = {<Home />} />
       <Route path='about' element = {<About />} />
       <Route path='product' element = {<Product />} />
       <Route path = 'contact' element = {<Contact />} />
     </Route>
   )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)

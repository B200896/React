import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Image from './Imagee.jsx' 
import Our_products from './Our_products.jsx'
import {RouterProvider, createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import { Route} from 'react-router-dom'
import Home from './Home/Home.jsx'
import Product from './Our/Product.jsx'

import About from './About/About.jsx'

// import About from './About.jsx'
import Contact from './Contact.jsx'


// import './index.css'

const router = createBrowserRouter(

   createRoutesFromElements(

     <Route path = '/' element = {<App />}>
        <Route path='' element = {<Home />}/>
        <Route path='our_product' element = {<Product />} />
        <Route path='about' element = {<About />} />
        <Route path='contact' element ={<Contact/>}/>
     </Route>
   )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

   <RouterProvider router={router} />

  </React.StrictMode>,
)

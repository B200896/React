import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home/Home.jsx'
import Our_Product from './Our_Product/Our_Product.jsx'
import { RouterProvider , createBrowserRouter , createRoutesFromElements , Route } from 'react-router-dom'
import App from './App.jsx'
import About from './About/About.jsx'

const router = createBrowserRouter(
   
   createRoutesFromElements(

    <Route path='/' element={<App />}>
       <Route path='' element = {<Home />} />
       <Route path='our_product' element = {<Our_Product />} />
       <Route path='about' element = {<About />} />
       <Route path='contact' element = {<Home />} />
    </Route>
   )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
     <RouterProvider router={router} />
  </React.StrictMode>,
)

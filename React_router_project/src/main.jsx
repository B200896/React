import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'
import { RouterProvider , createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Route } from 'react-router-dom'

// const router = createBrowserRouter([

//    {
//      path:"/",
//      element:<App />,
//      children:[
       
//        {
//          path:"",
//          element:<Home />
//        },
//        {
//          path:"about",
//          element:<About />
//        },
//        {
//          path:"contact",
//          element:<Contact />
//        }
//      ]
//    }
// ])

const router = createBrowserRouter(

   createRoutesFromElements(

      <Route path = "" element = {<App />}>
        <Route path = "/" element = {<Home />} />
        <Route path = "about" element = {<About />}/>
        <Route path="contact" element = {<Contact />} />
      </Route>
   )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

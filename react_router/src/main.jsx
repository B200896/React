import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Header from './Header'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import {createBrowserRouter } from 'react-router-dom'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: "",
//         element: <Header />
//       },
//       {
//         path: "about",
//         element: <About />
//       },
//       {
//         path: "contact",
//         element: <Contact />
//       }
//     ]
//   }
// ])




// const router = createBrowserRouter([

//    {
//       path : "/",
//       element:<App />,
//       children : [

//          {
//             path:"",
//             element:<Home />
//          },
//          {
           
//            path:"about",
//            element:<About />
//          },
//          {

//            path:"contact",
//            element:<Contact />
//          }
//       ]
//    }
// ])


const router = createBrowserRouter(

  createRoutesFromElements(

      <Route path="/" element = {<App />}>
         <Route path="" element = {<Home />} />
         <Route path="about" element = {<About />} />
         <Route path="contact" element = {<Contact />} />
      </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

// import React from 'react'

// function Footer(props) {
//   return (
    
//     <h1>My Footer count is {props.c}</h1>
//   )
// }

// export default Footer


import React,{useContext} from 'react'
import mycontext from '../context/CountContext'

function Footer() {

    const value = useContext(mycontext);

  return (
    
    <h1>My Footer count is {value}</h1>
  )
}

export default Footer
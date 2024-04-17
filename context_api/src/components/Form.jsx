import React from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext';


function Form() {
    
    const {user} = useContext(UserContext);
    console.log(user)
  return (
    <div>Form</div>
  )
}

export default Form
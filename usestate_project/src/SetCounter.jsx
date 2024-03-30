import { useState } from "react";

function SetCounter() {
     
    let [counter,setcounter] = useState(0)
   

    function increment(){
         
        setcounter(counter++)
       
    }

    function decrement(){

        setcounter(counter--)
       
    }
  return(

      <div className="container">
         <button onClick={increment}>+</button>
         <span>{counter}</span>
         <button onClick={decrement}>-</button>
      </div>
  );
}

export default SetCounter;

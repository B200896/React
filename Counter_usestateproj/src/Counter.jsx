import { useState } from "react";
function counter() {
    let[counter,setcounter]=useState(0);
    function inc()
    {
        counter=counter+1;
        setcounter(counter);
    }
    function dec()
    {
        
        counter=counter-1;
        setcounter(counter);
    }
    return (
        <>
            <div id="counter">{counter}</div>
            <button onClick={inc}>+</button>
            {/* <span>{counter}</span> */}
            <button onClick={dec}>-</button>
        </>

    )
}
export default counter;
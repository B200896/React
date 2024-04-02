import { useState } from "react";
function Lowercase(){
    let[data,dataset]=useState("")
    function gettext(e)
    {
        data=e.target.value;
        dataset(data);
        console.log(data);

    }
    function uppercase()
    {
        // console.log("hello Mohit");
        // console.log(data.toUpperCase());
        dataset(data.toUpperCase());
    }
    function lowercase()
    {
        // console.log("Hello Kashish");
       
        dataset( data.toLowerCase());
    }
    let [x,xset]=useState("")
    function color(e)
    {
        xset(e.target.value)
        // mohit=e.target.value;
        // console.log(mohit);
    }
    return(
        <div className="text-area">
            <textarea name="" id="" cols="30" rows="10" onChange={gettext}></textarea>
            <button onClick={uppercase}>uppercase</button>
            <button onClick={lowercase}>lowercase</button>
            <textarea name="" id="" cols="30" rows="10" value={data}></textarea>
            <input type="text" onChange={color} />
            <h1 style={{font:x}}>{data}</h1>
            <h1>{x}</h1>


        </div>


    );
}
export default Lowercase;
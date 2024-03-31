import { useState } from "react";

function Textarea() {
  let [a, seta] = useState("");
  let [mycolor,setcolor] = useState("");
  function text(e) {
    seta(e.target.value);
  }

  function Uppercase() {
    seta(a.toUpperCase());
  }

  function Lowercase() {
    seta(a.toLowerCase());
  }

  function color(event) {
    setcolor(event.target.value);
    console.log(mycolor)
  }

  return (
    <div className="textarea">
      <textarea name="" id="" cols="50" rows="20" onChange={text}></textarea>

      <div className="text">
        <h3 style={{color:mycolor}}>{a}</h3>
      </div>

      <button onClick={Uppercase}>Uppercase</button>
      <button onClick={Lowercase}>Lowercase</button>

      <input type="3or" onChange={color} />
    </div>
  );
}

export default Textarea;

import { useState } from "react";

function Textarea() {
  let [name, setname] = useState("Mohit");

  function inp(e) {
    name = e.target.value;
}

function change() {
      setname(name);
  }

  return (
    <>
      <div className="input">
        <h1>My Name is {name}</h1>
        <input type="text" onChange={inp} />
        <button onClick={change}>Submit</button>
      </div>
    </>
  );
}

export default Textarea;

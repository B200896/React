import React, { useState , useContext } from "react";
import UserContext from "../context/UserContext";


function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const {setUser} = useContext(UserContext);

  function getusername(e) {
    setusername(e.target.value);
  }

  function getpassword(e) {
    setpassword(e.target.value);
  }

  function submit(e){
    e.preventDefault()
    setUser({username,password})
    // console.log(username,password)
  }

  return (
    <div>
      <form action="">
        <input type="text" placeholder="Username" onChange={getusername} />
        <input type="text" placeholder="Password" onChange={getpassword} /> <br /> <br />
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
}

export default Login;

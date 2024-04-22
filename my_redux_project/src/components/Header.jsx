import React from "react";
import { useSelector } from "react-redux";

function Header() {
  const count = useSelector((state) => state.counter.value);
  return (

  <h1>This is my header and count is {count}</h1>
  
);
}

export default Header;

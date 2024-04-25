import React from "react";
import "./Navbar.css";
import logo from '../../assets/Youtube_logo.png'
import user from '../../assets/gerard.png'

function Navbar({setsidebar}) {

  function FireBar(event){
    event.preventDefault()
    // setsidebar((prev)=>prev===false?true:false)
  }
  return (
    <div className="navbar">
      <div className="navbar-left">
        <i className="fa-solid fa-bars" onClick={FireBar}></i>
        <img src={logo} alt="" />
      </div>
      <div className="navbar-center">
        <div className="navbar-search">
          <input type="text" placeholder="Search" />
          <i className="fa-solid fa-magnifying-glass search"></i>
        </div>
        <i className="fa-solid fa-microphone mic"></i>
      </div>
      <div className="navbar-right">
        <i className="fa-solid fa-video"></i>
        <i className="fa-regular fa-bell"></i>
        <div className="navbar-user">
            <img src={user} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

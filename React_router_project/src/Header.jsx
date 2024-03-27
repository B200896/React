import { Link } from "react-router-dom";

function Header() {
  return (
    
    <div className="header">
      <ul>
        <li>
            {/* <a href=""></a> */}
          <Link to="">Home</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
        <li>
          <Link to="contact">Contact</Link>
        </li>
        <li>
          <Link to="register">Register</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;

import {Link} from "react-router-dom";
function Header() {
    return(
    <div className="header">
        <div className="start">
            <h1>Start Coding</h1>
        </div>
        <div className="head">

            <ul>
                <li>
                    <Link to="">Home</Link>
                </li>
                <li>
                    <Link to="about">About</Link>

                </li>
                <li>
                    <Link to="contact">Contact</Link>
                </li>
                <li>
                    <Link to = "blog">Blog</Link>
                </li>
            </ul>
        </div>
    </div>
    )
}
export default Header;
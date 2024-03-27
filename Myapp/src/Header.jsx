import {Link} from "react-router-dom"
function Header()
{
    return(
        <div className="header">
            <div className="left">
                <h2>Sixteen <span>Clothing</span> </h2>
            </div>
            <div className="right">
                <ul>

                    <li> 
                        <Link to="">Home</Link>

                    </li>
                    <li>
                        <Link to="our products">Our Products</Link>
                    </li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className="bar">
            <i class="fa-solid fa-bars"></i>
            </div>
        </div>

            
        )
}
export default Header;
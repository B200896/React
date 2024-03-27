<<<<<<< HEAD
import {Link} from "react-router-dom"
=======
import { Link } from "react-router-dom";

>>>>>>> 152de3c819fb78fb1f0c1234fb384d7ef0c6a1b8
function Header()
{
    return(
        <div className="header">
            <div className="left">
                <h2>Sixteen <span>Clothing</span> </h2>
            </div>
            <div className="right">
                <ul>

<<<<<<< HEAD
                    <li> 
                        <Link to="">Home</Link>

                    </li>
                    <li>
                        <Link to="our products">Our Products</Link>
                    </li>
                    <li>About Us</li>
                    <li>Contact Us</li>
=======
                    <li>
                       <Link to = ""  className="link">Home</Link>
                    </li>
                    <li>
                       <Link to = "our_product" className="link">Our Products</Link> 
                    </li>
                    <li>
                       <Link to = "about" className="link">About Us</Link> 
                    </li>
                    <li>
                      <Link to = "contact" className="link">Contact Us</Link>  
                    </li>
>>>>>>> 152de3c819fb78fb1f0c1234fb384d7ef0c6a1b8
                </ul>
            </div>
            <div className="bar">
            <i class="fa-solid fa-bars"></i>
            </div>
        </div>

            
        )
}
export default Header;
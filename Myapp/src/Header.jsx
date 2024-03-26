import { Link } from "react-router-dom";

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
                </ul>
            </div>
            <div className="bar">
            <i class="fa-solid fa-bars"></i>
            </div>
        </div>

            
        )
}
export default Header;
import Home_Products from "./Home_Products";
import Home_About from "./Home_About"
import aboutsixteenclothing from '../Data/aboutsixteenclothing.json'
import Image from "../Image";

function Home()
{

    return(

        <>
         <Image title = "NEW ARRIVALS ON SALE" />
         <Home_Products />
         <Home_About title = {aboutsixteenclothing.title} description = {aboutsixteenclothing.description} list = {aboutsixteenclothing.list} />
        </>
    )

}


export default Home;
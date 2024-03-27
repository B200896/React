
import './App.css'
import Header from './Header'
// import Image from './Image'
// import Product from './Product'
// import Nextt from './Nextt'
// import Footer from './Footer'
// import Our_products from './Our_products'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <>
    <Header />
    {/* <Image /> */}
    {/* <Product/> */}
    {/* <Nextt/> */}
    {/* <Footer/> */}
    {/* <Our_products/> */}
    <Outlet/>

    </>
  )
}

export default App

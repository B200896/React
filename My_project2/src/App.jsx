import './App.css'
import Header from './Header'
import Image from './Image'
// import Products from './Home/Home_Products'
// import About from './Home/Home_About'
// import aboutsixteenclothing from './Data/aboutsixteenclothing.json'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <>
    <Header /> 
    <Outlet />
    {/* <Products /> 
    <About title = {aboutsixteenclothing.title} description = {aboutsixteenclothing.description} list = {aboutsixteenclothing.list}/>    */}
    </>
  )
}

export default App;

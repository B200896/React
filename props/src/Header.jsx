function Header(props){

    return(
        <>
         <h1>My Name is {props.name}</h1>
         <h1>I am from {props.city}</h1>
        </>
    )
}


export default Header;
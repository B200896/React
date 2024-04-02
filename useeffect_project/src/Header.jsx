import { useEffect } from "react";

function Header(props){
     
    useEffect(()=>{
        
        console.log("Header me props pass kro ge tbi chlu ga")

    },[props.name])

    return(

        <h1>This is {props.id} {props.name} {props.city} </h1>
    )
     
}

export default Header;
function Pro(props)
{
    return(
        <div className="images">
        <div className="images-1">
            <img src={props.image}/>
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reprehenderit!</p> */}
        </div>
        <div className="images-2">
            <div className="upper">
                <h4>{props.title}</h4>
                <h6>{props.price}</h6>
                {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, voluptas!</p> */}
            </div>
            <div className="lower">
                {props.description}
            </div>
        </div>
    </div>

    )
}
export default Pro;
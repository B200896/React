import Pro from "./Pro";
import Data from './Data/Data.json'
function Product(props) {
    console.log(Data)
    return (

        <div className="Product">
            <div className="columns">
                <div className="my-next">
                    <h2>Latest Products</h2>
                    <p>view all products</p>
                </div>
                <div className="Facts">
                    {
                        Data.map((item)=>
                        (
                            <Pro image={item.image} title={item.title} price={item.price} description={item.description}/>
                        ))
                    }
                    
                    
                </div>

            </div>



        </div>



        // </div >
    )
}
export default Product;
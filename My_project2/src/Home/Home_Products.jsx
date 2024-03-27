import data from '../Data/data.json'
import Product from './Home_Product';

function Products(props) {
  console.log(props)
  return (
    <div className="products">
      <div className="products-header">
        <h2>Latest Products</h2>
        <a href="">View All Products</a>
      </div>
      <div className="prod-container">

      {data.map((item)=>(
         <Product image = {item.image} title = {item.title} price = {item.price} description = {item.description} />
      ))}
      
      </div>
    </div>
  );
}

export default Products;

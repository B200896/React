function Product(props) {
    console.log(props)
  return (
    <>
      <div className="product-container">
        <div className="image">
          <img
            src={props.image}
            alt=""
          />
        </div>
        <div className="content">
          <div className="content-upper">
            <h3>{props.title}</h3>
            <h3>${props.price}</h3>
          </div>
          <div className="content-mid">{props.description}</div>
          <div className="content-lower">
            <div className="reviews-star">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <div className="reviews-text">Reviews(24)</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;

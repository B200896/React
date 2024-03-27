import React, { useState } from "react";
import Image from "../Image";
import "./Our_Product.css";
import Product from "./Products";
import data from "../Data/data.json";

function Our_Product() {
  const [filter_data, set_filter] = useState([]);
  function handle(event) {
    if (event.target.innerText == "ALL PRODUCTS") {
      set_filter(
        data.map((item) => {
          return item;
        })
      );
    } else if (event.target.innerText == "FEATURED") {
      set_filter(
        data.filter((item) => {
          return item.price > 30;
        })
      );
    } else if (event.target.innerText == "FLASH DEALS") {
      set_filter(
        data.filter((item) => {
          return item.price < 30;
        })
      );
    }
  }

  return (
    <>
      <Image title="sixteen products" />
      <div className="our_product">
        <div className="our_product_menu">
          <ul>
            <li onClick={handle}>All Products</li>
            <li onClick={handle}>Featured</li>
            <li onClick={handle}>Flash Deals</li>
            <li onClick={handle}>Last Minute</li>
          </ul>
        </div>
        <div className="product">
          {
            // console.log(typeof(filter_data),filter_data)

            filter_data.map((item) => (
              <Product
                image={item.image}
                title={item.title}
                price={item.price}
                description={item.description}
              />
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Our_Product;

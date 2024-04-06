import { useEffect, useState } from "react";

function Data() {
  let [data, setData] = useState([]);

  useEffect(() => {
    async function ApiData() {
      let data_fetch = await fetch("https://dummyjson.com/products");
      let json_data = await data_fetch.json();
      let inner_data = json_data.products;
      setData(inner_data);
    }

    ApiData();
  }, []);

  return (
    <>
      {
        data.map((item) => (
          <div className="container">
            <div className="image">
              <img src={item.images[0]} alt="" />
            </div>
            <div className="content">
              <h2>{item.title}</h2>
              <h3>{item.price}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
    </>
  );
}

export default Data;

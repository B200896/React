import { useEffect, useState } from "react";

function Data() {
  let [data, setData] = useState([]);
  let [search, setsearch] = useState("");

  function Search(e) {
    search = e.target.value;
  }

  function Button() {
    setsearch(search);
    data =
      data &&
      data.filter((item) => {
        return item.title == search;
      });
    setData(data);
  }

  useEffect(() => {
    async function ApiData() {
      let data_fetch = await fetch("https://dummyjson.com/products");
      let json_data = await data_fetch.json();
      let inner_data = json_data.products
      setData(inner_data);
    }

    ApiData();
  }, []);

  return (
    <>
      <div className="input">
        <input type="text" onChange={Search} />
        <button onClick={Button}>Search</button>
      </div>
      {data &&
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

import React, { useState } from "react";
import "./Feed.css";
import thumbnil from "../../assets/thumbnail1.png";
import { Link } from "react-router-dom";
import { API_KEY } from "../../data";
import { useEffect } from "react";
import moment from "moment";

function Feed({ category }) {
  let [api_data, setdata] = useState([]);
  // const [key, setKey] = useState(0);



  const fetch_data = async () => {
    const randomParam = Math.random();
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=44&regionCode=In&videoCategoryId=${category}&key=${API_KEY}&random=${randomParam}`;
    const data = await fetch(videoList_url);
    const json_data = await data.json(); 
    // console.log(data)
    setdata(json_data.items);
  };

  useEffect(() => {
    fetch_data();
  }, [category]);

  // console.log(api_data)


  // console.log(api_data);
  return (
    <>
      <div className="feed">
        {api_data && api_data.map((item) => (
          <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
            <div className="upper-card">
              <img src={item.snippet.thumbnails.medium.url} alt="" />
            </div>
            <div className="lower-card">
              <h2>{item.snippet.title}</h2>
              <h3>{item.snippet.channelTitle}</h3>
              <p>{item.statistics.viewCount} &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Feed;

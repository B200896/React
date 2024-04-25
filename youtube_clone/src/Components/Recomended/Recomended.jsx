import React from "react";
import "./Recomended.css";
import { useState, useEffect } from "react";
import aside_pic from "../../images/aside-pic.jpg";
import { API_KEY } from "../../data";
import { Link } from "react-router-dom";


function Recomended({ categoryId }) {
  let [api_data, setdata] = useState([]);
  const fetch_data = async () => {
    const randomParam = Math.random();
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=In&videoCategoryId=${categoryId}&key=${API_KEY}&random=${randomParam}`;
    const data = await fetch(videoList_url);
    const json_data = await data.json();
    // console.log(data)
    setdata(json_data.items);
    // console.log(api_data)
  };

  useEffect(() => {
    fetch_data();
  }, [categoryId]);
  return (
    <>
      <aside className="aside">
        {api_data.map((item) => (
          <>
          {/* {console.log(item)} */}
            {/* <div className="aside__top-container">
              <p>Up next</p>
              <a href="#">AUTOPLAY</a>
            </div> */}
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="card">
            <div className="recom">
                <div className="left">
                    <img src={item.snippet.thumbnails.default.url} alt="" />
                </div>
                <div className="right">
                    <h4 className="title">{item.snippet.title.slice(0,30)}</h4>
                    <p className="channel">{item.snippet.channelTitle}</p>
                    <p className="">{item.statistics.viewCount} View Count</p>
                </div>
            </div>
            </Link>
            {/* <a href="#" className="first-img-aside">
              <img src={aside_pic} alt="Next video" />
            </a> */}
          </>
        ))}
      </aside>
    </>
  );
}

export default Recomended;

import React, { useState } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import music from "../../assets/music.png";
import share from "../../assets/share.png";
import subscribed from "../../images/subscribed.jpg";
import sort from "../../images/sort.jpg";
import profile_icon from "../../images/profile_icon.png";
import { API_KEY } from "../../data";
import { useEffect } from "react";

function PlayVideo({ videoId }) {
  const [apidata, setapidata] = useState([]);
  const [commentdata, setcommentdata] = useState([]);
  const [channeldata, setchanneldata] = useState([]);

  const fetchapidata = async () => {
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    );
    const final_data = await data.json();
    setapidata(final_data.items);
    // console.log(apidata, ">>>>");

    const comment_data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
    );
    const final_comment_data = await comment_data.json();
    // console.log(final_comment_data)
    setcommentdata(final_comment_data.items);
    // console.log(commentdata);

  
  };

  const fetchchannel_data = async ()=>{
    const channel_data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_KEY}`
      );
      const final_channel_data = await channel_data.json();
      console.log(final_channel_data,'<<>>>')
      setchanneldata(final_channel_data);
  }

  useEffect(() => {
    fetchapidata();
  }, []);

  useEffect(()=>{
    fetchchannel_data();
  },[])
  return (
    <div classNameName="wrapper">
      <div className="main-wrapper">
        <div className="left"></div>
        <main>
          {apidata.map((item) => (
            <div className="main__video">
              <div className="main__video-container">
                <iframe
                  width="100%"
                  height="650"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div className="main__description">
                <div>
                  <p>{item.snippet.title}</p>
                  <p>{item.statistics.viewCount} views</p>
                </div>

                <div className="right">
                  <span>
                    <img src={like} alt="" />
                    {item.statistics.likeCount}
                  </span>
                  <span>
                    <img src={dislike} alt="" />
                  </span>
                  <span>
                    <img src={share} alt="" />
                    Share
                  </span>
                  <span>
                    <img src={music} alt="" />
                    Save
                  </span>
                </div>
              </div>
              <div className="main__sub-description">
                {channeldata.map((ch) => (
                  <a href="#">
                    <div className="channel-logo">
                      <img src={ch.snippet.title} alt="" />
                    </div>
                    <div className="channel-detail">
                      <p></p>
                      <p></p>
                    </div>
                    {/* <img className="main__name" src={describe_name} alt="name" /> */}
                  </a>
                ))}
                <a href="#">
                  <img
                    className="main__subscriptions"
                    src={subscribed}
                    alt="subscriptions"
                  />
                </a>
                <p>{item.snippet.description.slice(0, 300)}</p>
              </div>
              <div className="main__more">
                <a href="#">
                  <p>SHOW MORE</p>
                </a>
              </div>
            </div>
          ))}

          <section>
            <div>
              <div className="section__comments">
                <p>6,806 Comments</p>
              </div>
              <div className="section__sort-container">
                <a href="#">
                  <img src={sort} alt="sort comments" />
                  <p>SORT BY</p>
                </a>
              </div>
              <div className="section__profile">
                <img src={profile_icon} alt="profile_icon" />
              </div>
              <div className="input__container">
                <form>
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    value="Add a public comment..."
                  />
                </form>
              </div>
            </div>
            <div>
              {commentdata &&
                commentdata.map((item, index) => (
                  <div className="comments" key={index}>
                    <img
                      src={
                        item.snippet.topLevelComment.snippet
                          .authorProfileImageUrl
                      }
                      alt="profile icon"
                      width="50"
                    />
                    <p className="comments__name">
                      {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                      <a
                        href={
                          item.snippet.topLevelComment.snippet.authorChannelUrl
                        }
                      >
                        10 months ago
                      </a>{" "}
                    </p>
                    <p className="comments__comment">
                      {item.snippet.topLevelComment.snippet.textOriginal}
                    </p>
                    <div className="likes">
                      <a href="#">
                        <img src={like} alt="like" width={20}/>
                      </a>
                      <p className="comments__text">
                        {item.snippet.topLevelComment.snippet.likeCount}
                      </p>
                      <a href="#">
                        <img src={dislike} alt="dislike" width={20} />
                      </a>
                      <a href="#" className="comments__text">
                        REPLY
                      </a>
                    </div>
                    <a href="#" className="comments_replies">
                      View all 7 replies
                    </a>
                  </div>
                ))}
              {/* <div className="comments">
                                <img src={profile_icon} alt="profile icon" width="50" />
                                <p className="comments__name">John Snow <a href="#">10 months ago</a> </p>
                                <p className="comments__comment">Stephen A will do anything he possibly can to get KD on the Knicks 😂.</p>
                                <div className="likes">
                                    <a href="#">
                                        <img src={like} alt="like" />
                                    </a>
                                    <p className="comments__text">1K</p>
                                    <a href="#">
                                        <img src={dislike} alt="dislike" />
                                    </a>
                                    <a href="#" className="comments__text">REPLY</a>
                                </div>
                                <a href="#" className="comments_replies">View all 7 replies</a>
                            </div>
                            <div className="comments">
                                <img src={profile_icon} alt="profile icon" width="50" />
                                <p className="comments__name">John Snow <a href="#">10 months ago</a> </p>
                                <p className="comments__comment">Stephen A will do anything he possibly can to get KD on the Knicks 😂.</p>
                                <div className="likes">
                                    <a href="#">
                                        <img src={like} alt="like" />
                                    </a>
                                    <p className="comments__text">1K</p>
                                    <a href="#">
                                        <img src={dislike} alt="dislike" />
                                    </a>
                                    <a href="#" className="comments__text">REPLY</a>
                                </div>
                                <a href="#" className="comments_replies">View all 7 replies</a>
                            </div>
                            <div className="comments">
                                <img src={profile_icon} alt="profile icon" width="50" />
                                <p className="comments__name">John Snow <a href="#">10 months ago</a> </p>
                                <p className="comments__comment">Stephen A will do anything he possibly can to get KD on the Knicks 😂.</p>
                                <div className="likes">
                                    <a href="#">
                                        <img src={like} alt="like" />
                                    </a>
                                    <p className="comments__text">1K</p>
                                    <a href="#">
                                        <img src={dislike} alt="dislike" />
                                    </a>
                                    <a href="#" className="comments__text">REPLY</a>
                                </div>
                                <a href="#" className="comments_replies">View all 7 replies</a>
                            </div>
                            <div className="comments">
                                <img src={profile_icon} alt="profile icon" width="50" />
                                <p className="comments__name">John Snow <a href="#">10 months ago</a> </p>
                                <p className="comments__comment">Stephen A will do anything he possibly can to get KD on the Knicks 😂.</p>
                                <div className="likes">
                                    <a href="#">
                                        <img src={like} alt="like" />
                                    </a>
                                    <p className="comments__text">1K</p>
                                    <a href="#">
                                        <img src={dislike} alt="dislike" />
                                    </a>
                                    <a href="#" className="comments__text">REPLY</a>
                                </div>
                                <a href="#" className="comments_replies">View all 7 replies</a>
                            </div> */}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default PlayVideo;

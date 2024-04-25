import React from 'react'
import './Sidebar.css'
import mohit from '../../assets/simon.png'
import rohit from '../../assets/tom.png'
import ankit from '../../assets/megan.png'
import aman from '../../assets/cameron.png'

function Sidebar({sidebar,category,setCategory}) {
  return (
    // <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
    <div className={`sidebar`}>
      <div className="sidebar-upper">
       <ul>
        <li className={`side-link ${category===0?"active":""}`} onClick={()=>setCategory(0)}><span><i className="fa-solid fa-house"></i></span><span>Home</span></li>
        {/* <li className={`side-link ${category===18?"active":""}`} onClick={()=>setCategory(42)}><span><i class="fa-solid fa-bolt"></i></span><span>Shorts</span></li>
        <li className={`side-link ${category===5?"active":""}`} onClick={()=>setCategory(0)}><span><i class="fa-solid fa-play"></i></span><span>Subscriptions</span></li> */}
                  <li className={`side-link ${category===19?"active":""}`} onClick={()=>setCategory(10)}><span><i class="fa-solid fa-paperclip"></i></span><span>Trending</span></li>
          <li className={`side-link ${category===26?"active":""}`} onClick={()=>setCategory(26)}><span><i class="fa-solid fa-bag-shopping"></i></span><span>Shoping</span></li>
          <li className={`side-link ${category===10?"active":""}`} onClick={()=>setCategory(10)}><span><i class="fa-solid fa-music"></i></span><span>Music</span></li>
          <li className={`side-link ${category===30?"active":""}`} onClick={()=>setCategory(1)}><span><i class="fa-solid fa-film"></i></span><span>Movies</span></li>
          <li className={`side-link ${category===22?"active":""}`} onClick={()=>setCategory(22)}><span><i class="fa-solid fa-wifi"></i></span><span>Blogs</span></li>
          <li className={`side-link ${category===20?"active":""}`} onClick={()=>setCategory(20)}><span><i class="fa-solid fa-gamepad"></i></span><span>Gameing</span></li>
          <li className={`side-link ${category===25?"active":""}`} onClick={()=>setCategory(25)}><span><i class="fa-solid fa-gamepad"></i></span><span>News</span></li>
          <li className={`side-link ${category===17?"active":""}`} onClick={()=>setCategory(17)}><span><i class="fa-solid fa-volleyball"></i></span><span>Sports</span></li>
          <li className={`side-link ${category===27?"active":""}`} onClick={()=>setCategory(27)}><span><i class="fa-regular fa-lightbulb"></i></span><span>Education</span></li>
          <li className={`side-link ${category===28?"active":""}`} onClick={()=>setCategory(28)}><span><i class="fa-solid fa-vest-patches"></i></span><span>Science & Technology</span></li>
          <li className={`side-link ${category===34?"active":""}`} onClick={()=>setCategory(34)}><span><i class="fa-solid fa-podcast"></i></span><span>Comedy</span></li>
       </ul>
      </div>
      {/* <div className="explore">
      <h3>Explore</h3>
        <ul>
          <li className={`side-link ${category===19?"active":""}`} onClick={()=>setCategory(10)}><span><i class="fa-solid fa-paperclip"></i></span><span>Trending</span></li>
          <li className={`side-link ${category===26?"active":""}`} onClick={()=>setCategory(26)}><span><i class="fa-solid fa-bag-shopping"></i></span><span>Shoping</span></li>
          <li className={`side-link ${category===10?"active":""}`} onClick={()=>setCategory(10)}><span><i class="fa-solid fa-music"></i></span><span>Music</span></li>
          <li className={`side-link ${category===30?"active":""}`} onClick={()=>setCategory(1)}><span><i class="fa-solid fa-film"></i></span><span>Movies</span></li>
          <li className={`side-link ${category===22?"active":""}`} onClick={()=>setCategory(22)}><span><i class="fa-solid fa-wifi"></i></span><span>Blogs</span></li>
          <li className={`side-link ${category===20?"active":""}`} onClick={()=>setCategory(20)}><span><i class="fa-solid fa-gamepad"></i></span><span>Gameing</span></li>
          <li className={`side-link ${category===25?"active":""}`} onClick={()=>setCategory(25)}><span><i class="fa-solid fa-gamepad"></i></span><span>News</span></li>
          <li className={`side-link ${category===17?"active":""}`} onClick={()=>setCategory(17)}><span><i class="fa-solid fa-volleyball"></i></span><span>Sports</span></li>
          <li className={`side-link ${category===27?"active":""}`} onClick={()=>setCategory(27)}><span><i class="fa-regular fa-lightbulb"></i></span><span>Education</span></li>
          <li className={`side-link ${category===28?"active":""}`} onClick={()=>setCategory(28)}><span><i class="fa-solid fa-vest-patches"></i></span><span>Science & Technology</span></li>
          <li className={`side-link ${category===34?"active":""}`} onClick={()=>setCategory(34)}><span><i class="fa-solid fa-podcast"></i></span><span>Comedy</span></li>
        </ul>
      </div> */}
      <div className="subscriptions">
        <h3>Subscription</h3>
        <ul>
          <li><span><img src={mohit} alt="" /></span><span>Mohit</span></li>
          <li><span><img src={rohit} alt="" /></span><span>Rohit</span></li>
          <li><span><img src={ankit} alt="" /></span><span>Aman</span></li>
          <li><span><img src={aman} alt="" /></span><span>Ankit</span></li>
          <li><span><img src={mohit} alt="" /></span><span>Shyam</span></li>
        </ul>
      </div>
     
    </div>
  )
}

export default Sidebar
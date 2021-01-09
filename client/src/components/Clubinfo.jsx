import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "../styles/Styles.css";

function Clubinfo(){
  const currentURL_string = window.location.href;
  const id = currentURL_string.substring(currentURL_string.lastIndexOf("/")+1);

  const [clubInfo, setclubinfo] = useState({
    cname: "",
    lead: "",
    email: "",
    category: "",
    desc: "",
    site: "",
    start: new Date(),
    end: new Date(),
    Imgfile: ""
  });

  axios.get("https://clubview-server.herokuapp.com/clubs/"+id)
    .then(res=> setclubinfo(res.data))
    .catch(err=> console.log(err));

  return (
  <div className= "row">
    <div className="container-fluid-add col-lg-7 col-md-12">
      <div className="my-4" style= {{height: ""}}>
        <img src="../images/clubPhoto.png" alt="Club Photo" style= {{width: "100%", height:"100%"}} />
      </div>
    </div>
    <div className="container-fluid-add col-lg-5 col-md-12" style={{textAlign: "left"}}>
      <h2>{clubInfo.cname}</h2>
      <p>{clubInfo.category}</p>
      <p>Application process starts: {(String(clubInfo.start)).substring(0,16)}</p>
      <p>Application process ends: {(String(clubInfo.end)).substring(0,16)}</p>
      <p>{clubInfo.desc}</p>
      <h6>Learn more on <a href={clubInfo.site}>their website</a></h6>
    </div>
  </div>
  )
}

export default Clubinfo;
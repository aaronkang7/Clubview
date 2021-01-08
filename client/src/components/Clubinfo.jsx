import React, {useState} from "react";
import axios from "axios";
import "../styles/Styles.css";

function Clubinfo(){
  const currentURL_string = window.location.href;
  const id = currentURL_string.substring(currentURL_string.lastIndexOf("/")+1);

  const [clubInfo, setclubinfo] = useState([]);

  axios.get("http://localhost:5000/clubs/"+id)
    .then(res=> setclubinfo(res.data))
    .catch(err=> console.log(err));


  return (
  <div className= "row">
    <div className="container-fluid-add col-lg-7 col-md-12">
      section1
    </div>
    <div className="container-fluid-add col-lg-5 col-md-12">
      section2
    </div>
  </div>
  )
}

export default Clubinfo;
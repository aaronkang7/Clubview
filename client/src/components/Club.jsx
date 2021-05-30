import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import $ from "jquery";
import "../styles/Styles.css"



function Club(props){

  useEffect(() => {
    $(".card").on("mouseenter", function() {
      $(this).addClass('shadow-lg').css('cursor', 'pointer'); 
    }).on("mouseleave", function() {
      $(this).removeClass('shadow-lg');});
    }
  );

  const infoLinkRoute= "clubs/" + props.id;
  const editLinkRoute = "edit/" + props.id;


  const statusInd = {
    height: "17px",
    width: "17px",
    backgroundColor: props.recruit[1],
    borderRadius: "50%",
    display: "inline-block",
    float:"left",
    zIndex: "2"
  }

  return(
    <>
    <div class="card mb-4">
      <Link to={infoLinkRoute}>
        <div class="card-img-container">
          <img class="card-img-top" src="./images/smallLong.png" alt="Card image cap" />
          <p class="card-text">{props.emoji}</p>
        </div>
      </Link>
        <div className="card-body">
        <Link to={infoLinkRoute}>
            <h4 style={{color:"black"}}>{props.cname}</h4>
          </Link>
            <span style= {statusInd}></span>
            <p className="card-text">
            {props.recruit[0]} <br /> <Link to={editLinkRoute}><small>Edit</small></Link>
            </p>
        </div>
    </div>
    </>
  )
}

export default Club;
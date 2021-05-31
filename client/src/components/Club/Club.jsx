import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import $ from "jquery";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Fab from '@material-ui/core/Fab'
import "./Club.css"



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
  const [isFav, setFav] = useState(false);


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
    <div className="card mb-4">
      <div className="edit-icon-container">
        <Fab className="edit-icon" onClick= {() => {setFav(!isFav)}} aria-label="favorite" size="small">
           {isFav ? <FavoriteIcon className="edit-icon-heart" fontSize="small" /> : <FavoriteBorderIcon className="edit-icon-heart" fontSize="small" /> }
        </Fab>
      </div>
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
            {props.recruit[0]}
            </p>
        </div>
    </div>
    </>
  )
}

export default Club;
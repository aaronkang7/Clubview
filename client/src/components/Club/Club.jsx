import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Fab from "@material-ui/core/Fab";
import "./Club.css";

function Club(props) {
  const infoLinkRoute = "clubs/" + props.id;
  const editLinkRoute = "edit/" + props.id;
  const [isFav, setFav] = useState(false);

  const statusInd = {
    height: "17px",
    width: "17px",
    backgroundColor: props.recruit[1],
    borderRadius: "50%",
    display: "inline-block",
    float: "left",
    zIndex: "2",
  };

  const handleFavClick = () => {
    setFav(!isFav);
  };

  return (
    <>
      <div className="card mb-4">
        <div className="edit-icon-container">
          <Fab
            className="edit-icon"
            onClick={handleFavClick}
            aria-label="favorite"
            size="small"
          >
            {isFav ? (
              <FavoriteIcon className="edit-icon-heart" fontSize="small" />
            ) : (
              <FavoriteBorderIcon
                className="edit-icon-heart"
                fontSize="small"
              />
            )}
          </Fab>
        </div>
        <Link to={infoLinkRoute}>
          <div className="card-img-container">
            <img
              className="card-img-top"
              src="./images/smallLong.png"
              alt="Card image cap"
            />
            <p className="card-text">{props.emoji}</p>
          </div>
        </Link>
        <div className="card-body">
          <Link to={infoLinkRoute}>
            <h4 style={{ color: "black" }}>{props.cname}</h4>
          </Link>
          <span style={statusInd}></span>
          <p className="card-text">{props.recruit[0]}</p>
        </div>
      </div>
    </>
  );
}

export default Club;

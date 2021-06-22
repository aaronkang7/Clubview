import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Fab from "@material-ui/core/Fab";
import { AuthContext, UserContext } from "../../context/user";
import "./Club.css";
import moment, { now } from "moment";
import axios from "axios";
import { green, yellow } from "@material-ui/core/colors";

function Club(props) {
  const infoLinkRoute = "clubs/" + props.id;
  const editLinkRoute = "edit/" + props.id;
  const { user } = useContext(UserContext);
  const { isSignedIn } = useContext(AuthContext);
  const [isFav, setFav] = useState(props.isFav);

  const nowMom = moment(new Date());
  const startMom = moment(props.recruit.start);
  const endMom = moment(props.recruit.end);

  const statusInd = {
    height: "17px",
    width: "17px",
    backgroundColor: props.recruit[1],
    borderRadius: "50%",
    display: "inline-block",
    float: "left",
    zIndex: "2",
  };

  useEffect(() => {}, [isFav]);

  const handleFavClick = () => {
    const notisFav = !isFav;
    const clubid = props.id;
    axios
      .post("http://localhost:5000/profile/" + user.email + "/editfav", {
        notisFav,
        clubid,
      })
      .then((res) => console.log(res));
    setFav(!isFav);
  };

  function renderTag() {
    // if (startMom.diff(nowMom, "days") < 10) {
    //   return yellow;
    // } else if (nowMom.isBetween(startMom, endMom, undefined, "[]")) {
    //   return green;
    // } else {
    //   return red;
    // }
    return "hello";
  }

  function renderDate() {
    return startMom.format("MM/DD") + " - " + endMom.format("MM/DD");
  }

  return (
    <>
      <div className="card mb-4">
        <div className="fav-icon-container">
          <Fab
            className="fav-icon"
            onClick={handleFavClick}
            aria-label="favorite"
            disabled={!isSignedIn}
            size="small"
          >
            {isFav ? (
              <FavoriteIcon className="fav-icon-heart" fontSize="small" />
            ) : (
              <FavoriteBorderIcon className="fav-icon-heart" fontSize="small" />
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
          <div className="d-flex">
            <Link to={infoLinkRoute}>
              <p style={{ color: "black" }} className="clubName">
                {props.cname}
              </p>
            </Link>
            <span className="status ml-auto">{renderTag()}</span>
          </div>
          <p className="recDate">{renderDate()}</p>
        </div>
      </div>
    </>
  );
}

export default Club;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Fab from "@material-ui/core/Fab";
import Chip from "@material-ui/core/Chip";
import { AuthContext, UserContext } from "../../context/user";
import "./Club.css";
import moment from "moment";
import axios from "axios";

function Club(props) {
  const infoLinkRoute = "clubs/" + props.id;
  const { user } = useContext(UserContext);
  const { isSignedIn } = useContext(AuthContext);
  const [status, setStatus] = useState({ message: "", color: "gray" });
  const [isFav, setFav] = useState(props.isFav);

  const nowMom = moment(new Date());
  const startMom = moment(props.recruit.start);
  const endMom = moment(props.recruit.end);

  useEffect(() => {
    renderTag();
  }, [isFav]);

  const handleFavClick = () => {
    const notisFav = !isFav;
    const clubid = props.id;
    axios
      .post(
        "https://clubview-server.herokuapp.com/profile/" +
          user.email +
          "/editfav",
        {
          notisFav,
          clubid,
        }
      )
      .then(() => setFav(!isFav));
  };

  function renderTag() {
    if (props.isAlwaysOpen) {
      setStatus({ color: "#C2e5aa", message: "OPEN" });
    } else {
      const diff = startMom.diff(nowMom, "days");
      if (diff < 21 && diff > 0) {
        setStatus({ color: "#FFF1BC", message: "INCOMING" });
      } else if (nowMom.isBetween(startMom, endMom, undefined, "[]")) {
        setStatus({ color: "#C2e5aa", message: "OPEN" });
      } else {
        setStatus({ color: "#FFBEAA", message: "CLOSED" });
      }
    }
  }

  function renderDate() {
    if (props.isAlwaysOpen) {
      return "Always open";
    }
    const startDate = startMom.isValid()
      ? startMom.format("MM/DD")
      : "Undecided";
    const endDate = endMom.isValid() ? endMom.format("MM/DD") : "Undecided";
    return startDate + " - " + endDate;
  }

  return (
    <>
      <div className="card">
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
              alt="clubphoto"
            />
            <p className="card-text">{props.emoji}</p>
          </div>
        </Link>
        <div className="card-body">
          <div className="d-flex">
            <Link to={infoLinkRoute}>
              <div className="clubName">{props.cname}</div>
            </Link>
            <div className="ml-auto status-container">
              <Chip
                label={status.message}
                style={{ backgroundColor: status.color }}
              />
            </div>
          </div>
          <p className="recDate">{renderDate()}</p>
        </div>
      </div>
    </>
  );
}

export default Club;

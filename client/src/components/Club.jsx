import {React} from "react";
import {Link} from "react-router-dom";
import "../styles/Styles.css"



function Club(props){

  const linkRoute= "clubs/" + props.id;

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
      <Link to={linkRoute}>
        <div class="card-img-container">
          <img class="card-img-top" src="./images/smallLong.png" alt="Card image cap" />
          <p class="card-text">{props.emoji}</p>
        </div>
        <div className="card mb-4">
          <div className="card-body">
          <h3 style={{color:"black"}}>{props.cname}</h3>
            <span style= {statusInd}></span>
            <p className="card-text">
            {props.recruit[0]}
            </p>
          </div>
        </div>
      </Link>
  )
}

export default Club;
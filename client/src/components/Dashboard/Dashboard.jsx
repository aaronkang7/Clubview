import React, { useState, useEffect, useContext } from "react";
import Club from "../Club/Club";
import axios from "axios";
import "./Dashboard.css";
import Filter from "../Filter/Filter";
import { AuthContext, UserContext } from "../../context/user";

function Dashboard() {
  const [searchTerm, setSearch] = useState("");
  const [clubs, setClubs] = useState([]);
  const { user } = useContext(UserContext);
  const { isSignedIn } = useContext(AuthContext);

  const fetchClubsData = async () => {
    await axios
      .get("https://clubview-server.herokuapp.com/clubs")
      .then((res) => setClubs(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //axios.post
    fetchClubsData();
    console.log("user is ", user);
  }, [user]);

  function handleChange(event) {
    const val = event.target.value;
    setSearch(val);
    console.log(searchTerm);
  }

  function handleSearch(event) {
    console.log(searchTerm);
    const sTerm = searchTerm.toLowerCase();
    const c = clubs.find((club) => String(club.cname).toLowerCase() === sTerm);

    if (c === undefined) {
      alert("Club not found");
      setSearch("");
    } else {
      window.location.href = "/clubs/" + c._id;
    }
  }

  function compareTime(startDate, dueDate) {
    var ifrecriuting =
      new Date(startDate).getTime() <= new Date().getTime() &&
      new Date().getTime() <= new Date(dueDate).getTime();

    const diffTime = new Date(startDate).getTime() - new Date().getTime();
    const over = 0 > new Date(dueDate).getTime() - new Date().getTime();
    const diffHours = Math.round(diffTime / (1000 * 60 * 60));

    if (ifrecriuting) {
      return ["Applications open", "#93e4aa"];
    } else if (0 < diffHours && diffHours <= 168) {
      return ["Opening soon (<7days)", "#f7f46f"];
    } else if (over) {
      const endString = dueDate.substring(0, 10);
      return ["Applications closed on: " + endString, "#f99487"];
    } else {
      const startString = startDate.substring(0, 10);
      return ["Opening on: " + startString, "#d3d3d3"];
    }
  }

  function findIsFav(clubItem) {
    const userFavs = isSignedIn ? Array.from(user.favorites) : [];
    return userFavs.includes(clubItem);
  }

  function clubList() {
    return clubs.map((clubItem) => {
      return (
        <Club
          key={clubItem._id}
          id={clubItem._id}
          cname={clubItem.cname}
          lead={clubItem.lead}
          email={clubItem.email}
          category={clubItem.category}
          desc={clubItem.desc}
          site={clubItem.site}
          emoji={clubItem.emoji}
          isFav={findIsFav(clubItem)}
          // setFav={editFavs}
          recruit={compareTime(clubItem.start, clubItem.end)}
        />
      );
    });
  }

  return (
    <div>
      <form className="form-inline" style={{ padding: "1%" }}>
        <input
          className="form-control mr-sm-2"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search Club"
          aria-label="Search"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="btn btn-outline-danger my-2 my-sm-0"
        >
          Search
        </button>
        <Filter className="mr-0" />
      </form>
      <div className="dashboard"> {clubList()}</div>
    </div>
  );
}

export default Dashboard;

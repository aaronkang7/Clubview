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
          recruit={{ start: clubItem.start, end: clubItem.end }}
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

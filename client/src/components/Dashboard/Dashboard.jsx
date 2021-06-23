import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Dashboard.css";
import Club from "../Club/Club";
import ClubsPage from "../ClubsPage/ClubsPage";
import PaginationTab from "../Pagination/Pagiation";
import Filter from "../Filter/Filter";
import { AuthContext, UserContext } from "../../context/user";

function Dashboard() {
  const [searchTerm, setSearch] = useState("");
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [clubsPerPage] = useState(8);

  const [favclubs, setFavClubs] = useState([]);
  const { user } = useContext(UserContext);
  const { isSignedIn } = useContext(AuthContext);

  const indexOfLastClub = currentPage * clubsPerPage;
  const indexOfFirstClub = indexOfLastClub - clubsPerPage;
  const currentClubs = clubs.slice(indexOfFirstClub, indexOfLastClub);

  const fetchClubsData = async () => {
    const res = await axios.get("https://clubview-server.herokuapp.com/clubs");
    setClubs(res.data);
    setLoading(false);
  };

  const fetchFavsData = () => {
    if (isSignedIn) {
      axios
        .get("http://localhost:5000/profile//favsID/" + user.email)
        .then((res) => setFavClubs(res.data));
    }
  };

  useEffect(() => {
    fetchFavsData();
    fetchClubsData();
    console.log("user in dashboard is ", user);
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
    return favclubs.includes(clubItem._id);
  }

  function paginate(pageNumber) {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
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
      <div className="dashboard">
        <ClubsPage
          clubs={currentClubs}
          loading={loading}
          isFavFinder={findIsFav}
        />
      </div>
      <PaginationTab
        clubsPerPage={clubsPerPage}
        totalClubs={clubs.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Dashboard;

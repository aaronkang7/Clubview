import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddArea.css";

function AddArea(props) {
  const isEdit = props.isEdit;
  const currentURL_string = window.location.href;
  const id = currentURL_string.substring(
    currentURL_string.lastIndexOf("/") + 1
  );

  const [club, setClub] = useState({
    cname: "",
    lead: "",
    email: "",
    category: "                        ",
    desc: "",
    site: "",
    start: "",
    end: "",
    emoji: "💡",
  });

  useEffect(() => {
    if (props.isEdit === true) {
      getClubInfo();
      console.log(club);
    }
  }, []);

  function getClubInfo() {
    axios
      .get("https://clubview-server.herokuapp.com/clubs/" + id)
      .then((res) => setClub(res.data))
      .catch((err) => console.log(err));
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setClub((prevClub) => {
      console.log(prevClub);
      return {
        ...prevClub,
        [name]: value,
      };
    });
  }

  function stillEmpty() {
    return (
      club.cname == "" ||
      club.lead == "" ||
      club.email == "" ||
      club.category == "                        " ||
      club.desc == "" ||
      club.start == "" ||
      club.end == ""
    );
  }

  function submitClub(event) {
    if (stillEmpty()) {
      alert("Please fill in all required sections");
      event.preventDefault();
    } else {
      if (props.isEdit == false) {
        alert("Club Add successful.");
        axios
          .post("https://clubview-server.herokuapp.com/clubs/add", club)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      } else {
        alert("Club Infomration Updated!!!!! ");
        axios
          .post(
            "https://clubview-server.herokuapp.com/clubs/update/" + id,
            club
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }
    }
    event.preventDefault();
  }

  return (
    <section>
      <form className="needs-validation" noValidate>
        <div className="row add-Area">
          <div className="container-fluid-add col-lg-5 col-md-12">
            <h4>Choose an emoji!</h4>
            <p>that best represents your club</p>
            <div className="content">{club.emoji}</div>
            <input
              name="emoji"
              type="text"
              className="input-styling form-control mx-auto"
              onChange={handleChange}
              value={club.emoji}
              maxLength="3"
              required
            />
          </div>

          <div className="container-fluid-add col-lg-7 col-md-12">
            <h4>Club Information</h4>

            <div className="form-group row">
              <label for="cName_">Club Name*</label>
              <input
                name="cname"
                type="text"
                className="form-control"
                id="cName_"
                onChange={handleChange}
                value={club.cname}
                required
              />
            </div>

            <div className="form-group row">
              <label for="cLead">Club Lead Name(s)*</label>
              <input
                name="lead"
                type="text"
                className="form-control"
                id="cLead"
                onChange={handleChange}
                value={club.lead}
                required
              />
            </div>

            <div className="form-group row">
              <label for="email">Club Lead e-mail*</label>
              <div className="input-group">
                <input
                  name="email"
                  type="text"
                  className="form-control"
                  id="email"
                  onChange={handleChange}
                  aria-describedby="emailHelp"
                  value={club.email}
                  required
                />
              </div>
            </div>

            <div className="form-group row">
              <label for="category">Club Category*</label>
              <select
                name="category"
                className="form-control"
                id="category"
                onChange={handleChange}
                value={club.category}
                required
              >
                <option> </option>
                <option>Academic and Educational</option>
                <option>Community service</option>
                <option>Media and Publication</option>
                <option>Political or multicultural</option>
                <option>Recreation and sports</option>
                <option>Religious and spiritual</option>
                <option>Student government</option>
              </select>
            </div>

            <div className="form-group row">
              <label for="clubDesc">Description of the Club*</label>
              <textarea
                className="form-control"
                name="desc"
                id="clubDesc"
                rows="3"
                onChange={handleChange}
                value={club.desc}
                required
              ></textarea>
            </div>

            <div className="form-group row">
              <label for="clubSite">Website/Social Media Link</label>
              <input
                name="site"
                type="url"
                className="form-control"
                id="clubSite"
                onChange={handleChange}
                value={club.site}
                required
              />
            </div>

            <div className="row">
              <label for="RecruitmentPeriod">Recruitment Period*</label>
              <div id="RecruitmentPeriod">
                <div className="row">
                  <div className="form-group col">
                    <div className="col-10">
                      <input
                        name="start"
                        className="form-control"
                        type="datetime-local"
                        id="startDate"
                        onChange={handleChange}
                        value={club.start}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group col">
                    <div className="col-10">
                      <input
                        name="end"
                        className="form-control"
                        type="datetime-local"
                        placeholder="End Date"
                        id="startDate"
                        onChange={handleChange}
                        value={club.end}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={submitClub}
              className="btn btn-primary"
              style={{ textAlign: "right" }}
            >
              {props.isEdit ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddArea;

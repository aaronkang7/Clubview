import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import "./AddArea.css";
import { AuthContext, UserContext } from "../../context/user";

function AddArea(props) {
  const history = useHistory();
  const [nameChecked, setChecked] = useState(false);
  const { isSignedIn } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const currentURL_string = window.location.href;
  const id = currentURL_string.substring(
    currentURL_string.lastIndexOf("/") + 1
  );

  const defaultClub = {
    cname: "",
    lead: "",
    email: "",
    category: "",
    desc: "",
    site: "",
    start: "",
    end: "",
    emoji: "💡",
    isAlwaysOpen: false,
  };

  const [club, setClub] = useState(defaultClub);

  useEffect(() => {
    if (props.isEdit === true) {
      setChecked(true);
    }
  }, [nameChecked]);

  useEffect(() => {
    console.log("in use effect");
    if (props.isEdit === true) {
      getClubInfo();
    }
  }, []);

  function getClubInfo() {
    axios
      .get("https://clubview-server.herokuapp.com/clubs/" + id)
      .then((res) => {
        setClub(res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(event) {
    console.log(club);
    let { name, value } = event.target;

    if (name === "cname") {
      setChecked(false);
    }

    setClub((prevClub) => {
      return {
        ...prevClub,
        [name]: value,
      };
    });
  }

  function handleClick(event) {
    let { checked } = event.target;
    setClub((prevClub) => {
      return {
        ...prevClub,
        isAlwaysOpen: checked,
      };
    });
  }

  function submitClub(event) {
    if (inValidInputs()) {
      event.preventDefault();
    } else {
      axios
        .post(
          props.isEdit === false
            ? "https://clubview-server.herokuapp.com/clubs/add"
            : "https://clubview-server.herokuapp.com/clubs/update/" +
                id +
                "/" +
                user.email,
          club
        )
        .then((res) => {
          history.push(`/clubs`);
          alert(res.data);
        })
        .catch((err) => console.log(err));
    }
    event.preventDefault();
  }

  function checkName() {
    const trimmed = club.cname.trim();
    if (trimmed.length === 0) {
      alert("Enter name");
    } else {
      axios
        .get("https://clubview-server.herokuapp.com/clubs/check/" + trimmed)
        .then((res) => {
          setChecked(res.data);
          if (res.data === true) {
            alert("Name is available.");
          } else {
            alert("Name is unavailable.");
          }
        });
    }
  }

  function inValidInputs() {
    let Amessage = "";

    if (!isSignedIn) {
      alert("Please sign in.");
      return true;
    }

    if (
      club.cname === "" ||
      club.lead === "" ||
      club.email === "" ||
      club.category === "" ||
      club.desc === ""
    ) {
      Amessage += "Please fill in all required slots. \n";
    }

    if (!club.isAlwaysOpen && (club.start === "" || club.start === "")) {
      Amessage += "Please enter recruitment information. \n";
    }

    if (!nameChecked) {
      Amessage += "Please check name availability. \n";
    }
    if (!club.isAlwaysOpen && moment(club.end).isBefore(club.start)) {
      Amessage += "Make sure End date is after Start date.";
    }
    if (Amessage === "") {
      return false;
    } else {
      alert(Amessage);
      return true;
    }
  }

  return (
    <>
      <section className="mb-4">
        <div className="row add-Area">
          <div className="container-fluid-add col-lg-5 col-md-12">
            <h4>Choose an emoji!</h4>
            <p>that best represents your club</p>
            <div className="content">{club.emoji}</div>
          </div>

          <Paper
            className="container-fluid-add col-lg-7 col-md-12 add-form"
            elevation="3"
          >
            <h4>Club Information</h4>
            <form>
              <div className="form-row">
                <div
                  className="form-group col-md-7"
                  style={{ textAlign: "left" }}
                >
                  <label for="cName_">Club Name*</label>
                  <div className="input-group">
                    <input
                      disabled={props.isEdit}
                      name="cname"
                      type="text"
                      placeholder="Club Name"
                      className="form-control"
                      id="cName_"
                      onChange={handleChange}
                      value={club.cname}
                      required
                    />
                    <div class="input-group-append">
                      <button
                        disabled={props.isEdit}
                        class="input-group-text"
                        type="button"
                        onClick={checkName}
                      >
                        Check
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="form-group col-md-5"
                  style={{ textAlign: "left" }}
                >
                  <label for="category">Club Category*</label>
                  <select
                    name="category"
                    placeholder="Category"
                    className="form-control"
                    id="category"
                    onChange={handleChange}
                    value={club.category}
                    required
                  >
                    <option> </option>
                    <option>Academic and Educational</option>
                    <option>Community Service</option>
                    <option>Media and Publication</option>
                    <option>Political or Multicultural</option>
                    <option>Recreation and Sports</option>
                    <option>Religious and Spiritual</option>
                    <option>Student Government</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div
                  className="form-group col-md-6"
                  style={{ textAlign: "left" }}
                >
                  <label for="cLead">Lead Name(s)*</label>
                  <input
                    name="lead"
                    type="text"
                    placeholder="Lead Names"
                    className="form-control"
                    id="cLead"
                    onChange={handleChange}
                    value={club.lead}
                    required
                  />
                </div>
                <div
                  className="form-group col-md-6"
                  style={{ textAlign: "left" }}
                >
                  <label for="email">Manager e-mail*</label>

                  <div className="input-group">
                    <input
                      name="email"
                      type="text"
                      placeholder="E-mail"
                      className="form-control"
                      id="email"
                      onChange={handleChange}
                      aria-describedby="emailHelp"
                      value={club.email}
                      required
                    />
                    <div class="input-group-append">
                      <span class="input-group-text" id="inputGroupPrepend2">
                        @cornell.edu
                      </span>
                    </div>
                  </div>
                  <small id="emailHelp" class="form-text text-muted">
                    Person logged in with this email will be able to edit/delete
                    club information.
                  </small>
                </div>
              </div>

              <div className="form-row">
                <div
                  className="form-group col-md-12"
                  style={{ textAlign: "left" }}
                >
                  <label for="clubDesc">Description of the Club*</label>
                  <textarea
                    className="form-control"
                    name="desc"
                    placeholder="Tell us what your club is all about"
                    id="clubDesc"
                    rows="3"
                    onChange={handleChange}
                    value={club.desc}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-row">
                <div
                  className="form-group col-md-11 col-sm-11 "
                  style={{ textAlign: "left" }}
                >
                  <label for="clubSite">Website/Social Media Link</label>
                  <input
                    name="site"
                    type="url"
                    placeholder="Link"
                    className="form-control"
                    id="clubSite"
                    onChange={handleChange}
                    value={club.site}
                  />
                </div>
                <div className="form-group col-md-1 col-sm-1">
                  <label for="emo">emoji:</label>

                  <input
                    name="emoji"
                    id="emo"
                    type="text"
                    className="input-styling form-control mx-auto"
                    onChange={handleChange}
                    value={club.emoji}
                    maxLength="3"
                    required
                  />
                </div>
              </div>

              <div className="form-row" style={{ paddingLeft: "5px" }}>
                <div className="form-group" style={{ textAlign: "left" }}>
                  <label for="RecruitmentPeriod">
                    Recruitment Period *
                    <div class="form-check form-check-inline ml-1">
                      <input
                        name="isAlwaysOpen"
                        class="form-check-input"
                        checked={club.isAlwaysOpen}
                        type="checkbox"
                        onChange={handleClick}
                        id="defaultCheck1"
                      />
                      <label class="form-check-label" for="defaultCheck1">
                        Always open
                      </label>
                    </div>
                  </label>

                  <div id="RecruitmentPeriod">
                    <div className="form-row">
                      <div className="form-group col-6">
                        <input
                          name="start"
                          className="form-control"
                          type="datetime-local"
                          id="startDate"
                          onChange={handleChange}
                          value={
                            club.start != null
                              ? club.start.substring(0, 16)
                              : ""
                          }
                          required={!club.isAlwaysOpen}
                          disabled={club.isAlwaysOpen}
                        />
                      </div>
                      <div className="form-group col-6">
                        <input
                          name="end"
                          className="form-control"
                          type="datetime-local"
                          placeholder="End Date"
                          id="endDate"
                          onChange={handleChange}
                          value={
                            club.end != null ? club.end.substring(0, 16) : ""
                          }
                          disabled={club.isAlwaysOpen}
                        />
                      </div>
                      <small>
                        if undecided, enter latest recruitment information
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={submitClub}
                className="btn btn-primary"
              >
                {props.isEdit ? "Update" : "Submit"}
              </button>
            </form>
          </Paper>
        </div>
      </section>
    </>
  );
}

export default AddArea;

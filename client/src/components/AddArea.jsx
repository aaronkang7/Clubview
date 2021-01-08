import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/Styles.css";




function AddArea(){

  const [club, setClub] = useState({
    cname: "",
    lead: "",
    email: "",
    category: "",
    desc: "",
    site: "",
    start: new Date(),
    end: new Date(),
    Imgfile: ""
  });


  function handleChange(event){
    let {name, value} = event.target;
    console.log("name: "+name+" value: "+value);
    if (name=="Imgfile"){
      value = URL.createObjectURL(event.target.files[0]);
      console.log(value);
    }
    setClub(prevClub => {
      console.log(prevClub);
      return {
        ...prevClub,
        [name]: value
      }
    });
  }

  function submitClub(event) {
    axios.post("http://localhost:5000/clubs/add",club)
      .then(res=>console.log(res.data))
      .catch(err=> console.log(err));

    setClub({
      cname: "",
      lead: "",
      email: "",
      category: "",
      desc: "",
      site: "",
      start: new Date(),
      end: new Date(),
      Imgfile: ""
    });
    event.preventDefault();

  }

  return (
    <section>
      <form className="needs-validation" noValidate>
        <div className="row add-Area">
          <div className="container-fluid-add col-lg-5 col-md-12">
            <h4>Upload Image</h4>
              <div className="my-4" style= {{height: "30%"}}>
                <img src={club.Imgfile} alt="hi" style= {{width: "100%", height:"100%", borderRadius:"3px"}} />
              </div>
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="clubPhoto" name="Imgfile" onChange={handleChange} />
              <label className="custom-file-label" for="clubPhoto">{club.Imgfile}</label>
              <div className="invalid-feedback">Example invalid custom file feedback</div>
            </div>
          </div>
         




          <div className="container-fluid-add col-lg-7 col-md-12">
            <h4>Club Information</h4>

            <div className="form-group row">
              <label for="cName_">Club Name*</label>
              <input name="cname" type="text" className="form-control" id="cName_" onChange ={handleChange} value={club.cname} required />
            </div>

            <div className="form-group row">
              <label for="cLead">Club Lead Name(s)*</label>
              <input name="lead" type="text" className="form-control" id="cLead" onChange ={handleChange} value={club.lead} required />
            </div>

            <div className="form-group row">
              <label for="email">Club Lead e-mail*</label>
              <div className="input-group">
                <input name="email" type="text" className="form-control" id="email" onChange ={handleChange} aria-describedby="emailHelp" value={club.email} required />
                <div className="input-group-append">
                  <span className="input-group-text" id="basic-addon2">@cornell.edu</span>
                </div>
              </div>
              <small id="emailHelp" className="form-text text-muted">A Sign-up confirmation e-mail will be sent to the lead.</small>
            </div>

            <div className="form-group row">
              <label for="category">Club Category*</label>
              <select name="category" className="form-control" id="category" onChange ={handleChange} value={club.category} required>
                <option>                        </option>
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
              <label for="clubDesc">Description of the Club</label>
              <textarea className="form-control" name="desc" id="clubDesc" rows="3" onChange ={handleChange} value={club.desc} required></textarea>
            </div>

            <div className="form-group row">
              <label for="clubSite">Website/Social Media Link</label>
              <input name="site" type="url" className="form-control" id="clubSite" onChange ={handleChange} value={club.site} required />
            </div>

            <div className="row">
              <label for="RecruitmentPeriod">Recruitment Period*</label>
              <div id="RecruitmentPeriod">
                <div className="row">
                  <div className="form-group col">
                    <div className="col-10">
                      <input name= "start" className="form-control" type="datetime-local" id="startDate" onChange ={handleChange} value={club.start} required />
                    </div>
                  </div>
                  <div className="form-group col">
                    <div className="col-10">
                      <input name= "end" className="form-control" type="datetime-local" placeholder="End Date" id="startDate" onChange ={handleChange} value={club.end} required />
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <button type="submit" onClick ={submitClub} className="btn btn-primary" style={{textAlign:"right"}}>Submit</button>

          </div>
        </div>
      </form>
    </section>
  )
}

export default AddArea;
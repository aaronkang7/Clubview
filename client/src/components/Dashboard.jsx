import React, {useState, useEffect} from "react";
import Club from "./Club";
import axios from "axios";
import "../styles/Styles.css";

function Dashboard(){

  function compareTime(startDate,dueDate){ 

     var ifrecriuting = (new Date(startDate).getTime() <= new Date().getTime()) && 
                         (new Date().getTime() <= new Date(dueDate).getTime());

    const diffTime = new Date(startDate).getTime() - new Date().getTime();
    const over = 0>(new Date(dueDate).getTime() - new Date().getTime());
    const diffHours = Math.round(diffTime / (1000 * 60 * 60)); 

    if (ifrecriuting){
      return (
        ["Applications open", "#93e4aa"]
      )
    } else if (0< diffHours && diffHours<=168){
      return(
        ["Opening soon (<7days)", "#f7f46f"]
      )
    } else if (over){
      const endString = startDate.slice(0,10);
      return(["Applications closed on: "+endString, "#f99487"])
    }
    else{
      const startString = startDate.slice(0,10);
      return(["Opening on: "+startString, "#d3d3d3"])
    }

  }

  const [clubs, setClubs] = useState([]);

  const fetchData = async ()=> {
    await axios.get("http://localhost:5000/clubs")
      .then(res =>setClubs(res.data))
      .catch(err => console.log(err));
  }

  useEffect(()=>{
    fetchData();
  }, [])

  const RowGroups = [];
            for (let i = 0; i < clubs.length; i = i + 3)
                RowGroups.push(clubs.slice(i, i + 3));

  function clubList(){
    return RowGroups.map((clubRow, index)=> {
      return (
        <div className="row">
          {clubRow.map(clubItem=>{
            return (
              <div className="col-lg-4 col-md-6 col-sm-12 card-styling col-xs">
                <Club
                  key = {clubItem._id}
                  id = {clubItem._id}
                  cname={clubItem.cname}
                  lead ={clubItem.lead}
                  email ={clubItem.email}
                  category = {clubItem.category}
                  desc ={clubItem.desc}
                  site ={clubItem.site}
                  recruit ={compareTime(clubItem.start,clubItem.end)}
                />
              </div>
            )
          })}
        </div>
    )
  })
  }

  

  return (
   <div>
      {clubList()}
    </div>
  )

}

export default Dashboard;
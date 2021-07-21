import React from "react";
import Club from "../Club/Club";
import Loading from "../animations/Loading/Loading";
import "./ClubsPage.css";

function ClubsPage({ clubs, loading, isFavFinder }) {
  if (loading) {
    return (
      <>
        <div className="page-container">
          <Loading />
        </div>
      </>
    );
  }
  return (
    <div className="dashboard">
      {clubs.map((clubItem) => {
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
            isFav={isFavFinder(clubItem)}
            isAlwaysOpen={clubItem.isAlwaysOpen}
            recruit={{ start: clubItem.start, end: clubItem.end }}
          />
        );
      })}
    </div>
  );
}

export default ClubsPage;

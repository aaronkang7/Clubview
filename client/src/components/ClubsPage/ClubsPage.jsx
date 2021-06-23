import React from "react";
import Club from "../Club/Club";

function ClubsPage({ clubs, loading, isFavFinder }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
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
            recruit={{ start: clubItem.start, end: clubItem.end }}
          />
        );
      })}
    </div>
  );
}

export default ClubsPage;

import React from "react";
import { Pagination } from "@material-ui/lab";
import "./pagination.css";

function PaginationTab({ clubsPerPage, totalClubs, paginate }) {
  return (
    <div className="pagination">
      <Pagination
        onChange={(event, page) => {
          paginate(page);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        count={Math.ceil(totalClubs / clubsPerPage)}
        color="secondary"
      />
    </div>
  );
}

export default PaginationTab;

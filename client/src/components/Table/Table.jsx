import React, { useContext, useState, useEffect } from "react";

function Table({ header, data, columns }) {
  return (
    <div className="table-responsive vert">
      <table className="table table-striped">
        <thead>
          <tr>
            {header.map((title) => {
              return <th scope="col">{title}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((prop) => {
            return (
              <tr>
                {columns.forEach((label) => {
                  return <td>{prop.label}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

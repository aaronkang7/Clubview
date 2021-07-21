import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <>
      <div class="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>LOADING</div>
    </>
  );
}

export default Loading;

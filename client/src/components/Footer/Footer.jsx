import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="page-footer font-small footer-custom">
      <div className="py-2 pr-4">
        Made with the 😿 (oh, and 💖) of
        <a href="https://github.com/aaronkang7">
          <b> Aaron</b>
        </a>{" "}
        <p>
          clubviewcontact@gmail.com |{" "}
          <Link to="/terms-of-service">Terms of Service</Link> |{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>{" "}
        </p>
      </div>
    </footer>
  );
}

export default Footer;

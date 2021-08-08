import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="page-footer font-small footer-custom">
      <div className="py-4 pr-4">
        <div>
          <div>
            <a href="https://forms.gle/SkroZDRrFcYC1JVHA">Give me Feedback!</a>
          </div>
          <div>
            Made with the 😿 (oh, and 💖) of
            <a href="https://github.com/aaronkang7">
              <b> Aaron</b>
            </a>{" "}
          </div>
          <div>
            clubviewcontact@gmail.com |{" "}
            <Link to="/terms-of-service">Terms of Service</Link> |{" "}
            <Link to="/privacy-policy">Privacy Policy</Link> |{" "}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

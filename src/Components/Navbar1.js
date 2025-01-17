import React from "react";
import { Link } from 'react-router-dom';
import "./First.css"; // Import CSS file for styling
import Picture1 from "./Picture1.png"; // Import your logo image


function Navbar() {

  return (
    <div>


      <nav className="navbar">
        <div className="logo1">
          <img src={Picture1} alt="Logo" />
        </div>
        {/* <div className="na">
        <h1>Scholar Hub</h1>
      </div> */}

        <ul>
          <li>
            <Link className="nav-link3" to="/fetchResearchPapers">
              Publications
            </Link>
          </li>
          <li>
            <Link className="nav-link3" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link2" to="/About">
              About
            </Link>
          </li>
          <li><Link className="nav-link1" to="/Login">Login</Link></li>
        </ul>
      </nav>


    </div>
  );
}

export default Navbar;

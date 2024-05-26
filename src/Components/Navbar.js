import React from "react";
import { Link } from 'react-router-dom';
import "./First.css"; // Import CSS file for styling
import Picture1 from "./Picture1.png"; // Import your logo image





function Navbar({ hideLogout }) {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src={Picture1} alt="Logo" />
        </div>
        {/* <div className="na">
        <h1>Scholar Hub</h1>
      </div> */}
        <div>
          {/* <h2>Welcome {localStorage.getItem('facultyName') ? localStorage.getItem('facultyName') : "User"}</h2> */}
          {/* <h2>Welcome User</h2> */}
          {/* <h1>{localStorage.getItem('email')}</h1> */}
        </div>
        <ul>
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
          {!hideLogout &&
            <li>
              <Link className="nav-link1" to="/">
                Logout
              </Link>
            </li>
          }
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

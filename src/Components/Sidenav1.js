import React from "react";
import { useNavigate } from "react-router-dom";
import "./First.css"; // Import CSS file for styling
import search from "./search.png";

function Sidenav() {
  const navigate = useNavigate(); // Import useNavigate from react-router-dom

  const handleAddProjectClick = () => {
    navigate("/Addproject");
  };

  return (
    <>
     <div class="sidenav">
    <div class="nav-section">
      <h2>DASHBOARD</h2>
      <a href="./Dashboard" class="active">
        <i class="icon-dashboard"></i>
        Dashboard
      </a>
    </div>
    <div class="nav-section">
      <h2>PAGES</h2>
      <a href="./First">
        <i class="icon-medicines"></i>
        Projects
      </a>
     
    </div>
  </div>

      {/* <div className="top">
        <div className="topnav">
          <input type="text" placeholder="Search.." />
          <img src={search} alt="Search" />
        </div>

        <div>
          <button className="button" onClick={handleAddProjectClick}>
            <span className="plus-icon">&#43;</span>
            Add a Project
          </button>
        </div>
      </div> */}
    </>
  );
}

export default Sidenav;

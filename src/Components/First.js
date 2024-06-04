import React from "react";
import "./First.css"; // Import CSS file for styling
import Table from "./Table";
import Sidenav from "./Sidenav";
import Navbar from "./Navbar";
import withAuth from './withAuth';

function First() {
  return (
    <div>

      {/* <h1 className="welcome-message">Welcome {localStorage.getItem('facultyName') ? localStorage.getItem('facultyName') : "User"}</h1> */}
      <Navbar></Navbar>

      <Sidenav></Sidenav>

      <Table />
    </div>
  );
}

// export default withAuth(First);
export default First;

import React from "react";
import "./First.css"; // Import CSS file for styling
import Table from "./Table";
import Sidenav from "./Sidenav";
import Navbar from "./Navbar";
import withAuth from './withAuth';

function First() {
  return (
    <div>
      <Navbar></Navbar>

      <Sidenav></Sidenav>

      <Table />
    </div>
  );
}

export default withAuth(First);

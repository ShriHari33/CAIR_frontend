import React from 'react';
import Sidenav from "./Sidenav";
import Navbar from "./Navbar";
import BarChart from "./BarChart"; // Import the BarChart component



const Dashboard = () => {
    return (
        <>
        <Navbar></Navbar>

        <Sidenav></Sidenav>
        <div className="container1">
            {/* <div className="top-cards">
                <div className="card out-of-stock">
                    <p className="title">Out of stock products</p>
                    <p className="value">5</p>
                </div>
                <div className="card low-stock">
                    <p className="title">Products on low stock</p>
                    <p className="value">8</p>
                </div>
                <div className="card to-arrive">
                    <p className="title">Products to be arrived</p>
                    <p className="value">10</p>
                </div>
            </div> */}
       
            <div className="content">
        <BarChart />
        
       </div>
        </div>
        </>
    );
}

export default Dashboard;




// import React from "react";
// import "./First.css"; // Import CSS file for styling
// import Table from "./Table";
// import Sidenav from "./Sidenav";
// import Navbar from "./Navbar";
// import BarChart from "./BarChart"; // Import the BarChart component

// function First() {
//   return (
//     <div>
//       <Navbar></Navbar>
//       <Sidenav></Sidenav>
//       <div className="content">
//         <BarChart />
        
//       </div>
//     </div>
//   );
// }

// export default First;

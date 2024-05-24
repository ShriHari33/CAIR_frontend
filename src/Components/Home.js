import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling
import logo1 from '../logo1.jpg'; // Import your logo image
import Navbar1 from "./Navbar1";
import photo from './photo.avif'; // Import your logo image


function Home() {
  return (
    <>
  
    <div className='body'>
       
      <Navbar1></Navbar1>
      

      <div className="home-container">
        <div className="background-image"></div>
        <div className="content"></div>
      </div>

      <div className="home">
        <div className="k1">
          <h2>CAIR</h2>
        </div>
        <div className="k2">
          <h3>Scholar Hub</h3>
        </div>

        <div className="k3">
          {/* <p>Unleashing the transformative power of tomorrow's technology through collaborative research in AI, HPC, Cloud, and Data Science.</p> */}
          <p>Upload it, Review it, Submit</p>
        </div>
      

      <div className="k4">
        <Link to="/Signin">Get Started</Link>
      </div>

      </div>

      <div className='photo'>
        <img src={photo} alt="" />
      </div>

    </div>

    </>
  );
}

export default Home;

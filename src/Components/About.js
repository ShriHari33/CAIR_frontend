import React from 'react';
import './Home.css'; 
import Navbar1 from "./Navbar1";
import photo from './photo.avif'; // Import your logo image


function About() {
  return (
    <div>
       <div className='body'>
     
      <Navbar1></Navbar1>

          <p class="a1">KLE Tech's Center for AI Research is a research lab that includes sections dedicated to High-Performance Computing (HPC), Cloud Computing, AI/ML and Data Science. Students have the opportunity to work on projects related to various domains within these fields. The lab provides highly systemized computers and servers to support the research activities of the students and researchers.</p>
      
          <div className='photo2'>
        <img src={photo} alt="" />
      </div>
    </div>
    </div>
  );
}

export default About;

  
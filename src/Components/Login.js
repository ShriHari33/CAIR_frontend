// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import logo1 from '../logo1.jpg';
// import './Login.css'; 
// import './Home.css'; 

// const Login = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Validate form inputs
//     if (!validateForm()) {
//       return;
//     }

//     // If validation passes, proceed with login logic
//     const user = { name, email, password };
//     localStorage.setItem("user", JSON.stringify(user));
//     toast.success("Login successful");
//     navigate("/First"); // Redirect to home page after login
//   };

//   const validateForm = () => {
//     let isValid = true;



//     if (email.length === 0 || email.length > 30) {
//       alert("Please enter a valid email address (up to 30 characters).");
//       isValid = false;
//     }

//     if (password.length < 8) {
//       alert("Password should be at least 8 characters long.");
//       isValid = false;
//     }



//     return isValid;
//   };

//   return (
//     <div className="body">
//       <div className="na">
//         <h1>Scholar Hub</h1>
//       </div>

//       <nav className="navbar">
//         <div className="logo">
//           <img src={logo1} alt="Logo" />
//         </div>
//         <ul>
//           <li><Link className="nav-link" to="/">Home</Link></li>
//           <li><Link className="nav-link" to="/About">About</Link></li>
//         </ul>
//       </nav>

//       <div className="contact1">
//         <b className="ash">Login</b>
//         <form onSubmit={handleLogin}>


//           <div className="contact">
//             <label htmlFor="email">Email</label>
//             <input type="email" placeholder=" " id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/><br></br>
//           </div>

//           <div className="contact">
//             <label htmlFor="password">Password</label>
//             <input type="password" placeholder=" " id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/><br></br>
//           </div>


//           <button type="submit" className="kavya">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios';
import './Login.css';
import './Home.css';
import photo from './photo.avif'; // Import your logo image


import Navbar from "./Navbar";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8084/api/v1/cair/getAll");
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Find user by email
    const user = users.find(user => user.email === email);

    if (!user) {
      alert("User not found. Please create an account.");
      return;
    }

    // Check password
    if (user.password !== password) {
      alert("Incorrect password.");
      return;
    }

    // Login successful
    toast.success("Login successful");
    // Save email to local storage
    localStorage.setItem("email", email);
    localStorage.setItem("facultyName", user.name);

    // const response = axios.get("http://localhost:8084/api/v1/cair/faculty/${email}");

    // if (response.data.role === "admin") {
    //   navigate("/First");
    // }

    // localStorage.setItem("facultyName", response.data);

    navigate("/First");
  };

  return (
    <div className="body1">
      <Navbar></Navbar>
      <div className="n1">
        <div className="contact1">
          <b className="ash">Login</b>
          <form onSubmit={handleLogin}>
            <div className="contact">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder=" " id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="contact">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder=" " id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" className="kavya">Login</button>

            <p>Don't have an account? <Link to="/Signin">Sign Up</Link></p>
          </form>
        </div>


        {/* <div className='photo1'>
        <img src={photo} alt="" />
      </div> */}
      </div>
    </div>
  );
};

export default Login;
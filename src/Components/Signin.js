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
//   const [confirmPassword, setConfirmPassword] = useState("");

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

//     if (name.length < 5 || !/^[A-Za-z ]+$/.test(name)) {
//       alert("Name should be at least 5 characters long and contain only letters.");
//       isValid = false;
//     }

//     if (email.length === 0 || email.length > 30) {
//       alert("Please enter a valid email address (up to 30 characters).");
//       isValid = false;
//     }

//     if (password.length < 8) {
//       alert("Password should be at least 8 characters long.");
//       isValid = false;
//     }

//     if (password !== confirmPassword) {
//       alert("Passwords do not match.");
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
//           {/* <li><Link className="nav-link1" to="/Login">Login</Link></li> */}
//         </ul>
//       </nav>

//       <div className="contact2">
//         <b className="ash">Sign in</b>
//         <form onSubmit={handleLogin}>
//           <div className="contact">
//             <label htmlFor="name">Name</label>
//             <input type="text" placeholder=" " id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required/><br></br>
//           </div>

//           <div className="contact">
//             <label htmlFor="email">Email</label>
//             <input type="email" placeholder=" " id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/><br></br>
//           </div>

//           <div className="contact">
//             <label htmlFor="password">Password</label>
//             <input type="password" placeholder=" " id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/><br></br>
//           </div>

//           <div className="contact">
//             <label htmlFor="confirmPassword">Confirm password</label>
//             <input type="password" placeholder=" " id="pass1" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/><br></br>
//           </div>

//           <button type="submit" className="kavya1">Sign in</button>
//         </form>
//       </div>
//       <p className="acc">Already have an account? <span>Log in</span></p>
//     </div>
//   );
// };

// export default Login;






import React  from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios';
import {useEffect, useState } from "react";
import './Login.css'; 
import './Home.css'; 
import Navbar from "./Navbar";
import photo from './photo.avif'; // Import your logo image


const Signin = () => {
  const navigate = useNavigate();
  const [cairid, setId] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cair, setUsers] = useState([]);


  useEffect(() => {
    (async () => await Load())();
    }, []);

    async function  Load()
    {
       const result = await axios.get(
           "http://localhost:8084/api/v1/cair/getAll");
           setUsers(result.data);
           console.log(result.data);
    }

    async function save(event)
    {
        event.preventDefault();
    try
        {
        const response= await axios.post("http://localhost:8084/api/v1/cair/save",
        {
            name: name,
            email:email,
            password:password,
            confirmPassword:confirmPassword
          
        });

        const isNewUser = response.data.isNewUser;
        if (!isNewUser) {
          // If it's an existing user, update localStorage with the email
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          localStorage.setItem("confirmPassword", confirmPassword);
        }

        if (!validateForm()) {
          return;
        }
                
          alert("User Registation Successfully");
          navigate("/First");
          setId("");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          Load();
        }
    catch(err)
        {
          alert("User Registation Failed");
        }
   }


  const validateForm = () => {
    let isValid = true;

    if (name.length < 5 || !/^[A-Za-z ]+$/.test(name)) {
      alert("Name should be at least 5 characters long and contain only letters.");
      isValid = false;
    }

    if (email.length === 0 || email.length > 30) {
      alert("Please enter a valid email address (up to 30 characters).");
      isValid = false;
    }

    if (password.length < 8) {
      alert("Password should be at least 8 characters long.");
      isValid = false;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className="body1">
        <Navbar></Navbar>

    <div className="n1">

      <div className="contact2">
        <b className="ash">Sign in</b>
        <form >
          <div className="contact">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder=" " id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required/>
          </div>

          <div className="contact">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder=" " id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>

          <div className="contact">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder=" " id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>

          <div className="contact">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input type="password" placeholder=" " id="pass1" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
          </div>

          <button type="submit" className="kavya1" onClick={save}>Sign in</button>


          <ub className="f1">Already have an account? <Link to="/Login" className="account">Login</Link></ub>
        </form>
      </div>

      {/* <div className='photo1'>
        <img src={photo} alt="" />
      </div> */}
    </div>

   
    </div>
  );
};

export default Signin;

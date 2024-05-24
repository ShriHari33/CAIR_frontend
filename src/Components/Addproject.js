
import React, { useState, useEffect } from "react";
import "./First.css";
import "./Home.css";
import Sidenav from "./Sidenav";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import search from "./search.png";


function Addproject() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [projects, setProjects] = useState([]); // Initialize as an empty array
  const [projectType, setProjectType] = useState("");
  const [pname, setPname] = useState("");
  const [year, setYear] = useState("");
  const [domain, setDomain] = useState("");
  const [usn, setUsn] = useState("");
  const [sname, setSname] = useState("");
  const [mobile, setMobile] = useState("");
  const [semail, setSemail] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");


  useEffect(() => {
    loadCairData();
  }, []);

  const loadCairData = async () => {
    try {
      const email= localStorage.getItem("email");

      // const response = await axios.get("http://localhost:8084/api/v1/cair/getAll");
      const response = await axios.get(`http://localhost:8084/api/v1/cair/details/${email}`);

      console.log("Fetched Projects:", response.data.projects);
      if (response.data.projects !== undefined) {
        setProjects(response.data.projects);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching Cair data:", error);
    }
  };

  const save = async (event) => {
    event.preventDefault();

    try {
      const newProject = {
        selectedSemester,
        projectType,
        pname,
        year,
        domain,
        students: [...students],
      };

      // Create a new array with the existing projects along with the new project
      // const updatedProjects = [...projects, newProject];

      // const response = await axios.post("http://localhost:8084/api/v1/cair/save", {
      //   name: localStorage.getItem("name"),
      //   email: localStorage.getItem("email"),
      //   password: localStorage.getItem("password"),
      //   confirmPassword: localStorage.getItem("confirmPassword"),
      //   projects: [newProject, ...projects]
      // });

      // Set the state with the new array of projects
      // setProjects([ newProject,...projects]);


       // Update projects array in state by appending the new project
    setProjects([...projects, newProject]);

    // Save projects array to the backend
      const response = await axios.post("http://localhost:8084/api/v1/cair/save", {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
      confirmPassword: localStorage.getItem("confirmPassword"),
      projects: [...projects, newProject] // Send the updated projects array to the backend
    });

      // console.log("Updated Projects:", updatedProjects);
      console.log(response.data);

      alert("Project added successfully!");

      navigate("/First");

      // Clear form inputs and state after successful submission
      setProjectType("");
      setPname("");
      setYear("");
      setDomain("");
      setUsn("");
      setSname("");
      setMobile("");
      setSemail("");
      setStudents([]);
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project. Please try again.");
    }
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const handleAddStudent = () => {
    if (usn.trim() === "" || sname.trim() === "" || mobile.trim() === "" || semail.trim() === "") {
      alert("Please fill in all student details");
      return;
    }

    const newStudent = { usn, sname, mobile, semail };

    // Update students array with the new student using the spread operator
    setStudents([...students, newStudent]);

    // Clear student form inputs
    setUsn("");
    setSname("");
    setMobile("");
    setSemail("");
  };

  const handleAddProjectClick = () => {
    navigate("/Addproject");
  };

  
  return (
    <div>
      <Navbar></Navbar>

      <Sidenav></Sidenav>

      <div className="top">
        {/* <div className="topnav1">
          <input type="text" placeholder="Search.." />
          <img src={search} alt="Search" />
        </div> */}

        <div>
          <button className="button1" onClick={handleAddProjectClick}>
            <span className="plus-icon">&#43;</span>
            Add a Project
          </button>
        </div>
      </div>

      <div className="box">
        <div className="custom-select">
          <h3>Choose Semester</h3>
          <div className="select-wrapper">
            <select value={selectedSemester} onChange={handleSemesterChange}>
              <option value="0">Select Semester</option>
              <option id="odd" name="odd" value="odd">Odd</option>
              <option id="even" name="even" value="even" >Even</option>
            </select>
          </div>
        </div>

        {selectedSemester === "odd" && (
          <>
            <div className="custom-select">
              <h3>Project Type</h3>
              <div className="select-wrapper">
                <select value={projectType} onChange={(e) => setProjectType(e.target.value)} required>
                  <option >Select Project</option>
                  <option id="odd1" name="odd1" value="odd1" >Project 1 (Odd)</option>
                  <option id="odd2" name="odd2" value="odd2" >Project 2 (Odd)</option>
                </select>
              </div>
            </div>
            <div className="project">
              <h3>Project Title</h3>
              <input type="text" name="pname" id="pname" value={pname} placeholder="Project Title" onChange={(e) => setPname(e.target.value)} required/>
            </div>

            <div className="project">
              <h3>Year</h3>
              <input type="number" name="year" id="year" value={year} placeholder="Year" onChange={(e) => setYear(e.target.value)} required/>
            </div>
            <div className="custom-select">
              <h3>Domain</h3>
              <div className="select-wrapper">
                <select value={domain} onChange={(e) => setDomain(e.target.value)} required>
                  <option >Select Domain</option>
                  <option id="AI/ML" name="AI/ML" value="AI/ML" >AI/ML</option>
                  <option id="Cloud" name="Cloud" value="Cloud" >Cloud</option>
                  <option id="HPC" name="HPC" value="HPC" >HPC</option>
                  {/* Add more even semester projects as needed */}
                </select>
              </div>
            </div>

            <div className="custom-select">
              <h3>Student Details</h3>
            </div>

            {students.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>USN</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.usn}</td>
                      <td>{student.sname}</td>
                      <td>{student.mobile}</td>
                      <td>{student.semail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="student-details">
              <input
                id="usn"
                name="usn"
                type="text"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
                placeholder="USN"
              />
              <input
                type="text"
                name="sname"
                id="sname"
                value={sname}
                onChange={(e) => setSname(e.target.value)}
                placeholder="Name"
              />
              <input
                type="text"
                name="mobile"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
              />
              <input
                type="email"
                id="semail"
                name="semail"
                value={semail}
                onChange={(e) => setSemail(e.target.value)}
                placeholder="Email ID"
              />
            </div>
            <button onClick={handleAddStudent} className="b3">
              Add New Student
            </button>

            <div className="but">
              <button type="button" className="b1">
                Cancel
              </button>
              <button type="button" className="b2" onClick={save}>
                Add Project
              </button>
            </div>
          </>
        )}

{selectedSemester === "even" && (
          <>
            <div className="custom-select">
              <h3>Project Type</h3>
              <div className="select-wrapper">
                <select value={projectType} onChange={(e) => setProjectType(e.target.value)} required>
                  <option value="0">Select Project</option>
                  <option id="even1" name="even1" value="even1" >Project 1 (Even)</option>
                  <option id="even2" name="even2" value="even2" >Project 2 (Even)</option>
                </select>
              </div>
            </div>
            <div className="project">
              <h3>Project Title</h3>
              <input type="text" name="pname" id="pname" value={pname} placeholder="Project Title" onChange={(e) => setPname(e.target.value)} required/>
            </div>

            <div className="project">
              <h3>Year</h3>
              <input type="number" name="year" id="year" value={year} placeholder="Year" onChange={(e) => setYear(e.target.value)} required/>
            </div>
            <div className="custom-select">
              <h3>Domain</h3>
              <div className="select-wrapper">
                <select value={domain} onChange={(e) => setDomain(e.target.value)} required>
                  <option value="a">Select Domain</option>
                  <option id="AI/ML" name="AI/ML" value="AI/ML" >AI/ML</option>
                  <option id="Cloud" name="Cloud" value="Cloud" >Cloud</option>
                  <option id="HPC" name="HPC" value="HPC" >HPC</option>
                  {/* Add more even semester projects as needed */}
                </select>
              </div>
            </div>

            <div className="custom-select">
              <h3>Student Details</h3>
            </div>

            {students.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>USN</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.usn}</td>
                      <td>{student.sname}</td>
                      <td>{student.mobile}</td>
                      <td>{student.semail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="student-details">
              <input
                id="usn"
                name="usn"
                type="text"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
                placeholder="USN"
              />
              <input
                type="text"
                name="sname"
                id="sname"
                value={sname}
                onChange={(e) => setSname(e.target.value)}
                placeholder="Name"
              />
              <input
                type="text"
                name="mobile"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
              />
              <input
                type="email"
                id="semail"
                name="semail"
                value={semail}
                onChange={(e) => setSemail(e.target.value)}
                placeholder="Email ID"
              />
            </div>
            <button onClick={handleAddStudent} className="b3">
              Add New Student
            </button>

            <div className="but">
              <button type="button" className="b1">
                Cancel
              </button>
              <button type="button" className="b2" onClick={save}>
                Add Project
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Addproject;





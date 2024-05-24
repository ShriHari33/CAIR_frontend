


import React, { useState, useEffect } from "react";
import "./First.css";
import "./Home.css";
import Sidenav1 from "./Sidenav1";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Edit() {
  const { cairId, projectIndex } = useParams(); // Retrieve cairId and projectIndex from URL
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
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
    // Fetch project details when component mounts
    loadProjectData(cairId, projectIndex);
  }, [cairId, projectIndex]); // Update when cairId or projectIndex changes

  const loadProjectData = async (cairId, projectIndex) => {

    try {
      const response = await axios.get(`http://localhost:8084/api/v1/cair/${cairId}/projects/${projectIndex}`);
      console.log("Fetched Project:", response.data);
      console.log("cairId:", cairId);
      console.log("projectIndex:", projectIndex);
      if (response.data) {
        const { selectedSemester, projectType, pname, year, domain, students } = response.data;
        setSelectedSemester(selectedSemester);
        setProjectType(projectType);
        setPname(pname);
        setYear(year);
        setDomain(domain);
        setStudents(students);
        console.log("type: ",projectType);
      }
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  const updateProject = async () => {
    try {
      const updatedProject = {
        selectedSemester,
        projectType,
        pname,
        year,
        domain,
        students,
      };

      const response = await axios.put(`http://localhost:8084/api/v1/cair/${cairId}/projects/${projectIndex}`, updatedProject);

      console.log(response.data);
      alert("Project updated successfully!");
      navigate("/First");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project. Please try again.");
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

  return (
    <div>
      <Navbar />
      <Sidenav1 />
      <div className="box1">
        <div className="custom-select">
          <h3>Choose Semester</h3>
          <div className="select-wrapper">
            <select value={selectedSemester} onChange={handleSemesterChange}>
              <option value="0">Select Semester</option>
              <option id="odd" name="odd" value="odd">Odd</option>
              <option id="even" name="even" value="even">Even</option>
            </select>
          </div>
        </div>

        <div className="custom-select">
          <h3>Project Type</h3>
          <div className="select-wrapper">
            <select value={projectType} onChange={(e) => setProjectType(e.target.value)} required>
              <option>Select Project</option>
              {/* <option id="odd1" name="odd1" value="odd1">Project 1 (Odd)</option>
              <option id="odd2" name="odd2" value="odd2">Project 2 (Odd)</option>
              <option id="even1" name="even1" value="even1">Project 1 (even)</option>
              <option id="even2" name="even2" value="even2">Project 2 (even)</option> */}
              {selectedSemester === "odd" ? (
                <>
                  <option id="odd1" name="odd1" value="odd1">Project 1 (Odd)</option>
                  <option id="odd2" name="odd2" value="odd2">Project 2 (Odd)</option>
                </>
              ) : (
                <>
                  <option id="even1" name="even1" value="even1">Project 1 (Even)</option>
                  <option id="even2" name="even2" value="even2">Project 2 (Even)</option>
                </>
              )}
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
              <option>Select Domain</option>
              <option id="AI/ML" name="AI/ML" value="AI/ML">AI/ML</option>
              <option id="Cloud" name="Cloud" value="Cloud">Cloud</option>
              <option id="HPC" name="HPC" value="HPC">HPC</option>
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
          <button type="button" className="b2" onClick={updateProject}>
            Update Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;

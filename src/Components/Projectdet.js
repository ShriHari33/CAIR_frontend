import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidenav from "./Sidenav";
import Navbar from "./Navbar";
import "./projectdet.css";
import adddoc from "./adddoc.png";
import "./First.css";
import download from "./download.png";
import delete11 from "./delete11.png";

const ProjectDetails = () => {
  const { cairId, projectIndex } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchProjectDetails();
  }, [cairId, projectIndex]);

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8084/api/v1/cair/${cairId}/projects/${projectIndex}`
      );
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const handleFileDelete = async (fileName) => {
    try {
      await axios.delete(
        `http://localhost:8084/api/v1/cair/${cairId}/projects/${projectIndex}/file/${fileName}`
      );
      fetchProjectDetails(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Sidenav />
      <div className="body2">
        <div className="project-details-box">
          <h1 className="title">Project Details</h1>
          <p className="project-info">Title: {project.pname}</p>
          <p className="project-info">Type: {project.projectType}</p>
          <p className="project-info">Year: {project.year}</p>
          <p className="project-info">Domain: {project.domain}</p>

          <div className="student-details-box">
            <h2 className="subtitle">Student Information</h2>
            <table className="student-table">
              <thead>
                <tr>
                  <th>USN</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {project.students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.usn}</td>
                    <td>{student.sname}</td>
                    <td>{student.semail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="subtitle">
                Files{" "}
                <Link to={`/Adddoc/${cairId}/projects/${projectIndex}`} title="Upload Files" >
                  <img src={adddoc} alt="Adddoc" className="icon1" />
                </Link>
              </h2>
          {project.file && (
            <div className="files-box">
              {/* <h2 className="subtitle">
                Files{" "}
                <Link to={`/Adddoc/${cairId}/projects/${projectIndex}`}>
                  <img src={adddoc} alt="Adddoc" className="icon1" />
                </Link>
              </h2> */}
              <table className="file-table">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {project.file.map((file, fileIndex) => (
                    <tr key={fileIndex} className="file-item">
                      <td>
                        <a
                          href={`http://localhost:8084/api/v1/cair/${cairId}/projects/${projectIndex}/file/${file.fileName}`} title="View file" 
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.fileName}
                        </a>
                      </td>
                      <td className="actions-column">
                        <img
                          src={delete11}
                          alt="Delete file"
                          className="icon"
                          onClick={() => handleFileDelete(file.fileName)}
                          title="Delete" 
                        />
                        <a
                          href={`http://localhost:8084/api/v1/cair/${cairId}/projects/${projectIndex}/file/${file.fileName}/download`}
                          title="Download file" 
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={download}
                            alt="Download"
                            className="icon"
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;

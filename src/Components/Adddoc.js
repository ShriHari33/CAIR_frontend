import React, { useState, useEffect, useRef } from "react";
import "./First.css";
import "./Home.css";
import Sidenav1 from "./Sidenav1";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams, Navigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";


function Edit() {
  const navigate = useNavigate();
  const { cairId, projectIndex } = useParams(); // Get cairId and projectIndex from URL params
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name); // Set the file name
  };
  const handleBrowseClick = () => {
    inputRef.current.click(); // Trigger click on the input element
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("files", file); // Ensure that 'files' matches the parameter name expected by the backend
    try {
      const response = await axios.post(
        `http://localhost:8084/api/v1/cair/${cairId}/projects/${projectIndex}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Uploaded Successfully");
      navigate(`/cairdet/${cairId}/projects/${projectIndex}`);
      // Optionally, you can navigate to another page or display a success message here
    } catch (error) {
      console.error("Error uploading file:", error);
      // Optionally, you can display an error message to the user here
    }
  };
  return (
    <div>
      <Navbar />
      <Sidenav1 />

      <form onSubmit={handleSubmit}>
      
        <div className="drag-area">
          <div className="icon">
            <i className="fas fa-cloud-upload-alt"></i>
          </div>
          <header>Drag & Drop to Upload File</header>
          <span className="files">OR</span>
          <button className="files2" onClick={handleBrowseClick}>
            Browse File
          </button>
          <input
            ref={inputRef}
            className="files"
            type="file"
            onChange={handleFileChange}
            hidden
          />
          <button className="files3" type="submit" >
            Upload File
          </button>
        </div>
        {fileName && (
          <div className="selected-file">Selected File: {fileName}</div>
        )}
      </form>
    </div>
  );
}

export default Edit;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import edit from "./edit.png";
import adddoc from './adddoc.png';
import delete1 from './delete1.png';
import axios from 'axios';
import search from "./search.png";
import { useNavigate } from "react-router-dom";

const Table = () => {
    const [cairs, setCairs] = useState([]); // Initialize to an empty array
    const navigate = useNavigate(); // Import useNavigate from react-router-dom
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        fetchCairDetails();
    }, []); // Ensure this effect runs only once on component mount

    const fetchCairDetails = async () => {
        try {
            const userEmail = localStorage.getItem('email');
            const response = await axios.get(`http://localhost:8084/api/v1/cair/details/${userEmail}`);
            // Assuming response.data is an object that includes a projects array
            if (response.data && response.data.projects) {
                // Filter projects where published is true
                const filteredProjects = response.data.projects.filter(project => project.published === true);
                // Set the cairs state with an object that includes the filtered projects array
                setCairs([{ ...response.data, projects: filteredProjects }]);
            } else {
                // Handle case where there are no projects or data is not in expected format
                setCairs([]);
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching Cair details:', error);
        }
    };

    const handleDelete = async (cairId, projectIndex) => {
        const confirmDelete = window.confirm('Do you want to delete this project?');
        if (!confirmDelete) {
            return; // If the user cancels, do nothing
        }

        try {
            const response = await fetch(`http://localhost:8084/api/v1/cair/${cairId}/projects/${projectIndex}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                // Refresh data or update state after successful deletion
                fetchCairDetails();
            } else {
                // Handle error response
                console.error('Failed to delete project:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleAddProjectClick = () => {
        navigate("/Addproject");
    };

    return (
        <div className="table-container">
            <div className="top">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by project name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div>
                    <h1 style={{ margin: -40, marginTop: '-5%', marginLeft: '-50%' }}>Welcome {localStorage.getItem('facultyName') ? localStorage.getItem('facultyName') + "!" : "User!"}</h1>
                </div>

                <div>
                    <button className="button" onClick={handleAddProjectClick}>
                        <span className="plus-icon">&#43;</span>
                        Add a Project
                    </button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        <th>Project Title</th>
                        <th>
                            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                                <option value="">All Types</option>
                                <option value="miniProj">Mini Project</option>
                                <option value="REU">REU</option>
                                <option value="SDP">SDP</option>
                                <option value="minorProject1">Minor Project 1</option>
                                <option value="minorProject2">Minor Project 2</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </th>
                        <th className='t3'>
                            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                                <option value="">All Years</option>
                                <option value="2020">2019-2020</option>
                                <option value="2021">2020-2021</option>
                                <option value="2022">2021-2022</option>
                                <option value="2023">2022-2023</option>
                                <option value="2024">2023-2024</option>
                            </select>
                        </th>
                        <select value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)}>
                            <option value="">All Domains</option>
                            <option value="AI/ML">AI/ML</option>
                            <option value="Cloud">Cloud</option>
                            <option value="HPC">HPC</option>
                            <option value="DataScience">Data Science</option>
                            <option value="ISHA">ISHA</option>
                        </select>
                        <th className='t1'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cairs.map((cair, index) => (
                        cair.projects ? cair.projects.map((project, projectIndex) => {
                            const slNo = index * cairs.length + projectIndex + 1;
                            if (
                                (selectedYear === '' || project.year === selectedYear) &&
                                (selectedDomain === '' || project.domain === selectedDomain) &&
                                (selectedType === '' || project.projectType === selectedType) &&
                                (searchTerm === '' || (project.pname && project.pname.toLowerCase().includes(searchTerm.toLowerCase())))
                            ) {
                                return (
                                    <tr key={`${index}-${projectIndex}`}>
                                        <td>{slNo}</td>
                                        <td><Link to={`/cairdet/${cair._id}/projects/${projectIndex}`} title="View Project Details">
                                            {project.pname}
                                        </Link></td>
                                        <td>{project.projectType}</td>
                                        <td className='t3'>{project.year}</td>
                                        <td className='t3'>{project.domain}</td>
                                        <td>
                                            <div className='t4'>
                                                <Link to={`/cair/${cair._id}/projects/${projectIndex}`} title="Edit">
                                                    <img src={edit} alt="Edit" className="edit-icon" />
                                                </Link>
                                                <img src={delete1} alt="Delete" className="edit-icon2" onClick={() => handleDelete(cair._id, projectIndex)} style={{ cursor: 'pointer' }} title="Delete" />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            } else {
                                return null;
                            }
                        }) : null
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Sidenav from './Sidenav1';


const publishProject = async (cairId, projectId, updateCairsState) => {

    if (projectId === undefined || isNaN(projectId)) {
        alert('Invalid project ID.');
        console.log('project ID: ', projectId + '\ncair_ID: ', cairId);
        return;
    }

    try {
        const response = await axios.post(`http://localhost:8084/api/v1/cair/publish/${cairId}/${projectId}`);
        if (response.status === 200) {
            alert('Project published successfully!');
            updateCairsState(cairId, projectId); // Update the state to reflect changes
        } else {
            alert('Failed to publish the project.');
        }
    } catch (error) {
        console.error('Error publishing project:', error);
        alert('An error occurred while publishing the project.');
    }
};



const Publish = () => {
    const [cairs, setCairs] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState("");


    const updateCairsState = (cairId, projectId) => {
        const updatedCairs = cairs.map(cair => {
            if (cair._id === cairId) {
                return {
                    ...cair,
                    projects: cair.projects.map((project, index) => {
                        if (index === projectId) {
                            return { ...project, published: true };
                        }
                        return project;
                    }),
                };
            }
            return cair;
        });
        setCairs(updatedCairs);
    };


    useEffect(() => {
        const fetchCairDetails = async () => {
            try {
                const userEmail = localStorage.getItem('email');
                const response = await axios.get(`http://localhost:8084/api/v1/cair/details/${userEmail}`);
                setCairs([response.data]);
            } catch (error) {
                console.error('Error fetching Cair details:', error);
            }
        };

        fetchCairDetails();
    }, []);

    return (
        <>

            <Navbar />

            <Sidenav></Sidenav>

            <div className="table-container" style={{ marginLeft: '250px', marginTop: '150px' }}>
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by project name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <table>
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>Project Title</th>
                            <th>Project Type</th>
                            <th>Year</th>
                            <th>Domain</th>
                            <th>Publish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cairs.map((cair, index) =>
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
                                            <td>{project.year}</td>
                                            <td>{project.domain}</td>
                                            <td>
                                                {!project.published ? (
                                                    <button onClick={() => publishProject(cair._id, projectIndex, updateCairsState)}>Publish</button>
                                                ) : (
                                                    <span>Published</span>
                                                )}
                                            </td> {/* New cell for the publish button or status */}
                                        </tr>
                                    );
                                } else {
                                    return null;
                                }
                            }) : null
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Publish;
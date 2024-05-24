import React, { useState, useEffect } from 'react';
import './ResearchPapersComponent.css';
import Navbar from './Navbar';

function ResearchPapersComponent() {
    const [researchPapers, setResearchPapers] = useState([]);

    useEffect(() => {
        fetchResearchPapers();
    }, []);

    async function fetchResearchPapers() {
        try {
            const response = await fetch('http://localhost:8084/api/v1/cair/getAll');
            if (response.ok) {
                const papers = await response.json();
                setResearchPapers(papers);
            } else {
                console.error('Failed to fetch research papers');
            }
        } catch (error) {
            console.error('An error occurred while fetching research papers:', error);
        }
    }

    console.log(researchPapers)
    return (
        <>
            <Navbar hideLogout={true}></Navbar>
            <table className="research-table">
                <thead>
                    <tr>
                        <th>Sl. no</th>
                        <th>Project Name</th>
                        <th>Year</th>
                        <th>Domain</th>
                        <th>Students</th>
                        <th>Faculty Name</th>
                    </tr>
                </thead>
                <tbody>
                    {researchPapers && researchPapers.flatMap(paper =>
                        paper.projects && paper.projects.map((project, index) => (
                            <tr key={`${paper.name}-${project.pname}`}>
                                <td class="sl-no">{index + 1}</td>
                                <td className="project-name">
                                    {project.file && project.file[0] && project.file[0].fileName ?
                                        <a href={`http://localhost:8084/api/v1/cair/${paper._id}/projects/${index}/file/${project.file[0].fileName}`} download>{project.pname}</a>
                                        :
                                        project.pname
                                    }
                                </td>
                                <td>{project.year}</td>
                                <td>{project.domain}</td>
                                <td>
                                    {project.students && project.students.map(student =>
                                        student.sname.charAt(0).toUpperCase() + student.sname.slice(1)
                                    ).join(", ")}
                                </td>
                                <td className="faculty-name">{paper.name}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}

export default ResearchPapersComponent;
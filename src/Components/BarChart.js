import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectData();
  }, []);

  const fetchProjectData = async () => {
    try {
      // Retrieve user's email from local storage
      const userEmail = localStorage.getItem('email');
      // Make a request to backend to fetch Cair details based on email
      const response = await axios.get(`http://localhost:8084/api/v1/cair/details/${userEmail}`);
      const data = response.data;

      // Extract the projects from the user's data
      const projects = data.projects;

      const projectsByYear = projects.reduce((acc, project) => {
        const year = project.year;
        if (!acc[year]) {
          acc[year] = 0;
        }
        acc[year]++;
        return acc;
      }, {});

      const labels = Object.keys(projectsByYear).sort();
      const counts = labels.map((year) => projectsByYear[year]);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Number of Projects',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chart-container">
      {chartData ? (
        <div className="chart">
          <div className="chart-title">Project Count by Year</div>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: false,
                },
                legend: {
                  display: true,
                  position: 'right',
                },
              },
              scales: {
                x: {
                  type: 'category',
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default BarChart;

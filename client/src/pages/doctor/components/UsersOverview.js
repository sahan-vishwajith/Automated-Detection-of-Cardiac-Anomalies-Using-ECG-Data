import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables, LinearScale, CategoryScale } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables, LinearScale, CategoryScale);

const UsersOverview = () => {
  const data = {
    labels: Array.from({ length: 100 }, (_, i) => i + 1), // Days of the month
    datasets: [
      {
        label: 'Normal',
        data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 
          110, 115, 120, 125, 130, 135, 140, 145, 150, 145, 140, 135, 130, 125, 120, 115, 110, 
          105, 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 15, 
          20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 
          120, 125, 130, 135, 140, 145, 150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 50, 40]
          ,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Abnormal',
        data: [100, 102, 104, 106, 108, 111, 114, 117, 120, 123, 127, 130, 134, 138, 142, 146, 151, 
          155, 160, 165, 170, 175, 180, 186, 191, 197, 203, 209, 215, 221, 228, 234, 241, 248, 
          255, 262, 269, 277, 284, 292, 300, 308, 316, 324, 333, 341, 350, 359, 368, 378, 387, 
          397, 407, 417, 427, 437, 448, 459, 470, 481, 492, 504, 515, 527, 539, 551, 564, 576, 
          589, 602, 615, 628, 641, 654, 668, 682, 696, 710, 724, 738, 753, 768, 783, 798, 813, 
          828, 844, 860, 876, 892, 908, 925, 941, 958, 975, 992, 1009, 1026, 1043, 1061, 1078]
          
          ,
          
          
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
      x: {
        type: 'category',
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  // Inline styles for the component
  const styles = {
    container: {
      padding: '10px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      width: '690px', // Full width
      AmaxWidth: '900px', // Max width
      margin: '0 auto', // Center the component
      height:'390px',
    },
    title: {
      marginBottom: '0px',
      textAlign: 'center', // Center title
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Patients Age Distribution</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default UsersOverview;

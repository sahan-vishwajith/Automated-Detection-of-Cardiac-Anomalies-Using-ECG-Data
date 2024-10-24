import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const ComparisonComponent = () => {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      maxWidth: '440px', // Set a maximum width for the component
      width: '100%', // Full width to make it responsive
      height: '150px',
      marginLeft:'0px', // Set a fixed height for the component
      margin: '0 ', // Center the component horizontally
    },
    percentage: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    vs: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#00BFAE',
      margin: '0 20px',
    },
    icon: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    femaleIcon: {
      color: 'red',
      fontSize: '3rem',
    },
    maleIcon: {
      color: 'blue',
      fontSize: '3rem',
    },
    label: {
      marginTop: '10px',
      fontSize: '1rem',
      color: '#555',
    },
    chartContainer: {
      width: '100px', // Set a fixed width for the chart
      height: '100%', // Set a fixed height for the chart
    },
  };

  // Data for the vertical bar chart
  const data = {
    labels: ['', ''],
    datasets: [
      {
        data: [80, 60],
        backgroundColor: ['rgb(130,1,203)', 'rgba(54, 162, 235, 0.6)'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevents the aspect ratio from maintaining
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
    scales: {
      x: {
        grid: {
            display: false, // Hide x-axis grid lines
          },
        ticks: {
          color: '#555', // Customize x-axis tick color
        },
      },
      y: {
        beginAtZero: true,
        grid: {
            display: false, // Hide y-axis grid lines
          },
        ticks: {
            display: false, // Display percentage on y-axis
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.icon}>
        <div style={styles.femaleIcon}>🚺</div>
        <div style={styles.percentage}>80%</div>
        <div style={styles.label}>Female</div>
      </div>
      <div style={styles.chartContainer}>
        <Bar data={data} options={options} />
      </div>
      <div style={styles.icon}>
        <div style={styles.maleIcon}>🚹</div>
        <div style={styles.percentage}>60%</div>
        <div style={styles.label}>Male</div>
      </div>
    </div>
  );
};

export default ComparisonComponent;

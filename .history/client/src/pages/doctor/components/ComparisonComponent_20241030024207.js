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

const ComparisonComponent = ({ dataDict }) => {
  const maleCount = dataDict.male || 0;
  const femaleCount = dataDict.female || 0;
  const total = maleCount + femaleCount;
  const malePercentage = total;
  const femalePercentage = total ? ((femaleCount / total) * 100).toFixed(1) : 0;

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      maxWidth: '440px',
      width: '100%',
      height: '150px',
      marginLeft: '0px',
      margin: '0',
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
      width: '100px',
      height: '100%',
    },
  };

  // Data for the vertical bar chart
  const data = {
    labels: ['', ''],
    datasets: [
      {
        data: [maleCount,femaleCount],
        backgroundColor: ['rgb(130,1,203)', 'rgba(54, 162, 235, 0.6)'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#555',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.icon}>
        <div style={styles.femaleIcon}>🚺</div>
        <div style={styles.percentage}>{femalePercentage}%</div>
        <div style={styles.label}>Female</div>
      </div>
      <div style={styles.chartContainer}>
        <Bar data={data} options={options} />
      </div>
      <div style={styles.icon}>
        <div style={styles.maleIcon}>🚹</div>
        <div style={styles.percentage}>{malePercentage}%</div>
        <div style={styles.label}>Male</div>
      </div>
    </div>
  );
};

export default ComparisonComponent;

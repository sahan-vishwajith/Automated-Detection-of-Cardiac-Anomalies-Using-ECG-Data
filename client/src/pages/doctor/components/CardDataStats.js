import React from 'react';

const CardDataStats = ({ title, value, percentage }) => {
  // Inline styles
  const styles = {
    card: {
      background: 'white',
      borderRadius: '8px',
      padding: '5px', // Reduced padding
      paddingLeft:'20px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', // Slightly smaller shadow
      margin: '5px',
      textAlign: 'left',
      width: '310px', // Set a fixed width
      lineHeight: '0.7', // Add line-height to reduce spacing
      height:'100px',
    },
    title: {
      fontSize: '0.8rem', // Reduced font size
      color: '#555',
    },
    value: {
      fontSize: '1.3rem', // Reduced font size
      color: '#333',
    },
    percentage: {
      fontSize: '0.9rem', // Reduced font size
      color: percentage > 0 ? 'green' : 'red',
    },
    chart: {
      width: '100%',
      marginTop: '5px', // Reduced margin
    },
  };


  return (
    <div style={styles.card}>
      <h4 style={styles.title}>{title}</h4>
      <h2 style={styles.value}>{value}</h2>
      <span style={styles.percentage}>
        {percentage > 0 ? '▲' : '▼'} {Math.abs(percentage)}%
      </span>
      <canvas style={styles.chart} height="10"></canvas>
    </div>
  );
};

export default CardDataStats;

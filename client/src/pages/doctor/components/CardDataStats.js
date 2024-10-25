import React from 'react';

const CardDataStats = ({ title, value, percentage ,icon}) => {
  const styles = {
    card: {
      background: 'white',
      borderRadius: '8px',
      padding: '5px',
      paddingLeft: '20px',
      paddingRight: '10px', // Add padding to the right
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
      margin: '5px',
      textAlign: 'left',
      width: '310px',
      lineHeight: '0.7',
      height: '100px',
      display: 'flex',  // Use flex layout
      justifyContent: 'space-between', // Space between text and icon
      alignItems: 'center', // Center vertically
    },
    textContainer: {
      flex: 1, // Allows the text to take up available space
    },
    title: {
      fontSize: '0.8rem',
      color: '#555',
    },
    value: {
      fontSize: '1.3rem',
      color: '#333',
    },
    percentage: {
      fontSize: '0.9rem',
      color: percentage > 0 ? 'green' : 'red',
    },
    icon: {
      width: '40px', // Set icon size
      height: '40px',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.textContainer}>
        <h4 style={styles.title}>{title}</h4>
        <h2 style={styles.value}>{value}</h2>
        <span style={styles.percentage}>
          {percentage > 0 ? '▲' : '▼'} {Math.abs(percentage)}%
        </span>
      </div>
      <img src={icon} alt="Icon" style={styles.icon} />
    </div>
  );
};

export default CardDataStats;

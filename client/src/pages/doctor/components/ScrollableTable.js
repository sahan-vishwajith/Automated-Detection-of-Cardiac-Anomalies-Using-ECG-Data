import React from 'react';

const ScrollableTable = () => {
  // Sample data for the table
  const data = [
    { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 34, email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', age: 23, email: 'alice@example.com' },
    { id: 4, name: 'Bob Brown', age: 45, email: 'bob@example.com' },
    { id: 5, name: 'Charlie Black', age: 37, email: 'charlie@example.com' },
    { id: 6, name: 'David Green', age: 29, email: 'david@example.com' },
    { id: 7, name: 'Eve White', age: 41, email: 'eve@example.com' },
    { id: 8, name: 'Frank Blue', age: 50, email: 'frank@example.com' },
    { id: 9, name: 'Grace Red', age: 32, email: 'grace@example.com' },
    { id: 10, name: 'Hank Grey', age: 27, email: 'hank@example.com' },
    // Add more rows as needed
  ];

  // Inline styles
  const styles = {
    tableContainer: {
      maxHeight: '400px', // Set the maximum height for the scrollable area
      overflowY: 'auto',   // Enable vertical scrolling
      border: '1px solid #ccc', // Optional border around the table
      borderRadius: '8px', // Optional border radius
    },
    table: {
      width: '100%', // Full width
      borderCollapse: 'collapse', // Remove double borders
    },
    th: {
      padding: '10px', // Padding inside header cells
      textAlign: 'left', // Align text to the left
      backgroundColor: '#f2f2f2', // Background color for header
    },
    td: {
      padding: '10px', // Padding inside body cells
      textAlign: 'left', // Align text to the left
      borderBottom: '1px solid #ccc', // Add a bottom border to cells
    },
    tr: {
      cursor: 'pointer', // Change cursor on hover
    },
    hover: {
      backgroundColor: '#f5f5f5', // Change background color on hover
    },
  };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Age</th>
            <th style={styles.th}>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr 
              key={item.id} 
              style={styles.tr} 
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.hover.backgroundColor)} 
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
              <td style={styles.td}>{item.id}</td>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.age}</td>
              <td style={styles.td}>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrollableTable;

import React from 'react';
import StatsCard from './components/CardDataStats';
import UsersOverview from './components/UsersOverview';
import UserMap from './components/UserMap';
import ComparisonComponent from './components/ComparisonComponent';
import PieChartComponent from './components/PieChartComponent';
import ScrollableTable from './components/ScrollableTable';

const Dashboard = () => {
  // Inline styles
  const styles = {
    dashboard: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
      flexWrap: 'wrap',
    },
    statsCard: {
      flex: '1 1 200px', // Flexible basis with a minimum size
      margin: '10px',
      maxWidth: '200px',
      minWidth: '150px', // Minimum width for smaller screens
    },
    chartContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
      padding: '20px',
      width:'100%',
      alignSelf: 'center',
    },
    mapContainer: {
      margin: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
      padding: '20px',
      height: '400px',
      width: '100%',
      maxWidth: '600px',
      alignSelf: 'center',
    },
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.row}>
        <div style={styles.statsCard}>
          <StatsCard title="Posts" value="2,390" percentage={4.7} />
        </div>
        <div style={styles.statsCard}>
          <StatsCard title="Posts" value="2,390" percentage={4.7} />
        </div>
        <div style={styles.statsCard}>
          <StatsCard title="Posts" value="2,390" percentage={-4.7} />
        </div>
        <div style={styles.statsCard}>
          <StatsCard title="Pages" value="182" percentage={12.4} />
        </div>
        <div style={styles.statsCard}>
          <StatsCard title="Pages" value="182" percentage={-12.4} />
        </div>
        <div style={styles.statsCard}>
          <StatsCard title="Pages" value="182" percentage={12.4} />
        </div>
      </div>

      <div style={{ display: 'flex',
      justifyContent: 'space-between',}} >
        <div style={styles.chartContainer}>
          <UsersOverview />
        </div>
        
        <div style={styles.chartContainer}>
          <PieChartComponent />
        </div>
      </div>
      <div style={{ display: 'flex',
      justifyContent: 'space-between',}} >
      <div style={styles.mapContainer}>
        <UserMap />
      </div>
      <div><div style={styles.chartContainer}>
          <ComparisonComponent />
          <ScrollableTable />
        </div>
      </div></div>
      
    </div>
  );
};

export default Dashboard;

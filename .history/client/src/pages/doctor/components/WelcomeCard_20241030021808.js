import React from 'react';
import logo from './logo.png'; // Import the logo image
import background from './background.png'; // Import the background image

const WelcomeCard = () => {
  const styles = {
    card: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px',
      backgroundColor: 'rgba(230, 247, 255, 0.9)', // Semi-transparent overlay color
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '1400px',
      margin: '20px auto',
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
    },
    subtitle: {
      fontSize: '16px',
      color: '#555',
    },
    imageContainer: {
      position: 'relative',
      width: '200px',
      height: '100px', // Set the container height to match the desired image height
      overflow: 'hidden',
      marginLeft: '20px',
    },
    image: {
      width: '100%',
      height: '100%', // Set the height to 100% to fit the container
      objectFit: 'contain', // Use 'contain' to maintain the aspect ratio
      position: 'absolute',
      top: '0',
      left: '0',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.textContainer}>
        <div style={styles.title}>Welcome to CardioCare</div>
        <div style={styles.subtitle}>
          Welcome to CardioCare Dashboard. Boost Your Health, Optimize Your Life & Dashboard!
        </div>
      </div>
      <div style={styles.imageContainer}>
        <img
          src={logo} // Use the imported logo image
          alt="Logo"
          style={styles.image}
        />
      </div>
    </div>
  );
};

export default WelcomeCard;

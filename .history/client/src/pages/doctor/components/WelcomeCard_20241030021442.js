import React from 'react';
import logo from './logo.png'; // Import the logo image
import background from './background.png'; // Import the background image

const WelcomeCard = () => {
  const styles = {
    card: {
      position: 'relative', // Make it a containing element for the overlay
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px',
      backgroundColor: '#E6F7FF', // Fallback background color
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '1400px',
      margin: '20px auto',
      overflow: 'hidden', // Ensures overlay stays within the rounded borders
    },
    backgroundOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0.5, // Set transparency (0 is fully transparent, 1 is fully opaque)
      zIndex: 1, // Ensure the overlay is behind the content
    },
    content: {
      position: 'relative', // Position above the overlay
      zIndex: 2,
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
      height: '100px',
      overflow: 'hidden',
      marginLeft: '20px',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      position: 'absolute',
      top: '0',
      left: '0',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.backgroundOverlay}></div>
      <div style={styles.content}>
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
    </div>
  );
};

export default WelcomeCard;

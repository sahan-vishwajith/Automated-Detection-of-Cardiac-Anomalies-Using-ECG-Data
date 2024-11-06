import React from 'react';
import logo from './logo.png'; // Import the logo image
import background from './digital-health-medical-research-background-with-heartbeat-line_1017-50392.jpg'; // Import the background image

const WelcomeCard = () => {
  const styles = {
    card: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px',
      backgroundColor: 'rgba(230, 247, 255, 0.8)', // Semi-transparent background color
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '1400px',
      margin: '20px auto',
      zIndex: 1,
    },
    textContainer: {
      flex: 1,
      position: 'relative', // Ensure text is above the background
      zIndex: 2,
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
    backgroundImage: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0.5, // Control opacity here
      zIndex: 0, // Behind the text
      borderRadius: '10px', // Match the card's border radius
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.backgroundImage} />
      <div style={styles.textContainer}>
        <div style={styles.title}>Welcome to CardioCare</div>
        <div style={styles.subtitle}>
          Welcome to CardioCare Dashboard. Boost Your Health, Optimize Your Life & Dashboard!
        </div>
      </div>
      <div style={styles.imageContainer}>
        <img
          src={logo}
          alt="Logo"
          style={styles.image}
        />
      </div>
    </div>
  );
};

export default WelcomeCard;

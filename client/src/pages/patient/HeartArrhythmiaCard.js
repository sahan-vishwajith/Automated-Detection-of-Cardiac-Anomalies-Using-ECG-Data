import React from 'react';
import LBBB from "./photos/R.jpg";
import ECGGraph from './ECGGraph'; // Import the ECGGraph component

// Heart image URLs for different conditions
const heartImages = {
  Normal: "path/to/normal-heart.png",
  "Left bundle branch block": LBBB,
  "Right bundle branch block": "path/to/right-bundle-branch-block.png",
  "Atrial premature": "path/to/atrial-premature.png",
  "Premature ventricular contraction": "path/to/premature-ventricular-contraction.png",
  "Ventricular escape": "path/to/ventricular-escape.png",
  "Paced": "path/to/paced.png",
};

// Description text for each heart disease type
const heartDescriptions = {
  Normal: "This is a healthy heart with a normal rhythm.",
  "Left bundle branch block": "The left bundle branch block (LBBB) is a cardiac condition where the electrical signals that typically travel through the left bundle branch of the heart are delayed or obstructed. This disruption affects how the heart's left ventricle contracts, often resulting in an uncoordinated heartbeat between the left and right sides of the heart.",
  "Right bundle branch block": "A condition that delays electrical impulses in the right side of the heart.",
  "Atrial premature": "Atrial premature beats are early heartbeats originating in the atria.",
  "Premature ventricular contraction": "Premature ventricular contractions are extra heartbeats that begin in the ventricles.",
  "Ventricular escape": "Ventricular escape rhythm is a backup mechanism when the upper heart rhythms fail.",
  "Paced": "A paced heart uses a pacemaker to maintain a steady rhythm."
};

const HeartDiseaseCard = ({ diseaseName, ecgData }) => {
    const heartImage = heartImages[diseaseName] || heartImages.Normal;
    const heartDescription = heartDescriptions[diseaseName] || heartDescriptions.Normal;
  
    return (
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Heart Disease Type: {diseaseName}</h2>
        </div>
        <div style={styles.content}>
          <img 
            src={heartImage} 
            alt={`Heart condition: ${diseaseName}`} 
            style={styles.image} 
          />
          <div style={styles.description}>
            <p>{heartDescription}</p>
          </div>
        </div>
        <div style={styles.ecgContainer}>
          <ECGGraph ecgData={ecgData} /> {/* Render the ECG graph */}
        </div>
        <button style={styles.button}>LEARN MORE</button>
      </div>
    );
  };
const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    margin: '20px 60px',
    height:'90%',
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#4a148c',
    borderRadius: '15px 15px 0 0',
    padding: '10px',
    color: '#ffffff',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '20px',
    width: '100%',
    padding: '20px 0',
  },
  image: {
    height: '200px',
    padding: '10px',
  },
  description: {
    maxWidth: '300px',
    textAlign: 'left',
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.5',
  },
  ecgContainer: {
    width: '100%',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  ecgImage: {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  button: {
    backgroundColor: '#4a148c',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    marginTop: '20px',
  },
};

export default HeartDiseaseCard;

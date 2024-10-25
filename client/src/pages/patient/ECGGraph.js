// ECGGraph.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ECGGraph = ({ ecgData }) => {
  const data = {
    labels: ecgData.map((_, index) => index), // Assuming each point represents a time interval
    datasets: [
      {
        label: 'ECG Signal',
        data: ecgData,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Amplitude',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ECGGraph;

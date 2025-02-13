import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';
import 'chart.js/auto';
import '../css/result.css';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const targetValue = location.state?.prediction ?? 0; // Example target value
  const [value, setValue] = useState(0); // Start from 0%

  useEffect(() => {
    if (value < targetValue) {
      const interval = setInterval(() => {
        setValue(prevValue => {
          if (prevValue + 1 >= targetValue) {
            clearInterval(interval);
            return targetValue;
          }
          return prevValue + 1;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [value, targetValue]);

  const data = {
    labels: ['Reported', 'Not Reported'],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ['#3A5AFE', '#d9d9d9'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    rotation: -120,
    circumference: 240,
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const getComment = () => {
    if (value >= 80) {
      return "High Risk";
    } else if (value >= 60) {
      return "Warning";
    } else if (value >= 40) {
      return "Moderate";
    } else if (value >= 20) {
      return "Safe";
    } else {
      return "Very Safe";
    }
  };

  return (
    <div className="link-container">
      <h2>Fraud Reported</h2>
      <div className="chart-container">
        <Doughnut data={data} options={options} />
        <div className="chart-text">
          {value}%
          <div className="chart-comment">
            {getComment()}
          </div>
        </div>
      </div>
      <button type="button" className="home-button" onClick={handleHomeClick}>
        Home
      </button>
    </div>
  );
};

export default Result;

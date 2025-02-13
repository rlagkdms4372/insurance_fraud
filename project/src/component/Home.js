import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/form');
  };

  return (
    <div className="home-container">
      <h2 className="home-title">Car Insurance Detection</h2>
      <br></br>
      <h3>We offer a service leveraging car insurance data to detect insurance fraud, 
        crucial for mitigating significant financial losses for both insurance companies and customers. 
        Effectively detecting such fraud is pivotal in upholding stability and trust within the insurance industry.</h3>
        <br></br>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="home-button">Let's Test!</button>
      </form>
    </div>
  );
}

export default Home;

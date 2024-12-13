// App.js
import React, { useState } from "react";
import CameraCapture from "./components/CameraCapture";
import "./App.css";

const App = () => {
  const [step, setStep] = useState(1); // 1: Welcome, 2: Capture Image, 3: Thank You
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const goToNextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsLoading(false);
    }, 1000); // Simulate loading delay
  };

  return (
    <div>
      <h1>Image Capture and Integration</h1>

      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!isLoading && step === 1 && (
        <div className="container">
          <h2>Welcome! Please Capture or Upload an Image</h2>
          <div className="button-container">
            <button className="start-button btn btn-primary" onClick={goToNextStep}>
              Start
            </button>
          </div>
        </div>
      )}

      {!isLoading && step === 2 && <CameraCapture goToNextStep={goToNextStep} />}

      {!isLoading && step === 3 && (
        <div className="thank-you">
          <h2>Thank You!</h2>
          <p>Your image has been successfully sent.</p>
        </div>
      )}
    </div>
  );
};

export default App;

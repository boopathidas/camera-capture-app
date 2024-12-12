import React, { useState } from "react";
import CameraCapture from './components/CameraCapture';

const App = () => {
  const [step, setStep] = useState(1);  // 1: Capture Image, 2: Camera View, 3: Thank You

  const goToNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div>
      <h1>Image Capture and API Integration</h1>
      
      {step === 1 && (
        <div>
          <h2>Welcome! Please Capture or Upload an Image</h2>
          <button onClick={goToNextStep}>Start</button>
        </div>
      )}

      {step === 2 && (
        <CameraCapture goToNextStep={goToNextStep} />
      )}

      {step === 3 && (
        <div>
          <h2>Thank You! Your image has been successfully sent.</h2>
        </div>
      )}
    </div>
  );
};

export default App;

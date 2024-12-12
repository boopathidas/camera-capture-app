import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [currentScreen, setCurrentScreen] = useState(1); // Manage screens

  // Predefined user details for the ID card
  const userDetails = {
    name: "Boopathi D",
    age: 23,
    gender: "Male",
    college: "The Oxford College of Engineering",
    address: "Bangalore",
  };

  // Capture image from webcam
  const captureImage = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
    setCurrentScreen(2); // Move to the second screen
  };

  // Handle "Complete" button click
  const handleComplete = () => {
    setCurrentScreen(3); // Move to the thank you screen
  };

  // Render the screens based on the currentScreen state
  return (
    <div style={styles.container}>
      {currentScreen === 1 && (
        <>
          <h2>Capture Your ID Card</h2>
          <div style={styles.camera}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="60%"
            />
            <button style={styles.captureButton} onClick={captureImage}>
              Capture Photo
            </button>
          </div>
        </>
      )}

      {currentScreen === 2 && (
        <>
          <h2>Your ID Card</h2>
          <div style={styles.idCard}>
            <div style={styles.imageContainer}>
              <img
                src={imageSrc}
                alt="Captured"
                style={styles.idImage}
              />
            </div>
            <div style={styles.detailsContainer}>
              <p><strong>Name:</strong> {userDetails.name}</p>
              <p><strong>Age:</strong> {userDetails.age}</p>
              <p><strong>Gender:</strong> {userDetails.gender}</p>
              <p><strong>College:</strong> {userDetails.college}</p>
              <p><strong>Address:</strong> {userDetails.address}</p>
            </div>
          </div>
          <button style={styles.completeButton} onClick={handleComplete}>
            Complete
          </button>
        </>
      )}

      {currentScreen === 3 && (
        <div>
          <h2>Thank You!</h2>
          <p>Your submission is completed.</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  camera: {
    margin: "20px 0",
    position: "relative",
  },
  captureButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    position: "absolute",
    bottom: "-50px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  idCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #000",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  imageContainer: {
    marginRight: "20px",
  },
  idImage: {
    width: "120px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "2px solid #ccc",
  },
  detailsContainer: {
    textAlign: "left",
  },
  completeButton: {
    backgroundColor: "#28A745",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default CameraCapture;

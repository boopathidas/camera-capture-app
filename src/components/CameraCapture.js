import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const CameraCapture = ({ goToNextStep }) => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);
  const [apiResponses, setApiResponses] = useState([]);
  const [currentScreen, setCurrentScreen] = useState(1);
  const [expiryDate, setExpiryDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const userDetails = {
    name: "Boopathi D",
    age: 23,
    gender: "Male",
    college: "The Oxford College of Engineering",
    address: "Bangalore",
  };

  // Simulate a  API call
  const fetchDummyApiResponse = (imageIndex) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Image ${imageIndex + 1} processed: Result OK`);
      }, 1000); // Simulate network delay
    });
  };

  const captureImage = async () => {
    const image = webcamRef.current.getScreenshot();
    if (image) {
      const imageIndex = images.length;
      setImages((prevImages) => [...prevImages, image]);

      // Call dummy API and add response
      const apiResponse = await fetchDummyApiResponse(imageIndex);
      setApiResponses((prevResponses) => [...prevResponses, apiResponse]);
    }
  };

  const handleNext = () => {
    if (images.length < 4) {
      alert("Please capture at least 4 photos before proceeding.");
      return;
    }
    setCurrentScreen(2);
  };

  const handleShowIDCard = () => {
    setCurrentScreen(3);
  };

  const handleComplete = () => {
    goToNextStep();
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 p-3"
      style={{ backgroundColor: "#f9f9f9", textAlign: "center" }}
    >
      {/* Screen 1: Image Capture */}
      {currentScreen === 1 && (
        <div>
          <h1 style={{ color: "#007bff", fontWeight: "bold" }}>Image Capture</h1>
          <p className="mt-3" style={{ fontSize: "1.2rem", color: "#333" }}>
            Welcome! Please Capture Photos
          </p>
          <div className="d-flex flex-column align-items-center mt-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded border"
              style={{ width: "90%", maxWidth: "300px" }}
            />
            <button
              className="btn btn-primary mt-3"
              style={{ fontSize: "1rem", borderRadius: "25px" }}
              onClick={captureImage}
            >
              <i className="fa fa-camera"></i> Capture
            </button>
          </div>
          {/* Display Captured Photos */}
          <div className="mt-4">
            <h5>Captured Photos</h5>
            <div className="d-flex flex-wrap justify-content-center">
              {images.map((img, index) => (
                <div key={index} className="m-2 text-center">
                  <img
                    src={img}
                    alt={`Captured ${index + 1}`}
                    className="img-thumbnail"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            className="btn btn-success mt-3"
            style={{ fontSize: "1rem", borderRadius: "25px" }}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}

      {/* Screen 2: Image Processing Results */}
      {currentScreen === 2 && (
        <div>
          <h2 className="mb-4">Image Processing Results</h2>
          <ul className="list-group" style={{ maxWidth: "400px", margin: "0 auto" }}>
            {apiResponses.map((response, index) => (
              <li key={index} className="list-group-item">
                {response}
              </li>
            ))}
          </ul>
          <button
            className="btn btn-primary mt-4"
            style={{ fontSize: "1rem", borderRadius: "25px" }}
            onClick={handleShowIDCard}
          >
            Show ID Card
          </button>
        </div>
      )}

      {/* Screen 3: Display ID Card */}
      {currentScreen === 3 && (
        <div>
          <h2 className="mb-4">Your ID Card</h2>
          <div className="card mx-auto" style={{ maxWidth: "400px" }}>
            <div className="card-body d-flex">
              <img
                src={images[0]}
                alt="Captured"
                className="img-thumbnail me-3"
                style={{
                  width: "120px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <div>
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Age:</strong> {userDetails.age}</p>
                <p><strong>Gender:</strong> {userDetails.gender}</p>
                <p><strong>College:</strong> {userDetails.college}</p>
                <p><strong>Address:</strong> {userDetails.address}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <input
              type="date"
              className="form-control"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="Expiry Date"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            />
            <input
              type="text"
              className="form-control mt-3"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Card Number"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            />
          </div>
          <button
            className="btn btn-success mt-4"
            style={{ fontSize: "1rem", borderRadius: "25px" }}
            onClick={handleComplete}
          >
            Complete
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;

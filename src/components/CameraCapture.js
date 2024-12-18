import React, { useRef, useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const CameraCapture = ({ goToNextStep }) => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);
  const [currentScreen, setCurrentScreen] = useState(1);
  const [ocrResults, setOcrResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const userDetails = {
    name: "Boopathi D",
    age: 23,
    gender: "Male",
    college: "The Oxford College of Engineering",
    address: "Bangalore",
  };

  const resizeImage = async (image, maxWidth = 800, maxHeight = 800) => {
    const img = new Image();
    img.src = image;
    return new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const captureImage = async () => {
    const image = webcamRef.current.getScreenshot();
    if (image) {
      const resizedImage = await resizeImage(image);
      const blob = dataURLtoBlob(resizedImage);
      const file = new File([blob], `capture_${Date.now()}.jpg`, { type: blob.type });
      setImages((prevImages) => [
        ...prevImages,
        { base64: resizedImage, file: file },
      ]);
    }
  };

  const handleNext = async () => {
    if (images.length === 0) {
      alert("Please capture at least one image before proceeding.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(""); // Clear any previous errors

    const formData = new FormData();
    formData.append("file", images[0].file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/upload-image/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });

      console.log("OCR API Response:", response.data);

      if (response.data && response.data.ocr_text) {
        console.log("OCR Text:", response.data.ocr_text);
        setOcrResults(response.data.ocr_text);
      }

      setCurrentScreen(2);
    } catch (error) {
      console.error("OCR API Error:", error.response || error.message);
      alert("Failed to process the image. Please check the logs.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    if (!cardNumber || !expiryDate) {
      alert("Please fill in all the details.");
      return;
    }

    // If everything is correct, move to the next step
    goToNextStep();
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 p-3 bg-light">
      {currentScreen === 1 && (
        <div>
          <h1 className="text-primary fw-bold">Image Capture</h1>
          <p className="mt-3 fs-5 text-secondary">Welcome! Please capture a photo.</p>
          <div className="d-flex flex-column align-items-center mt-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded border"
              style={{ width: "300px", height: "auto" }}
            />
            <button
              className="btn btn-primary mt-3 rounded-pill"
              onClick={captureImage}
            >
              <i className="fa fa-camera"></i> Capture
            </button>
          </div>

          <div className="mt-4">
            <h5>Captured Photos</h5>
            <div className="d-flex flex-wrap justify-content-center">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img.base64}
                  alt={`Captured ${index + 1}`}
                  className="img-thumbnail m-2"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              ))}
            </div>
          </div>

          <button
            className="btn btn-success mt-3 rounded-pill"
            onClick={handleNext}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Next"}
          </button>
        </div>
      )}

{currentScreen === 2 && (
  <div>
    <h2 className="mb-4">Your ID Card</h2>
    <div className="card mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body d-flex">
        <img
          src={images[0].base64}
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
          <p>
            <strong>Name:</strong> {userDetails.name}
          </p>
          <p>
            <strong>Age:</strong> {userDetails.age}
          </p>
          <p>
            <strong>Gender:</strong> {userDetails.gender}
          </p>
          <p>
            <strong>College:</strong> {userDetails.college}
          </p>
          <p>
            <strong>Address:</strong> {userDetails.address}
          </p>

          {ocrResults && (
            <div className="mt-3">
              <h6>OCR Text:</h6>
              <p>{ocrResults}</p> {/* Displaying the OCR text */}
            </div>
          )}

<div className="mt-3">
  <label className="form-label">Card Number:</label>
  <input
    type="text"
    className="form-control"
    value={cardNumber}
    onChange={(e) => {
      const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
      const formattedValue = inputValue
        .replace(/(\d{4})(?=\d)/g, "$1 ") // Format the input to have space every 4 digits
        .slice(0, 19); // Limit to 16 digits (with spaces)
      setCardNumber(formattedValue);
    }}
    maxLength={19} // Maximum length of 16 digits + 3 spaces
    placeholder="XXXX XXXX XXXX XXXX"
  />
</div>


          <div className="mt-3">
  <label className="form-label">Expiry Date:</label>
  <input
    type="date"
    className="form-control"
    value={expiryDate}
    onChange={(e) => setExpiryDate(e.target.value)}
  />
</div>

        </div>
      </div>
    </div>

    <button
      className="btn btn-success mt-4 rounded-pill"
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

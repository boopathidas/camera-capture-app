// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";

// const CameraCapture = () => {
//   const webcamRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [currentScreen, setCurrentScreen] = useState(1); // Manage screens

//   // Predefined user details for the ID card
//   const userDetails = {
//     name: "Boopathi D",
//     age: 23,
//     gender: "Male",
//     college: "The Oxford College of Engineering",
//     address: "Bangalore",
//   };

//   // Capture image from webcam
//   const captureImage = () => {
//     const image = webcamRef.current.getScreenshot();
//     setImageSrc(image);
//     setCurrentScreen(2); // Move to the second screen
//   };

//   // Handle "Complete" button click
//   const handleComplete = () => {
//     setCurrentScreen(3); // Move to the thank you screen
//   };

//   // Render the screens based on the currentScreen state
//   return (
//     <div style={styles.container}>
//       {currentScreen === 1 && (
//         <>
//           <h2>Capture Your ID Card</h2>
//           <div style={styles.camera}>
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               width="60%"
//             />
//             <button style={styles.captureButton} onClick={captureImage}>
//               Capture Photo
//             </button>
//           </div>
//         </>
//       )}

//       {currentScreen === 2 && (
//         <>
//           <h2>Your ID Card</h2>
//           <div style={styles.idCard}>
//             <div style={styles.imageContainer}>
//               <img
//                 src={imageSrc}
//                 alt="Captured"
//                 style={styles.idImage}
//               />
//             </div>
//             <div style={styles.detailsContainer}>
//               <p><strong>Name:</strong> {userDetails.name}</p>
//               <p><strong>Age:</strong> {userDetails.age}</p>
//               <p><strong>Gender:</strong> {userDetails.gender}</p>
//               <p><strong>College:</strong> {userDetails.college}</p>
//               <p><strong>Address:</strong> {userDetails.address}</p>
//             </div>
//           </div>
//           <button style={styles.completeButton} onClick={handleComplete}>
//             Complete
//           </button>
//         </>
//       )}

//       {currentScreen === 3 && (
//         <div>
//           <h2>Thank You!</h2>
//           <p>Your submission is completed.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     textAlign: "center",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//   },
//   camera: {
//     margin: "20px 0",
//     position: "relative",
//   },
//   captureButton: {
//     backgroundColor: "#007BFF",
//     color: "#fff",
//     border: "none",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     position: "absolute",
//     bottom: "-50px",
//     left: "50%",
//     transform: "translateX(-50%)",
//   },
//   idCard: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "2px solid #000",
//     borderRadius: "10px",
//     padding: "20px",
//     maxWidth: "500px",
//     margin: "0 auto",
//     backgroundColor: "#f9f9f9",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   },
//   imageContainer: {
//     marginRight: "20px",
//   },
//   idImage: {
//     width: "120px",
//     height: "150px",
//     objectFit: "cover",
//     borderRadius: "10px",
//     border: "2px solid #ccc",
//   },
//   detailsContainer: {
//     textAlign: "left",
//   },
//   completeButton: {
//     backgroundColor: "#28A745",
//     color: "#fff",
//     border: "none",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "20px",
//   },
// };

// export default CameraCapture;
// CameraCapture.js
// CameraCapture.js
// CameraCapture.js
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const CameraCapture = ({ goToNextStep }) => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);
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

  const captureImage = () => {
    const image = webcamRef.current.getScreenshot();
    if (image) {
      setImages((prevImages) => [...prevImages, image]);
    }
  };

  const handleNext = () => {
    if (images.length < 4) {
      alert("Please capture at least 4 photos before proceeding.");
      return;
    }
    setCurrentScreen(2);
  };

  const handleComplete = () => {
    goToNextStep();
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 p-3"
      style={{ backgroundColor: "#f9f9f9", textAlign: "center" }}
    >
      {currentScreen === 1 && (
        <div>
          <h1 style={{ color: "#007bff", fontWeight: "bold" }}>
            Image Capture
          </h1>
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
          <div className="mt-4">
            <h5>Captured Photos</h5>
            <div className="d-flex flex-wrap justify-content-center">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Captured ${index + 1}`}
                  className="img-thumbnail m-2"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
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

      {currentScreen === 2 && (
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

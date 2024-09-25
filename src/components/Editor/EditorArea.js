import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./CroppedImg"; // Import this utility function to get the cropped image

const ImageEditor = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropping, setCropping] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setCropping(true); // Enable crop mode when the image is selected
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (croppedAreaPixels && image) {
      try {
        const croppedImg = await getCroppedImg(image, croppedAreaPixels, rotation);
        setCroppedImage(croppedImg);
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  };

  const handleRotate = () => {
    setRotation((prevRotation) => prevRotation + 90); // Rotate the image by 90 degrees on each click
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />

      <div
        style={{
          position: "relative",
          width: "400px",
          height: "600px",
          backgroundColor: "#f5f5f5",
          border: "1px dashed blue",
          margin: "20px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {image && cropping && (
          <>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1} // Adjust the aspect ratio as per your design needs
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: { cursor: "pointer", width: "100%", height: "100%" },
              }}
            />
            {/* Rotate button inside crop area */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "10px",
                boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                cursor: "pointer",
              }}
              onClick={handleRotate}
            >
              ↻ Rotate
            </div>
            <button onClick={handleCrop} style={{ position: "absolute", bottom: "20px", left: "20px" }}>
              Crop Image
            </button>
          </>
        )}
        {croppedImage && (
          <img
            src={croppedImage}
            alt="Cropped"
            style={{
              width: "200px",
              height: "200px",
              transform: `rotate(${rotation}deg)`,
              cursor: "pointer",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageEditor;

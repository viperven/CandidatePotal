import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState();
  const [croppedImage, setCroppedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const handleCrop = () => {
    if (typeof cropper !== 'undefined') {
      const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(croppedDataUrl);
      console.log(croppedDataUrl)
    }
  };

  const handleResize = () => {
    if (croppedImage) {
      const img = new Image();
      img.src = croppedImage;
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        // Set the new dimensions for the resized image
        const newWidth = 200; // Set your desired width
        const newHeight = (newWidth / img.width) * img.height;
  
        canvas.width = newWidth;
        canvas.height = newHeight;
  
        // Draw the cropped image onto the canvas with the new dimensions
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
        // Get the resized image as a data URL
        const resizedImage = canvas.toDataURL('image/jpeg');
  
        // You can now use the 'resizedImage' variable for your desired purpose
        console.log('Resized Image:', resizedImage);
      };
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select an image</p>
      </div>

      {image && (
        <div>
          <Cropper
            src={image}
            style={{ height: 400, width: '100%' }}
            aspectRatio={1}
            guides={true}
            cropBoxResizable={true}
            onInitialized={(instance) => setCropper(instance)}
          />
          <button onClick={handleCrop}>Crop Image</button>
          <button onClick={handleResize}>Resize Image</button>
        </div>
      )}

      {croppedImage && (
        <div>
          <h2>Cropped Image</h2>
          <img src={croppedImage} alt="Cropped" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

import React, { useEffect, useRef } from 'react';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';  // Ensure Dropzone CSS is imported

function DropzoneComponent({ setResult, setError, setImageData }) {
  const dropzoneRef = useRef(null);

  useEffect(() => {
    if (Dropzone.instances.length > 0) {
      Dropzone.instances.forEach((dz) => dz.destroy());
    }

    const dz = new Dropzone(dropzoneRef.current, {
      url: "http://localhost:5000/classify_image",
      maxFiles: 1,
      addRemoveLinks: true,
      autoProcessQueue: false,
      dictDefaultMessage: "Drop files here or click to upload",
      headers: {
        'Accept': 'application/json'
      }
    });

    dz.on("addedfile", (file) => {
      console.log("File added:", file);
      setImageData(file);
    });

    dz.on("error", (file, errorMessage) => {
      console.error("Upload error:", errorMessage);
      setError("An error occurred while uploading the image.");
    });

    dz.on("sending", (file) => {
      console.log("Uploading file:", file);
    });

    return () => {
      dz.destroy();
    };
  }, [setResult, setError, setImageData]);

  return (
    <div className="mt-4">
  <form ref={dropzoneRef} id="dropzone" className="dropzone flex flex-col items-center justify-center">
    <div className="dz-message needsclick flex flex-col items-center justify-center text-center">
      <img src="./images/upload.png" width="100vw" height="100vw" alt="Upload" />
      <br />
      <span className="note needsclick text-black">Drop files here or click to upload</span>
    </div>
  </form>
</div>

  );
}

export default DropzoneComponent;
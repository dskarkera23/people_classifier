import React, { useState } from 'react';
import Card from './components/Card.jsx';
import DropzoneComponent from './components/Dropzone.jsx';
import './index.css';
import BhaiImage from './assets/Bhai.jpg';
import DeepuImage from './assets/Deepu.jpg';
import DskImage from './assets/dsk.jpg';
import SrujanImage from './assets/Srujan.jpg';
import VaibhavImage from './assets/Vaibhav.jpg';

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [imageData, setImageData] = useState(null);

  const handleClassify = async () => {
    console.log(imageData.dataURL)
    if (!imageData) {
      setError("No image uploaded.");
      return;
    }

    try {
      // const reader = new FileReader();
      // reader.onloadend = async () => {
        // const base64Image = reader.result;
        // const asciiStr = binaryToAscii(base64Image);

        console.log("Base64 Image Data: yes");  // Debugging line

        const response = await fetch('http://localhost:5000/classify_image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image_data: imageData.dataURL }) // Adjust this according to your API
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Response Data:', data);

          // Set the classification result
          setResult(data);
          setError(null); // Clear any previous errors
        } else {
          console.error('Server Error:', response.statusText);
          setError('Server Error');
        }
      // };
      // reader.readAsBinaryString(imageData);
    } catch (err) {
      console.error("Classify Error:", err);  // Debugging line
      setError('An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <nav className="navbar p-4 w-full">
        <h1 className="text-2xl font-bold text-gray-800">Person Classifier</h1>
      </nav>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center gap-4 mb-4 text-black">
          <Card title="Bhai" imgSrc={BhaiImage} />
          <Card title="Deepu" imgSrc={DeepuImage} />
          <Card title="dsk" imgSrc={DskImage} />
          <Card title="Srujan" imgSrc={SrujanImage} />
          <Card title="Vaibhav" imgSrc={VaibhavImage} />
        </div>
        <div className="flex flex-wrap justify-center mb-4 text-black">
          <DropzoneComponent setImageData={setImageData} />
        </div>
        <div className="flex flex-wrap justify-center mb-4">
          <button
            onClick={handleClassify}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Classify
          </button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {result && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Results for {result.class}</h2>
            <ul className="list-disc list-inside mt-2">
              {result.class_probability.map((prob, index) => (
                <li key={index}>
                  {Object.keys(result.class_dictionary)[index]}: {prob}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

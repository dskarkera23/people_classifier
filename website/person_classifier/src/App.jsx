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

  // Mapping of person names to their predefined images
  const personImages = {
    Bhai: BhaiImage,
    Deepu: DeepuImage,
    dsk: DskImage,
    Srujan: SrujanImage,
    Vaibhav: VaibhavImage,
  };

  const handleClassify = async () => {
    if (!imageData) {
      setError("No image uploaded.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/classify_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_data: imageData.dataURL })
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        setError(null);
      } else {
        setError('Server Error');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col items-center overflow-x-hidden">
      <nav className="navbar p-4 w-full">
        <h1 className="text-2xl font-bold text-gray-800">Person Classifier</h1>
      </nav>
      <div className="container mx-auto p-4">
        <div className="flex">
          {/* Left section with Cards and Dropzone */}
          <div className="w-2/3 p-4">
            <div className="flex flex-wrap justify-center gap-4 mb-4 text-black">
              <Card title="Bhai" imgSrc={BhaiImage} />
              <Card title="Deepu" imgSrc={DeepuImage} />
              <Card title="dsk" imgSrc={DskImage} />
              <Card title="Srujan" imgSrc={SrujanImage} />
              <Card title="Vaibhav" imgSrc={VaibhavImage} />
            </div>
            <div className="flex justify-center mb-4 text-black">
              <DropzoneComponent setImageData={setImageData} setError={setError} setResult={setResult} />
            </div>
            <div className="flex justify-center mb-4">
              <button
                onClick={handleClassify}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Classify
              </button>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>

          {/* Right section for classification result */}
          <div className="w-1/3 p-4 bg-gray-200 rounded-lg">
            {result && (
              <div className="text-center">
                {/* Display predefined image corresponding to the classification result */}
                <img 
                  src={personImages[result[0]?.class]} // Use predefined image based on classification
                  alt="Classified Person"
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white"
                />
                <h2 className="text-xl font-semibold text-black mb-4">
                  Classified as {result[0]?.class}
                </h2>
                {/* Display classification probabilities in a table */}
                <table className="w-full text-black">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Person</th>
                      <th className="text-right p-2">Probability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map probabilities to the corresponding person */}
                    {Object.entries(result[0].class_dictionary).map(([person, index]) => (
                      <tr key={person}>
                        <td className="p-2">{person}</td>
                        <td className="p-2 text-right">{result[0]?.class_probability[index]}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

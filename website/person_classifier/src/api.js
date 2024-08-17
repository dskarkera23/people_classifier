// src/api.js
export async function classifyImage(imageData) {
    const response = await fetch('http://127.0.0.1:5000/classify_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        image_data: imageData,
      }),
    });
  
    const data = await response.json();
    return data;
  }
  
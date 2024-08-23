# People Classifier

This project uses OpenCV and machine learning techniques to classify a provided image into one of five predefined people. The classifier is built using a one-class SVM model, Haar cascades, wavelets, and other image processing techniques.

## Project Overview

- **Classifier**: One-Class SVM Model
- **Image Processing**: Haar Cascades, Wavelet Transform
- **Tech Stack**: OpenCV, Flask, React

The system is trained on images of five predefined individuals and uses their unique features to classify new input images. Once the model is trained, a Flask server is used as a backend, and a React-based webpage provides the frontend interface to display classification results.

## Requirements

Make sure to install the following packages:

- OpenCV (`opencv-python`)
- Flask (`flask`)
- NumPy (`numpy`)
- scikit-learn (`scikit-learn`)
- React (via Node.js and npm)
- Tailwind CSS for styling

You can install the Python dependencies using:
```bash
pip install opencv-python flask numpy scikit-learn
```
# Usage Instructions

## Model Training
The model is trained using a dataset of images for the predefined five people. The trained model is saved as a `.pkl` file for later use.

## Flask Backend
The Flask server is responsible for loading the trained model and classifying the uploaded images. Once a classification is made, the result is sent back to the frontend.

## React Frontend
A React webpage provides an interface where users can upload images and view classification results. The webpage shows the image of the person with the highest classification probability, along with a breakdown of probabilities for each person.

## Steps to Use
1. Download the pre-trained model `.pkl` files and the website code.
2. Set up the Flask server to serve the model for classification.
3. Launch the React webpage to upload test images.
4. Use any of the provided test images to see the classification results.

## Running the Project

### Run the Flask server:

```bash
python server.py
```
### Navigate to the React project directory i.e website/person_classifier, install dependencies, and start the frontend:

```bash
npm install
npm run dev
```
Open your browser and navigate to the provided local URL to use the classifier.

## Test Images
Test images are provided to validate the classifier's performance. Upload one of the images and see the result displayed on the webpage.

### Credits
This project was inspired by the [Sports Person Classifier tutorial by codebasics](https://github.com/codebasics/py/tree/master/DataScience/CelebrityFaceRecognition).


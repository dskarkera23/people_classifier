from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import util

app = Flask(__name__)
CORS(app)

@app.route('/classify_image', methods=['POST'])
def classify_image():
    app.logger.info("Received request")
    try:
        data = request.get_json()
        
        app.logger.info(data,type(data))
        app.logger.info("Request data: %s", data)
        image_data = data.get('image_data')  # Ensure this key matches the frontend

        if not image_data:
            app.logger.warning("No image data provided")
            return jsonify({'error': 'No image data provided'}), 400

        # Strip out base64 data if necessary
        #image_data = image_data.split(',')[1] if ',' in image_data else image_data
        
        # Decode base64 to binary
        #image_binary = base64.b64decode(image_data)
        
        # Process the image binary data with your function
        result = util.classify_image(image_data)
        app.logger.info("Classification result: %s", result)

        return jsonify(result)
    
    except Exception as e:
        app.logger.error("Exception occurred: %s", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.logger.info("Starting Python Flask Server For Sports Celebrity Image Classification")
    util.load_saved_artifacts()
    app.run(port=5000)
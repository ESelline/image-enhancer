from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from PIL import Image, ImageEnhance, ImageFilter
import io

app = Flask(__name__)
CORS(app)

def enhance_image(img):
    """Enhances the given image for better clarity and sharpness."""
    
    # Step 1: Enhance sharpness
    sharpness_enhancer = ImageEnhance.Sharpness(img)
    img = sharpness_enhancer.enhance(2.0)  # Adjust sharpness as needed

    # Step 2: Enhance contrast
    contrast_enhancer = ImageEnhance.Contrast(img)
    img = contrast_enhancer.enhance(1.5)  # Adjust contrast as needed

    # Step 3: Enhance brightness
    brightness_enhancer = ImageEnhance.Brightness(img)
    img = brightness_enhancer.enhance(1.0)  # Adjust brightness as needed

    # Step 4: Apply a sharpen filter
    img = img.filter(ImageFilter.SHARPEN)

    # Return the enhanced image
    return img

@app.route('/enhance', methods=['POST'])
def handle_enhance():
    """Handles the image enhancement request."""
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']

    # Check if the uploaded file is an image
    if not file or not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        return jsonify({'error': 'Invalid image format. Please upload a PNG or JPG image.'}), 400

    try:
        img = Image.open(file.stream).convert('RGB')  # Ensure image is in RGB format
        enhanced_img = enhance_image(img)

        # Convert enhanced image to byte array
        img_byte_arr = io.BytesIO()
        enhanced_img.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)

        return send_file(img_byte_arr, mimetype='image/png')

    except Exception as e:
        return jsonify({'error': f'An error occurred while processing the image: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)

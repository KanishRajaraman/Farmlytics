from flask import Flask, request, jsonify, render_template
import pandas as pd
import joblib
from flask_cors import CORS
import datetime
import os

# Initialize the Flask application
# Set up template and static folders relative to this file
base_dir = os.path.dirname(os.path.abspath(__file__))
template_dir = os.path.join(base_dir, '..', 'frontend', 'templates')
static_dir = os.path.join(base_dir, '..', 'frontend', 'static')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
# Enable CORS for the frontend to access the API from a different origin
CORS(app)

# --- FRONTEND ROUTES ---
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/home')
def home_alt():
    return render_template('home.html')

@app.route('/index')
def index():
    return render_template('home.html')

@app.route('/prediction')
def prediction():
    return render_template('prediction.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/calculator')
def calculator():
    return render_template('calculator.html')

@app.route('/guide')
def guide():
    return render_template('guide.html')

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

# --- MODEL LOADING ---
# Load all models and features once when the app starts.
# This is a critical step for performance.
def load_models():
    """Loads all machine learning models and features from .joblib files."""
    try:
        # Corrected file paths using forward slashes for cross-platform compatibility
        # and to avoid SyntaxWarning
        # Load the rainfall prediction model and its features
        rainfall_model = joblib.load(r"monthly_rainfall_model.joblib")
        rainfall_features = joblib.load(r"monthly_features.joblib")

        # Load the weather prediction model
        weather_model = joblib.load(r"weather_prediction_model.joblib")

        # Load the main crop prediction model
        crop_model = joblib.load(r"crop_prediction_model_full.joblib")
        crop_labels = crop_model.classes_

        print("All models loaded successfully!")
        return rainfall_model, rainfall_features, weather_model, crop_model, crop_labels
    except FileNotFoundError as e:
        print(f"Error: A required model file was not found: {e}")
        # Terminate the application if a critical file is missing
        exit()
    except Exception as e:
        print(f"An unexpected error occurred during model loading: {e}")
        # Terminate the application if there is an incompatibility or other error
        exit()

# Load the models globally
rainfall_model, rainfall_features, weather_model, crop_model, crop_labels = load_models()

# --- HELPER FUNCTIONS ---

def predict_monthly_rainfall(month, state_name, dist_name):
    """
    Predicts the monthly rainfall using the rainfall model.
    Handles one-hot encoding for state and district names.
    """
    user_input_dict = {feature: 0.0 for feature in rainfall_features}
    
    # Set the user's inputs
    user_input_dict['Month'] = month
    
    state_feature = f'State_{state_name}'
    dist_feature = f'Dist_{dist_name}'
    
    if state_feature not in user_input_dict or dist_feature not in user_input_dict:
        # Raise an error if the state or district was not in the training data
        raise KeyError(f"State '{state_name}' or District '{dist_name}' not found in the training data.")
    
    user_input_dict[state_feature] = 1.0
    user_input_dict[dist_feature] = 1.0
    
    user_input_encoded = pd.DataFrame([user_input_dict])
    prediction = rainfall_model.predict(user_input_encoded)
    return prediction[0]

# --- API ENDPOINTS ---

@app.route('/api/predict-crop', methods=['POST'])
def predict():
    """
    This endpoint orchestrates the entire prediction process.
    It receives user inputs, calls a sequence of models, and returns the final
    crop recommendation along with relevant data.
    """
    if not request.json:
        return jsonify({"error": "No data provided. Please provide a JSON payload."}), 400

    try:
        data = request.json
        
        # 1. Extract and validate user inputs from the JSON payload
        user_nitrogen = float(data.get('nitrogen'))
        user_phosphorus = float(data.get('phosphorus'))
        user_potassium = float(data.get('potassium'))
        user_ph = float(data.get('ph'))
        user_state = data.get('state', '').strip()
        user_district = data.get('district', '').strip()
        user_month = int(data.get('Month'))

        if not all(isinstance(v, (int, float)) for v in [user_nitrogen, user_phosphorus, user_potassium, user_ph, user_month]):
            return jsonify({"error": "Invalid input. Please ensure all values are numeric."}), 400
        
        # 2. Predict rainfall using the first model
        predicted_rainfall = predict_monthly_rainfall(user_month, user_state, user_district)

        # 3. Predict humidity and temperature using the second model
        weather_model_input = pd.DataFrame({
            'Month': [user_month],
            'Rainfall': [predicted_rainfall]
        })
        humidity_temp_pred = weather_model.predict(weather_model_input)
        predicted_humidity = humidity_temp_pred[0][0]
        predicted_temperature = humidity_temp_pred[0][1]

        # 4. Predict crop using the main crop model
        crop_model_input = pd.DataFrame({
            'Nitrogen': [user_nitrogen],
            'Phosphorus': [user_phosphorus],
            'Potassium': [user_potassium],
            'Temperature': [predicted_temperature],
            'Humidity': [predicted_humidity],
            'pH_Value': [user_ph],
            'Rainfall': [predicted_rainfall]
        })
        
        # Get the confidence probabilities for all crops
        probabilities = crop_model.predict_proba(crop_model_input)[0]
        predicted_crop_index = probabilities.argmax()
        predicted_crop = crop_labels[predicted_crop_index]
        confidence = probabilities[predicted_crop_index] * 100
        
        # Get top 5 crop predictions
        top_5_indices = probabilities.argsort()[-5:][::-1]
        top_5 = []
        for idx, rank in zip(top_5_indices, range(1, 6)):
            top_5.append({
                "crop_name": crop_labels[idx],
                "confidence": f"{probabilities[idx] * 100:.2f}%",
                "rank": rank
            })
        
        # 5. Return the prediction results
        # The image_url is a placeholder for demonstration purposes.
        image_url = f"https://placehold.co/100x100/A3EBB1/000000?text={predicted_crop.replace(' ', '+')}"

        return jsonify({
            "predicted_crop": predicted_crop,
            "confidence": f"{confidence:.2f}%",
            "image_url": image_url,
            "top_5": top_5,
            "recommendation_text": f"Based on the provided data, the recommended crop for your region is {predicted_crop}. This is based on a prediction confidence of {confidence:.2f}%."
        })

    except KeyError as e:
        return jsonify({"error": f"Invalid or missing data field in request: {e}. Please check your input."}), 400
    except ValueError:
        return jsonify({"error": "Invalid data format. Please ensure all numeric fields contain numbers."}), 400
    except Exception as e:
        # Generic error handling for unexpected issues
        return jsonify({"error": f"An unexpected server error occurred: {str(e)}"}), 500

# This block ensures the server only runs when the script is executed directly
if __name__ == '__main__':
    # It's good practice to set debug=True for development to get live updates
    app.run(debug=True)

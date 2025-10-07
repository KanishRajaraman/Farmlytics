import pandas as pd
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
import os

# Initialize the Flask application
app = Flask(__name__)
# Enable CORS for the frontend to access the API from a different origin
CORS(app)

# --- MODEL LOADING ---
# Load all models and features once when the app starts.
def load_models():
    """Loads all machine learning models and features from .joblib files."""
    try:
        # Corrected file paths using forward slashes for cross-platform compatibility
        # and to avoid SyntaxWarning
        # Load the rainfall prediction model and its features
        rainfall_model = joblib.load(r"D:\EDA Agri project\Farmlytics\monthly_rainfall_model.joblib")
        rainfall_features = joblib.load(r"D:\EDA Agri project\Farmlytics\monthly_features.joblib")

        # Load the weather prediction model
        weather_model = joblib.load(r"D:\EDA Agri project\Farmlytics\weather_prediction_model.joblib")

        # Load the main crop prediction model
        crop_model = joblib.load(r"D:\EDA Agri project\Farmlytics\crop_prediction_model_full.joblib")
        crop_labels = crop_model.classes_

        print("All models loaded successfully!")
        return rainfall_model, rainfall_features, weather_model, crop_model, crop_labels
    except FileNotFoundError as e:
        print(f"Error: A required model file was not found: {e}")
        exit()
    except Exception as e:
        print(f"An unexpected error occurred during model loading: {e}")
        exit()

# Load the models globally
rainfall_model, rainfall_features, weather_model, crop_model, crop_labels = load_models()

# --- HELPER FUNCTIONS ---

def predict_monthly_rainfall(month, state_name, dist_name):
    """
    Predicts the monthly rainfall using the rainfall model.
    Handles one-hot encoding for state and district names.
    """
    state_name_clean = state_name.strip().title()
    dist_name_clean = dist_name.strip().title()

    user_input_dict = {feature: 0.0 for feature in rainfall_features}
    
    # Set the user's inputs
    user_input_dict['Month'] = month
    
    state_feature = f'State_{state_name_clean}'
    dist_feature = f'Dist_{dist_name_clean}'
    
    if state_feature not in user_input_dict or dist_feature not in user_input_dict:
        raise KeyError(f"State '{state_name_clean}' or District '{dist_name_clean}' not found in the training data.")

    user_input_dict[state_feature] = 1.0
    user_input_dict[dist_feature] = 1.0
    
    user_input_encoded = pd.DataFrame([user_input_dict])
    prediction = rainfall_model.predict(user_input_encoded)
    return prediction[0]

# --- CHATBOT ROUTE (RESTORED) ---
@app.route("/")
def home():
    return "Backend is running"

@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.json
    user_message = data.get("message", "").lower()

    reply = "Sorry, I didn't understand. Try asking about crops, growth phases, financials, pests, or market info."

    # Crop growth stages
    if "sowing" in user_message:
        reply = "🌱 Sowing Stage: Prepare soil, plough properly, and plant seeds at 2–3 cm depth."
    elif "vegetative" in user_message or "growth stage" in user_message:
        reply = "🌿 Vegetative Stage: Apply NPK fertilizers, irrigate regularly, and control weeds."
    elif "flowering" in user_message:
        reply = "🌸 Flowering Stage: Ensure enough water, protect crops from pests, and maintain moisture."
    elif "harvesting" in user_message:
        reply = "🌾 Harvesting Stage: Harvest when grains are golden and dry for maximum yield."

    # Financials
    elif "cost" in user_message or "profit" in user_message or "financial" in user_message:
        reply = "💰 Financial details:\nInput Costs: ₹15,000\nRevenue: ₹32,000\nProfit: ₹17,000\nTip: Use certified seeds for better yield."

    # Pests
    elif "pest" in user_message or "disease" in user_message:
        reply = "🐛 Pest Alert: Armyworm risk detected — apply preventive neem spray or pesticides."

    # Market
    elif "market" in user_message or "price" in user_message or "selling" in user_message:
        reply = "📊 Market Info: Nearest mandi price is ₹1,800 per quintal. Direct selling increases profit by 15%."

    # Fertilizer
    elif "fertilizer" in user_message:
        reply = "🌱 Fertilizer Suggestion: Use balanced NPK (60:40:20) and organic compost for soil health."

    # Watering
    elif "water" in user_message or "irrigation" in user_message:
        reply = "💧 Irrigation Tip: Water every 7–10 days depending on rainfall and crop type."

    # Recommended crops
    elif "suggest crop" in user_message or "recommended crop" in user_message:
        reply = "🌾 Recommended crops: Maize, Wheat, and Rice are suitable for your soil conditions."

    return jsonify({"reply": reply})

# --- PREDICTION ROUTE (EXISTING) ---
@app.route('/api/predict-crop', methods=['POST'])
def predict():
    if not request.json:
        return jsonify({"error": "No data provided. Please provide a JSON payload."}), 400

    try:
        data = request.json

        # 1. Extract and validate user inputs
        user_nitrogen = float(data.get('nitrogen'))
        user_phosphorus = float(data.get('phosphorus'))
        user_potassium = float(data.get('potassium'))
        user_ph = float(data.get('ph'))
        user_state = data.get('state', '').strip()
        user_district = data.get('district', '').strip()
        user_month = int(data.get('Month'))

        if not all(isinstance(v, (int, float)) for v in [user_nitrogen, user_phosphorus, user_potassium, user_ph, user_month]):
            return jsonify({"error": "Invalid input. Please ensure all values are numeric."}), 400

        # 2. Predict rainfall
        predicted_rainfall = predict_monthly_rainfall(user_month, user_state, user_district)

        # 3. Predict humidity and temperature
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

        # Create a dictionary of {crop_name: probability}
        crop_probabilities = dict(zip(crop_labels, probabilities))

        # Sort the crops by probability in descending order
        sorted_crops = sorted(crop_probabilities.items(), key=lambda x: x[1], reverse=True)

        # --- NEW/MODIFIED LOGIC FOR TOP 5 LIST ---
        top_5_crops_data = []
        for i in range(min(5, len(sorted_crops))):
            crop, prob = sorted_crops[i]
            top_5_crops_data.append({
                'crop_name': crop,
                'confidence': f"{prob * 100:.2f}%",
                'rank': i + 1
            })

        # Extract the primary prediction details from the top of the list
        predicted_crop = top_5_crops_data[0]['crop_name']
        confidence = top_5_crops_data[0]['confidence'] # Already formatted as string

        # 5. Return the prediction results
        image_url = f"https://placehold.co/100x100/A3EBB1/000000?text={predicted_crop.replace(' ', '+')}"

        return jsonify({
            "predicted_crop": predicted_crop,
            "confidence": confidence,  # Use the pre-formatted string
            "image_url": image_url,
            "recommendation_text": f"Based on the provided data, the recommended crop for your region is {predicted_crop}. This is based on a prediction confidence of {confidence}.",
            "top_5": top_5_crops_data
        })

    except KeyError as e:
        # Handles unknown state/district or missing JSON keys
        return jsonify({"error": f"Invalid or missing data field in request: {e}. Please check your input."}), 400
    except ValueError:
        return jsonify({"error": "Invalid data format. Please ensure all numeric fields contain numbers."}), 400
    except Exception as e:
        # Generic error handling for unexpected issues
        return jsonify({"error": f"An unexpected server error occurred: {str(e)}"}), 500

# This block ensures the server only runs when the script is executed directly
if __name__ == '__main__':
    app.run(debug=True)

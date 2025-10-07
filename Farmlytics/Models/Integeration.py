import pandas as pd
import joblib

# Load all models and features
try:
    rainfall_model = joblib.load('monthly_rainfall_model.joblib')
    rainfall_features = joblib.load('monthly_features.joblib')

    rain_model = joblib.load('weather_prediction_model.joblib')
    model_1 = joblib.load('crop_prediction_model_full.joblib')

except FileNotFoundError as e:
    print(f"Error: Model file not found: {e}")
    exit()

def predict_monthly_rainfall(month, state_name, dist_name, model, features_list):
    """
    Predicts the monthly rainfall for a given month, state, and district.
    """
    user_input_dict = {feature: 0.0 for feature in features_list}
    user_input_dict['Month'] = month
    
    # Set one-hot encoded state and district features
    state_feature = f'State_{state_name}'
    dist_feature = f'Dist_{dist_name}'
    
    if state_feature not in user_input_dict or dist_feature not in user_input_dict:
        raise KeyError("State or district not found in the training data.")
    
    user_input_dict[state_feature] = 1.0
    user_input_dict[dist_feature] = 1.0
    
    user_input_encoded = pd.DataFrame([user_input_dict])
    prediction = model.predict(user_input_encoded)
    return prediction[0]

def main():
    try:
        # Step 1: Get user inputs
        user_nitrogen = float(input("Enter Nitrogen content: "))
        user_phosphorus = float(input("Enter Phosphorus content: "))
        user_potassium = float(input("Enter Potassium content: "))
        user_ph = float(input("Enter pH value: "))
        user_state = input("Enter State Name (e.g., 'Chhattisgarh'): ").strip()
        user_district = input("Enter District Name (e.g., 'Durg'): ").strip()
        user_month = int(input("Enter Month (1-12): "))
        
        if not 1 <= user_month <= 12:
            print("Invalid month input. Please enter a number between 1 and 12.")
            return
        
        # Step 2: Predict rainfall
        predicted_rainfall = predict_monthly_rainfall(user_month, user_state, user_district,
                                                    rainfall_model, rainfall_features)
        print(f"\nPredicted Rainfall for month {user_month} in {user_district}, {user_state}: {predicted_rainfall:.2f} mm")
        
        # Step 3: Predict humidity and temperature using rain model
        # Assuming rain_model expects a DataFrame with columns 'Month' and 'Rainfall'
        rain_model_input = pd.DataFrame({
            'Month': [user_month],
            'Rainfall': [predicted_rainfall]
        })
        
        # Predict returns array-like, assuming it returns [humidity, temperature]
        humidity_temp_pred = rain_model.predict(rain_model_input)
        
        # Check if output shape is correct
        if len(humidity_temp_pred.shape) == 1 or humidity_temp_pred.shape[1] != 2:
            print("Unexpected output shape from rain model. Expected two outputs: humidity and temperature.")
            return
        
        predicted_humidity = humidity_temp_pred[0][0]
        predicted_temperature = humidity_temp_pred[0][1]
        
        print(f"Predicted Humidity: {predicted_humidity:.2f}")
        print(f"Predicted Temperature: {predicted_temperature:.2f}")
        
        # Step 4: Predict crop using Model_1
        # Rainfall is now included in the input for the crop prediction model
        crop_model_input = pd.DataFrame({
            'Nitrogen': [user_nitrogen],
            'Phosphorus': [user_phosphorus],
            'Potassium': [user_potassium],
            'Temperature': [predicted_temperature],
            'Humidity': [predicted_humidity],
            'pH_Value': [user_ph],
            'Rainfall': [predicted_rainfall]
        })

        # Ensure correct order
        crop_features = ['Nitrogen','Phosphorus','Potassium','Temperature','Humidity','pH_Value','Rainfall']
        crop_model_input = crop_model_input[crop_features]

        probabilities = model_1.predict_proba(crop_model_input)[0]
        crop_labels = model_1.classes_
        crop_probabilities = dict(zip(crop_labels, probabilities))
        sorted_crops = sorted(crop_probabilities.items(), key=lambda x: x[1], reverse=True)
        top_5_crops_data = []
        for i in range(min(5, len(sorted_crops))):
            crop, prob = sorted_crops[i]
            top_5_crops_data.append({
                'crop_name': crop,
                'confidence': f"{prob * 100:.2f}%",
                'rank': i + 1
            })
        predicted_crop = top_5_crops_data[0]['crop_name']

        print(f"\nPrimary Predicted Crop: {predicted_crop}")
        print(f"Top 5 Recommendations: {top_5_crops_data}")
    #except ValueError:
    #    print("Invalid input. Please ensure numeric values are entered correctly.")
    except KeyError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    main()
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Step 1: Load the dataset
# This dataset contains historical rainfall, temperature, and humidity data.
try:
    # We will use the 'skipinitialspace=True' parameter to handle any leading spaces in the column names.
    df = pd.read_csv("backend\\datasets\\Rainfall_data.csv")
except FileNotFoundError:
    print("Error: 'Rain model.xlsx - Sheet1.csv' not found. Please ensure the file is in the correct directory.")
    exit()

print("Dataset loaded successfully.")
print("\nFirst 5 rows of the data:")
print(df.head())

# Step 2: Define features (X) and targets (y)
# Features for the model are 'Month' and 'Rainfall'
# Targets are 'Humidity' and 'Temperature'
features = ['Month', 'Rainfall']
# Correcting the column names to remove the leading space
targets = ['Humidity', 'Temperature']

X = df[features]
y = df[targets]

# Step 3: Split the data into training and testing sets
# We use an 80/20 split for training and testing.
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"\nTraining set size: {len(X_train)} samples")
print(f"Testing set size: {len(X_test)} samples")

# Step 4: Train the AI model
# RandomForestRegressor is a good choice for this multi-output regression problem.
print("\nTraining the RandomForestRegressor model...")
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
print("Model training complete.")

# Step 5: Evaluate the model
# We evaluate the model's performance on the test data.
y_pred = model.predict(X_test)

# Calculate performance metrics for each target variable
humidity_mse = mean_squared_error(y_test['Humidity'], y_pred[:, 0])
humidity_r2 = r2_score(y_test['Humidity'], y_pred[:, 0])

temp_mse = mean_squared_error(y_test['Temperature'], y_pred[:, 1])
temp_r2 = r2_score(y_test['Temperature'], y_pred[:, 1])

print("\n--- Model Evaluation ---")
print(f"Humidity Prediction:")
print(f"  Mean Squared Error (MSE): {humidity_mse:.2f}")
print(f"  R-squared (R2) Score: {humidity_r2:.2f}")

print(f"\nTemperature Prediction:")
print(f"  Mean Squared Error (MSE): {temp_mse:.2f}")
print(f"  R-squared (R2) Score: {temp_r2:.2f}")

# Step 6: Save the trained model to a file
model_filename = 'weather_prediction_model.joblib'
joblib.dump(model, model_filename)

print(f"\nModel saved to '{model_filename}' successfully.")
print("You can now use this file in your web application to predict weather parameters.")

# Step 7: Example usage: Get user input and predict
print("\n--- Weather Prediction based on User Input ---")

try:
    month = float(input("Enter the month (1-12): "))
    rainfall = float(input("Enter Rainfall (in mm): "))

    # Create a DataFrame for the user input
    user_input = pd.DataFrame([[month, rainfall]], columns=features)

    # Load the trained model
    loaded_model = joblib.load(model_filename)

    # Make predictions
    predicted_humidity, predicted_temperature = loaded_model.predict(user_input)[0]

    print("\nPredicted Weather Conditions:")
    print(f"  Predicted Humidity: {predicted_humidity:.2f}%")
    print(f"  Predicted Temperature: {predicted_temperature:.2f}°C")

except ValueError:
    print("Invalid input. Please enter numerical values.")

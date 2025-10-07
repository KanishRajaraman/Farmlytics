import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import numpy as np

# Step 1: Load the dataset
# We use the dataset provided by the user, which is a perfect
# training dataset for the crop prediction model.
try:
    df = pd.read_excel("D:\\EDA Agri project\\Datasets\\Crop_prediction.xlsx", sheet_name="Crop_Yield_Prediction")
except FileNotFoundError:
    print("Error: 'Crop_Yield_Prediction.xlsx - Crop_Yield_Prediction.csv' not found. Please ensure the file is in the correct directory.")
    exit()

# Remove leading and trailing spaces from column names
df.columns = df.columns.str.strip()

print("Dataset loaded successfully.")
print("\nFirst 5 rows of the data:")
print(df.head())

# Step 2: Define features (X) and target (y)
# The features now include Temperature, Humidity, and Rainfall.
features = ['Nitrogen','Phosphorus','Potassium','Temperature','Humidity','pH_Value','Rainfall']
target = 'Crop'

X = df[features]
y = df[target]

# Step 3: Split the data into training and testing sets
# We use a 80/20 split, meaning 80% of the data is for training
# and 20% is for evaluating the model's performance.
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"\nTraining set size: {len(X_train)} samples")
print(f"Testing set size: {len(X_test)} samples")

# Step 4: Train the AI model
# We will use the RandomForestClassifier, an ensemble learning method
# that is well-suited for classification problems like this.
print("\nTraining the RandomForestClassifier model...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
print("Model training complete.")

# Step 5: Evaluate the model
# We evaluate the model on the test data to see how well it performs
# on data it has never seen before.
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f"\nModel Accuracy: {accuracy * 100:.2f}%")
print("\nClassification Report:")
print(report)

# Step 6: Save the trained model to a file
# This allows us to load the model later in the web application
# without having to retrain it every time.
model_filename = 'crop_prediction_model_full.joblib'
joblib.dump(model, model_filename)

print(f"\nModel saved to '{model_filename}' successfully.")
print("You can now use this file in your web application for making predictions.")

# Step 7: Get user input and predict top 5 preferences
print("\n--- Crop Prediction based on User Input ---")

try:
    # Get user input for each feature
    nitrogen = float(input("Enter Nitrogen value: "))
    phosphorus = float(input("Enter Phosphorus value: "))
    potassium = float(input("Enter Potassium value: "))
    pH_value = float(input("Enter pH_Value: "))
    temperature = float(input("Enter Temperature value: "))
    humidity = float(input("Enter Humidity value: "))
    rainfall = float(input("Enter Rainfall value: "))

    # Create a DataFrame from the user input
    user_input = pd.DataFrame([[nitrogen, phosphorus, potassium, temperature, humidity, pH_value, rainfall]], columns=features)

    # Load the trained model
    loaded_model = joblib.load(model_filename)

    # Get prediction probabilities for all crops
    probabilities = loaded_model.predict_proba(user_input)[0]

    # Get the class labels (crop names)
    crop_labels = loaded_model.classes_

    # Create a dictionary of crops and their probabilities
    crop_probabilities = dict(zip(crop_labels, probabilities))

    # Sort the dictionary by probability in descending order
    sorted_crops = sorted(crop_probabilities.items(), key=lambda x: x[1], reverse=True)

    # Print the top 5 preferences
    print("\nTop 5 Crop Recommendations:")
    for i in range(5):
        crop, prob = sorted_crops[i]
        print(f"   {i+1}. {crop.ljust(15)} (Confidence: {prob * 100:.2f}%)")

except ValueError:
    print("Invalid input. Please enter numerical values for all parameters.")
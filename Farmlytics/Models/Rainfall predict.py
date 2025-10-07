import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Step 1: Load the dataset
try:
    df = pd.read_excel("D:\\EDA Agri project\\Datasets\\Monthly_rainfall.xlsx", sheet_name="Sheet1")
except FileNotFoundError:
    print("Error: 'Monthly rainfall.xlsx - Sheet1.csv' not found. Please ensure the file is in the correct directory.")
    exit()

print("Dataset loaded successfully.")

# Step 2: Reshape the data (Unpivot)
# Create a list of month columns to unpivot
month_cols = [
    'JANUARY RAINFALL (Millimeters)', 'FEBRUARY RAINFALL (Millimeters)', 'MARCH RAINFALL (Millimeters)',
    'APRIL RAINFALL (Millimeters)', 'MAY RAINFALL (Millimeters)', 'JUNE RAINFALL (Millimeters)',
    'JULY RAINFALL (Millimeters)', 'AUGUST RAINFALL (Millimeters)', 'SEPTEMBER RAINFALL (Millimeters)',
    'OCTOBER RAINFALL (Millimeters)', 'NOVEMBER RAINFALL (Millimeters)', 'DECEMBER RAINFALL (Millimeters)'
]

# We need to map month names to numbers (1-12)
month_mapping = {month: i + 1 for i, month in enumerate(month_cols)}

# Melt the DataFrame to unpivot the monthly rainfall columns
df_melted = df.melt(id_vars=['Year', 'State Name', 'Dist Name'],
                    value_vars=month_cols,
                    var_name='Month_Name',
                    value_name='Rainfall')

# Add a numerical month column
df_melted['Month'] = df_melted['Month_Name'].map(month_mapping)

# Drop the original month name column as it's no longer needed
df_melted.drop(columns=['Month_Name'], inplace=True)

# Step 3: Prepare the data for the model
# Features are Month, State Name, and Dist Name
features = ['Month', 'State Name', 'Dist Name']
target = 'Rainfall'

# Drop rows with any missing values in the relevant columns
df_cleaned = df_melted.dropna(subset=features + [target])

# Convert categorical features to numerical using one-hot encoding
df_encoded = pd.get_dummies(df_cleaned, columns=['State Name', 'Dist Name'], prefix=['State', 'Dist'])

# Separate features (X) and target (y)
X = df_encoded.drop(columns=[target, 'Year'])
y = df_encoded[target]

# Store the list of encoded feature names for later use in prediction
encoded_features = X.columns.tolist()

# Step 4: Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"\nTraining set size: {len(X_train)} samples")
print(f"Testing set size: {len(X_test)} samples")

# Step 5: Train the AI model
print("\nTraining the GradientBoostingRegressor model...")
model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
model.fit(X_train, y_train)
print("Model training complete.")

# Step 6: Evaluate the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("\n--- Model Evaluation ---")
print(f"Mean Squared Error (MSE): {mse:.2f}")
print(f"R-squared (R2) Score: {r2:.2f}")
print(f"The R-squared score indicates that approximately {r2*100:.2f}% of the variance in rainfall can be explained by the model's inputs (month, state, and district).")

# Step 7: Save the trained model and features list
model_filename = 'monthly_rainfall_model.joblib'
features_filename = 'monthly_features.joblib'
joblib.dump(model, model_filename)
joblib.dump(encoded_features, features_filename)

print(f"\nModel saved to '{model_filename}'.")
print(f"Encoded features list saved to '{features_filename}'.")

# Step 8: Example usage: Get user input and predict
print("\n--- Monthly Rainfall Prediction based on User Input ---")

def predict_monthly_rainfall(month, state_name, dist_name, model, features_list):
    """
    Predicts the monthly rainfall for a given month, state, and district.
    """
    # Create a dictionary to hold the features
    user_input_dict = {feature: 0.0 for feature in features_list}
    
    # Set the user's inputs
    user_input_dict['Month'] = month
    user_input_dict[f'State_{state_name}'] = 1.0
    user_input_dict[f'Dist_{dist_name}'] = 1.0

    # Create a DataFrame from the dictionary
    user_input_encoded = pd.DataFrame([user_input_dict])
    
    # Make the prediction
    prediction = model.predict(user_input_encoded)
    return prediction[0]

try:
    user_month = int(input("Enter a Month (1-12): "))
    user_state = input("Enter a State Name (e.g., 'Chhattisgarh'): ")
    user_dist = input("Enter a District Name (e.g., 'Durg'): ")

    if not 1 <= user_month <= 12:
        print("Invalid month input. Please enter a number between 1 and 12.")
    else:
        loaded_model = joblib.load(model_filename)
        loaded_features = joblib.load(features_filename)

        predicted_rainfall = predict_monthly_rainfall(user_month, user_state, user_dist, loaded_model, loaded_features)

        print(f"\nPredicted Rainfall for month {user_month} in {user_dist}, {user_state}: {predicted_rainfall:.2f} mm")

except ValueError:
    print("Invalid input. Please ensure month is an integer and names are strings.")
except KeyError:
    print("State or district not found in the training data.")

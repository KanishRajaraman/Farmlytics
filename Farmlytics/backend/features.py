import pandas as pd
import joblib

# Load the dataset
try:
    df = pd.read_csv('backend\\datasets\\Monthly rainfall.csv')
except FileNotFoundError:
    print("Error: 'Monthly rainfall.xlsx' not found. Please ensure the file is in the correct directory.")
    exit()

# Print the original column names for verification
print("Original Columns:")
print(df.columns)

# Step 1: One-hot encode 'State Name' and 'Dist Name'
# This creates new columns for each unique state and district.
try:
    df_encoded = pd.get_dummies(df, columns=['State Name', 'Dist Name'])
except KeyError:
    print("\nError: The dataset does not contain 'State Name' or 'Dist Name' columns. Please check your data.")
    exit()

# Step 2: Extract the feature names
# We remove the month columns and the 'Year' column, as they are not
# part of the one-hot encoded location features. We also remove
# 'ANNUAL RAINFALL (Millimeters)' since that is a target variable.
# The 'Rainfall' column is also removed to prevent conflicts if present.
# The remaining columns are the one-hot encoded location features.

# Get the list of columns to drop
columns_to_drop = ['Year', 'ANNUAL RAINFALL (Millimeters)']
monthly_rainfall_columns = [col for col in df_encoded.columns if 'RAINFALL (Millimeters)' in col]
columns_to_drop.extend(monthly_rainfall_columns)

# Ensure 'Year' and 'ANNUAL RAINFALL (Millimeters)' columns are present before dropping
df_features = df_encoded.drop(columns=[col for col in columns_to_drop if col in df_encoded.columns], errors='ignore')

# Extract feature names
monthly_features = df_features.columns.tolist()

# Print the features
print("\nOne-hot Encoded Monthly Features:")
for feature in monthly_features:
    print(feature)

# Step 3: Save the list of feature names
# This list is crucial for a separate script to make predictions,
# as it ensures the input data has the same structure as the training data.
joblib.dump(monthly_features, 'monthly_features.joblib')

print("\nFeature list saved to 'monthly_features.joblib' successfully.")

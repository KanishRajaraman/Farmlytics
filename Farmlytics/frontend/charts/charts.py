import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

# Load the dataset
df = pd.read_excel("D:\\EDA Agri project\\Datasets\\Crop_prediction.xlsx", sheet_name="Crop_Yield_Prediction")

# Plot 1: Crop Distribution
fig1 = px.bar(df, x='Crop', title='Crop Distribution in the Dataset',
              labels={'Crop': 'Crop Type', 'count': 'Number of Entries'})
fig1.update_layout(xaxis_tickangle=-45)
fig1.write_html("crop_distribution_chart.html", include_plotlyjs='cdn')

# Plot 2: Correlation Heatmap
correlation_matrix = df.corr(numeric_only=True)
fig2 = px.imshow(correlation_matrix,
                 text_auto=True,
                 title='Correlation Heatmap of Numerical Features')
fig2.write_html("correlation_heatmap.html")

# Plot 3: NPK Values by Crop
fig3 = go.Figure()
for crop in df['Crop'].unique():
    crop_data = df[df['Crop'] == crop]
    fig3.add_trace(go.Box(y=crop_data['Nitrogen'], name=f'N ({crop})', boxpoints='all', jitter=0.3))
    fig3.add_trace(go.Box(y=crop_data['Phosphorus'], name=f'P ({crop})', boxpoints='all', jitter=0.3))
    fig3.add_trace(go.Box(y=crop_data['Potassium'], name=f'K ({crop})', boxpoints='all', jitter=0.3))

fig3.update_layout(title='NPK Values Distribution by Crop',
                   yaxis_title='NPK Value',
                   showlegend=False)
fig3.write_html("npk_values_chart.html")

# Plot 4: Temperature Requirements by Crop
fig4 = px.box(df, x='Crop', y='Temperature', title='Temperature Range for Each Crop',
              labels={'Crop': 'Crop Type', 'Temperature': 'Temperature (°C)'})
fig4.update_layout(xaxis_tickangle=-45)
fig4.write_html("temperature_chart.html")

# Plot 5: Humidity Requirements by Crop
fig5 = px.box(df, x='Crop', y='Humidity', title='Humidity Range for Each Crop',
              labels={'Crop': 'Crop Type', 'Humidity': 'Humidity (%)'})
fig5.update_layout(xaxis_tickangle=-45)
fig5.write_html("humidity_chart.html")

# Plot 6: pH Value Distribution by Crop
fig6 = px.box(df, x='Crop', y='pH_Value', title='pH Value Range for Each Crop',
              labels={'Crop': 'Crop Type', 'pH_Value': 'pH Value'})
fig6.update_layout(xaxis_tickangle=-45)
fig6.write_html("ph_value_chart.html")

# Plot 7: Rainfall Requirements by Crop
fig7 = px.box(df, x='Crop', y='Rainfall', title='Rainfall Range for Each Crop',
              labels={'Crop': 'Crop Type', 'Rainfall': 'Rainfall (mm)'})
fig7.update_layout(xaxis_tickangle=-45)
fig7.write_html("rainfall_chart.html")
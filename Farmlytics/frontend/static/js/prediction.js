// /static/js/prediction.js

// NOTE: We remove the direct 'import' of CROP_GUIDES here to avoid module initialization failures.
// The guide page (guide.js) will handle the cost lookup using the simplified data saved below.

document.getElementById('predictionForm').addEventListener('submit', async function(event) {
    // CRITICAL FIX: This stops the browser from submitting the form normally (which causes the refresh).
    event.preventDefault();

    // Show a loading state on the button
    const predictBtn = this.querySelector('.predict-btn');
    predictBtn.textContent = 'Analyzing...';
    predictBtn.disabled = true;

    // 1. Collect Data from the Form
    const formData = new FormData(this);
    const data = {
        nitrogen: formData.get('nitrogen'),
        phosphorus: formData.get('phosphorus'),
        potassium: formData.get('potassium'),
        ph: formData.get('ph'),
        state: formData.get('state'),
        district: formData.get('district'),
        Month: formData.get('Month'),
    };

    console.log("Collected form data:", data);
    
    // 2. Send Data to the Backend API
    try {
        const response = await fetch('http://127.0.0.1:5000/api/predict-crop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // **START OF DATA ENRICHMENT & SESSION STORAGE**
        
        if (!result.top_5 || !Array.isArray(result.top_5) || result.top_5.length === 0) {
            throw new Error("Backend structure error: 'top_5' list is missing or invalid in the API response.");
        }
        
        // Save only the top 5 crop names to session storage.
        // The cost lookup must now be handled entirely by guide.js.
        const top5CropNames = result.top_5.map(item => item.crop_name);

        // Save the simplified list of names for the dropdown on the guide page
        sessionStorage.setItem('top5Crops', JSON.stringify(top5CropNames));
        
        // **END OF DATA ENRICHMENT & SESSION STORAGE**
        
        // 3. Display the prediction result on the page and link to the guide
        displayPrediction(result); 

    } catch (error) {
        // Handle errors (e.g., show an error message to the user)
        console.error("Error making prediction:", error);
        alert(error.message || "An error occurred during prediction. Please check your inputs and ensure the backend server is running correctly.");
    } finally {
        // Restore the button state
        predictBtn.textContent = 'Get Recommendation'; 
        predictBtn.disabled = false;
    }
});

/**
 * Displays the prediction result on the page and updates the guide link.
 * @param {object} result - The result object from the API, including 'top_5' list.
 */
function displayPrediction(result) {
    const resultSection = document.getElementById('predictionResult');
    
    // Populate the main result fields (using the top-ranked item)
    const primaryCrop = result.top_5[0];
    const predictedCropName = primaryCrop.crop_name;
    
    document.getElementById('predictedCrop').textContent = predictedCropName;
    document.getElementById('confidence').textContent = primaryCrop.confidence; // Use confidence from the list
    
    // NOTE: Assuming image_url and recommendation_text are part of the 'result' object for the primary crop.
    document.getElementById('cropImage').src = result.image_url || `../static/images/${predictedCropName.toLowerCase().replace(" ", "")}.png`;
    document.getElementById('recommendationText').textContent = result.recommendation_text || `Based on the provided soil and location data, **${predictedCropName}** is the most highly recommended crop for successful farming.`;


    // Set the dynamic link to the full crop guide page
    const guideLink = document.getElementById('guideLink');
    guideLink.href = `../templates/guide.html?crop=${encodeURIComponent(predictedCropName)}`;

    // --- CODE FOR TOP 5 DISPLAY ---
    const top5Container = document.getElementById('top5Recommendations');
    let top5Html = '<ul>';
    
    // Use result.top_5 which is an array of objects: [{crop_name: 'Rice', confidence: '99.99%', rank: 1}, ...]
    result.top_5.forEach(item => {
        // Highlight the top-ranked crop
        const className = item.rank === 1 ? 'class="primary-rec"' : '';
        top5Html += `<li ${className}>
            <span class="crop-name-li">${item.crop_name}</span>
            <span class="confidence-score">${item.confidence}</span>
        </li>`;
    });

    top5Html += '</ul>';
    top5Container.innerHTML = top5Html;
    // --- END CODE FOR TOP 5 DISPLAY ---

    // Make the result section visible
    resultSection.style.display = 'block';

    // Scroll to the result
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('guideLink').addEventListener('click', function() {
    window.location.href = '../templates/guide.html';
});

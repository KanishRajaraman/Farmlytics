// /static/js/calculator.js

// Import the external crop guide data
import { CROP_GUIDES } from './rice_guide_data.js';

// --- Placeholder Data & Constants ---
// In a real application, average yield would come from a model or historical data.
const AVERAGE_YIELDS_QTL_PER_HA = {
    "Rice": 45,      // Quintals per Hectare
    "Jute": 28,
    "Orange": 300,   // Quintals (of fruit) per Hectare
    "Pomegranate": 150,
    "Apple": 180,
    "Maize": 60,
    "Pigeonpea": 18,
    // Add other crops here
};

// --- Helper function to extract cost (Duplicated for fallback/consistency with prediction.js) ---
function extractAverageCostPerHa(cropName) {
    const guide = CROP_GUIDES[cropName];
    if (!guide) return null;

    // Look for Total Operational Cost (A) summary in the 'financials' section
    const costHtml = guide.financials;
    const regex = /Total Operational \(Variable\) Costs \(A\):\s*₹\s*([0-9,]+)\s*-\s*₹\s*([0-9,]+)/i;
    const match = costHtml.match(regex);

    if (match) {
        // Extract lower and upper bounds, remove commas, and parse as integers
        const lowerBound = parseInt(match[1].replace(/,/g, ''));
        const upperBound = parseInt(match[2].replace(/,/g, ''));
        // Return the average of the range
        return (lowerBound + upperBound) / 2;
    }
    
    // Fallback using hardcoded averages
    switch (cropName) {
        case "Rice": return 75000; 
        case "Maize": return 62500;
        case "Pigeonpea": return 47500;
        case "Jute": return 55000;
        case "Orange": return 30000;
        case "Pomegranate": return 50000;
        case "Apple": return 80000;
        default: return 50000; // Generic fallback
    }
}
// --- End Helper function ---

// --- Page Initialization ---

function initializeCalculatorPage() {
    const cropSelect = document.getElementById('cropName');
    // NOTE: Reading the new key saved by prediction.js
    const top5String = sessionStorage.getItem('top5CropsWithCosts'); 
    let cropsToDisplay = [];

    // 1. Retrieve the enriched list from session storage
    if (top5String) {
        try {
            cropsToDisplay = JSON.parse(top5String);
        } catch (e) {
            console.error("Error parsing top5CropsWithCosts from session storage:", e);
        }
    }

    // Fallback if prediction hasn't run or failed to save data: Use all available crops
    if (cropsToDisplay.length === 0) {
        // Use all available crops from the guide data
        cropsToDisplay = Object.keys(CROP_GUIDES).map(name => ({ 
            crop_name: name, 
            avgCostPerHa: extractAverageCostPerHa(name) 
        }));
    }

    // 2. Populate Dropdown
    cropsToDisplay.forEach(crop => {
        // Ensure the crop name is valid and we have an average cost
        if (crop.crop_name && crop.avgCostPerHa !== null) {
            const option = document.createElement('option');
            option.value = crop.crop_name;
            option.textContent = crop.crop_name;
            
            // Store the cost as a data attribute on the option element
            option.dataset.cost = crop.avgCostPerHa; 
            cropSelect.appendChild(option);
        }
    });

    // 3. Setup Form Submission Listener
    document.getElementById('calculatorForm').addEventListener('submit', handleCalculation);
}

// --- Calculation Logic ---

function handleCalculation(event) {
    event.preventDefault();

    const form = event.target;
    const cropName = form.cropName.value;
    const landArea = parseFloat(form.landArea.value);
    const budget = parseFloat(form.budget.value);
    
    const resultSection = document.getElementById('calculationResult');
    const budgetWarning = document.getElementById('budgetWarning');
    const totalCostElement = document.getElementById('totalCost');
    const harvestYieldElement = document.getElementById('harvestYield');
    const resultTitleElement = document.getElementById('resultTitle');

    // Get the selected option element
    const selectedOption = form.cropName.options[form.cropName.selectedIndex];

    // Get the cost per hectare directly from the data attribute saved during initialization
    const costPerHa = parseFloat(selectedOption.dataset.cost);
    
    // Reset visibility
    resultSection.style.display = 'none';
    budgetWarning.style.display = 'none';
    totalCostElement.textContent = '...';
    harvestYieldElement.textContent = '...';
    
    if (!cropName || isNaN(landArea) || isNaN(budget) || landArea <= 0 || isNaN(costPerHa)) {
        console.error("Invalid input data or missing crop cost.");
        alert("Please select a crop and ensure Land Area and Budget are valid numbers.");
        return; 
    }

    // 1. Determine Yield per Hectare
    const yieldPerHa = AVERAGE_YIELDS_QTL_PER_HA[cropName] || 30; // Use 30 as a generic fallback yield

    // 2. Perform Calculations
    const totalCostEstimate = landArea * costPerHa;
    const potentialYieldQuintals = landArea * yieldPerHa;
    
    // 3. Display Results
    
    // Format currency
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    });
    
    resultTitleElement.textContent = `Financial Estimate for ${cropName}`;
    totalCostElement.textContent = formatter.format(totalCostEstimate);
    harvestYieldElement.textContent = `${potentialYieldQuintals.toFixed(1)} Quintals`;

    resultSection.style.display = 'block';

    // 4. Budget Check
    if (budget < totalCostEstimate) {
        budgetWarning.textContent = `Warning: Your budget (${formatter.format(budget)}) is insufficient. Required: ${formatter.format(totalCostEstimate)}.`;
        budgetWarning.style.display = 'block';
    }

    resultSection.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', initializeCalculatorPage);

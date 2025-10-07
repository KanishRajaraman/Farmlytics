// /static/js/dashboard.js

let charts = [];

// --- NEW DATA STRUCTURE FOR GOVERNMENT SCHEMES ---
const GOVERNMENT_SCHEMES = [
    {
        name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        description: "A crop insurance scheme that provides comprehensive insurance coverage against failure of the crop, helping stabilize farmer income. It covers pre-sowing to post-harvest risks.\n Link: https://pmfby.gov.in/"
    },
    {
        name: "Kisan Credit Card (KCC) Scheme",
        description: "Provides farmers with timely and adequate credit support from the banking system for their cultivation needs, including the purchase of inputs and machinery, with lower interest rates.\n Link: https://www.myscheme.gov.in/schemes/kcc"
    },
    {
        name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        description: "A direct income support scheme providing ₹6,000 per year in three equal installments to all eligible farmer families across the country.\n Link: https://services.india.gov.in/service/detail/pm-kisan-samman-nidhi"
    },
    {
        name: "Soil Health Card (SHC) Scheme",
        description: "A scheme to issue Soil Health Cards to farmers, which carries crop-wise recommendations of nutrients and fertilizers required for individual farms to help farmers improve productivity sustainably.\n Link: https://soilhealth.dac.gov.in/"
    }
];
// ----------------------------------------------------

// Existing functions (Modified to call renderSchemes)
async function loadDashboardData() {
    const crop = document.getElementById('cropFilter')?.value;
    const startDate = document.getElementById('startDate')?.value;
    const endDate = document.getElementById('endDate')?.value;
    
    // Note: Filter inputs are not in the current dashboard.html, but the JS logic remains.
    
    const params = new URLSearchParams({
        crop: crop || '',
        start_date: startDate || '2020-01-01',
        end_date: endDate || '2025-12-31'
    });
    
    try {
        // Mock fetch response since there's no live API/server context here
        // const response = await fetch(`/api/dashboard-data?${params}`);
        // const data = await response.json();
        
        // Mock data structure:
        const data = {
            summary: {
                total_records: 1200, avg_yield: 2.8, avg_temperature: 28.5, total_crops: 15
            },
            visualizations: {}
        };
        
        updateSummaryCards(data.summary);
        createVisualizations(data.visualizations);
        renderSchemes(GOVERNMENT_SCHEMES); // NEW: Render schemes after loading data
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
        renderSchemes(GOVERNMENT_SCHEMES); // Fallback render
    }
}

function updateSummaryCards(summary) {
    // These elements don't exist in dashboard.html, but the function is preserved.
    // if (document.getElementById('totalRecords')) {
    //     document.getElementById('totalRecords').textContent = summary.total_records || 0;
    //     document.getElementById('avgYield').textContent = (summary.avg_yield || 0).toFixed(2) + ' tons/ha';
    //     document.getElementById('avgTemp').textContent = (summary.avg_temperature || 0).toFixed(1) + ' °C';
    //     document.getElementById('totalCrops').textContent = summary.total_crops || 0;
    // }
}

function createVisualizations(visualizations) {
    // Clear existing charts
    charts.forEach(chart => chart.destroy());
    charts = [];
    
    // The visualization area now only contains an iframe in dashboard.html.
    // The chart creation logic is preserved in case the user re-adds summary charts.
    
    // createChart('yieldByCropChart', 'bar', visualizations.yield_by_crop);
    // createChart('tempDistChart', 'pie', visualizations.temperature_distribution);
    // createScatterChart('rainfallYieldChart', visualizations.rainfall_vs_yield);
}

// --- NEW FUNCTIONS FOR SCHEMES ---

function toggleSchemeDescription(event) {
    let card = event.currentTarget;
    let description = card.querySelector('.scheme-description');
    
    // Toggle the 'expanded' class
    description.classList.toggle('expanded');
    
    // Optional: Collapse other expanded descriptions
    document.querySelectorAll('.scheme-description.expanded').forEach(desc => {
        if (desc !== description) {
            desc.classList.remove('expanded');
        }
    });
}

function createSchemeCard(scheme) {
    const card = document.createElement('div');
    card.className = 'scheme-card';

    // Extract link if present in description
    let description = scheme.description;
    let linkMatch = description.match(/Link:\s*(https?:\/\/[^\s]+)/i);
    let linkHtml = '';
    if (linkMatch) {
        // Remove the link from the description text
        description = description.replace(linkMatch[0], '').trim();
        // Add the link as a separate, accessible element
        linkHtml = `<br><a href="${linkMatch[1]}" target="_blank" rel="noopener noreferrer" class="scheme-link">Visit Official Site</a>`;
    }

    card.innerHTML = `
        <div class="scheme-title">${scheme.name}</div>
        <div class="scheme-description">
            ${description}
            ${linkHtml}
        </div>
    `;
    card.addEventListener('click', toggleSchemeDescription);
    return card;
}

function renderSchemes(schemes) {
    const schemesGrid = document.getElementById('schemesGrid');
    if (!schemesGrid) return;

    // Clear the loading message
    schemesGrid.innerHTML = '';

    schemes.forEach(scheme => {
        schemesGrid.appendChild(createSchemeCard(scheme));
    });
}

// End of NEW FUNCTIONS FOR SCHEMES
// ---------------------------------

// Event listener (preserved but commented out since filters aren't in HTML)
// document.getElementById('applyFilters').addEventListener('click', loadDashboardData);

// Load initial data
document.addEventListener('DOMContentLoaded', loadDashboardData);
// /static/js/guide.js

// Data Model (Must contain guides for all possible crops)
const CROP_GUIDES = {
    // ----------------------------------------------------------------------
    // 1. RICE (Kharif/Wet Season)
    // ----------------------------------------------------------------------
    "Rice": {
        details: "The staple crop of India, requiring warm temperatures (20°C to 35°C) and high rainfall/irrigation. Primarily grown during the Kharif (wet/monsoon) season.",
        
        plantation: `
            <h4>Soil and Land Preparation:</h4>
            <ul>
                <li><strong>Method: Puddling</strong>. Requires intensive tillage—Plough land 2-3 times under flooded conditions to create a fine, soft puddled soil.</li>
                <li><strong>Leveling:</strong> Crucial for uniform water depth and distribution across the field.</li>
                <li><strong>Cost Driver:</strong> Machine Labour (Tillage, Puddling) is a major operational cost component (₹ 9,000 - ₹ 14,000/Ha).</li>
            </ul>
            <h4>Seeds and Sowing:</h4>
            <ul>
                <li><strong>Seed Type:</strong> Use hybrid/improved seed varieties and ensure proper seed treatment.</li>
                <li><strong>Nursery:</strong> Seedlings should be raised in a separate nursery bed for 20-25 days.</li>
                <li><strong>Transplanting:</strong> Seedlings are transplanted by hand or machine into the puddled field. This is the **highest manual labor cost** (₹ 10,000 - ₹ 18,000/Ha).</li>
                <li><strong>Spacing:</strong> Maintain 20 cm row spacing and 10 cm plant spacing.</li>
            </ul>
        `,
        
        maintenance: `
            <h4>Water Management:</h4>
            <ul>
                <li><strong>Requirement:</strong> Keep the field **continuously flooded (2-5 cm water)** from transplanting until the grain reaches the dough stage.</li>
                <li><strong>Irrigation Cost:</strong> Irrigation charges for pumping groundwater or canal water are substantial (₹ 4,000 - ₹ 7,000/Ha).</li>
            </ul>
            <h4>Nutrient Management (Fertilizers):</h4>
            <ul>
                <li><strong>Basal Dose:</strong> Apply a balanced NPK dose before transplanting.</li>
                <li><strong>Top Dressing:</strong> Nitrogen fertilizer (Urea) must be top dressed in 2-3 splits (Tillering and Panicle initiation stages) to maximize yield.</li>
                <li><strong>Fertilizer Cost:</strong> This is a major input cost (₹ 8,000 - ₹ 15,000/Ha), varying by subsidy and market price.</li>
            </ul>
            <h4>Pest and Weed Control:</h4>
            <ul>
                <li><strong>Weedicides:</strong> Essential for control (₹ 1,500 - ₹ 3,500/Ha).</li>
                <li><strong>Pests:</strong> Monitor continuously for common pests like stem borer and rice hispa. Timely use of insecticides/fungicides is necessary (₹ 2,000 - ₹ 4,000/Ha).</li>
            </ul>
        `,
        
        financials: `
            <h4>Total Cost Summary (Per Hectare):</h4>
            <ul>
                <li><strong>Total Operational (Variable) Costs (A):</strong> ₹ 65,000 - ₹ 85,000</li>
                <li><strong>Total Fixed (Overhead) Costs (B):</strong> ₹ 25,000 - ₹ 45,000 (Includes imputed land rental value).</li>
            </ul>
            <h4>Major Operational Costs Breakdown:</h4>
            <ul>
                <li><strong>Transplanting Labour:</strong> ₹ 10,000 - ₹ 18,000 (Highest single labour component).</li>
                <li><strong>Land Preparation:</strong> ₹ 9,000 - ₹ 14,000 (Due to puddling).</li>
                <li><strong>Fertilizers (NPK):</strong> ₹ 8,000 - ₹ 15,000.</li>
                <li><strong>Harvesting & Threshing:</strong> ₹ 11,000 - ₹ 17,000 (Combined machine and manual labor).</li>
            </ul>
            <h4>Market Outlook:</h4>
            <p>Rice enjoys high market stability due to high consumer demand and strong Government Minimum Support Price (MSP) policies. Prices are generally reliable.</p>
        `,
        // ADDED FOR CALCULATOR
        costRange: [65000, 85000], 
        yield: 50, // Quintals/Ha (Placeholder)
        pricePerQuintal: 2500 // Placeholder Avg Price in ₹
    },
    
    // ----------------------------------------------------------------------
    // 2. JUTE (Kharif/Fibre Crop) - NEW DETAILED GUIDE
    // ----------------------------------------------------------------------
    "Jute": {
        details: "A major commercial fiber crop requiring a hot, wet climate (24°C to 37°C) and heavy, well-distributed rainfall (150-250 cm). Cultivated mainly in the rainy season.",
        
        plantation: `
            <h4>Soil and Land Preparation:</h4>
            <ul>
                <li><strong>Soil Type:</strong> Alluvial or loamy soils are ideal.</li>
                <li><strong>Tillage:</strong> Requires intensive tillage (3-4 ploughings) to achieve a fine, loose seedbed, which is crucial for uniform germination.</li>
                <li><strong>Timing:</strong> Sowing should be done early—March to May (pre-monsoon)—to utilize natural rainfall.</li>
            </ul>
            <h4>Seeds and Sowing:</h4>
            <ul>
                <li><strong>Sowing Method:</strong> Row sowing (30 cm apart) is preferred over broadcasting as it facilitates easier weeding and inter-cultivation.</li>
                <li><strong>Fertilizer Basal:</strong> Apply a balanced dose of Nitrogen, Phosphorus, and Potassium during the final ploughing.</li>
            </ul>
        `,
        
        maintenance: `
            <h4>Weed and Pest Control:</h4>
            <ul>
                <li><strong>Weeding:</strong> Intensive weeding is essential, especially in the first 4-6 weeks of growth. Chemical weedicides followed by manual weeding are common.</li>
                <li><strong>Pests:</strong> Monitor for Jute Semilooper and Jute Hairy Caterpillar.</li>
            </ul>
            <h4>Water and Nutrients:</h4>
            <ul>
                <li><strong>Water:</strong> Needs plenty of water, but drainage is equally important to prevent waterlogging.</li>
                <li><strong>Top Dressing:</strong> Jute is a heavy Nitrogen feeder. Top dress Nitrogen in 2-3 splits, particularly after thinning.</li>
            </ul>
            <h4>Retting (Post-Harvest Process):</h4>
            <ul>
                <li><strong>Crucial Step:</strong> After harvest, the bundles are submerged in slow-moving or stagnant water for 15-20 days to separate the fiber. This process is highly labor-intensive.</li>
            </ul>
        `,
        
        financials: `
            <h4>Total Cost Summary (Per Hectare):</h4>
            <ul>
                <li><strong>Total Operational (Variable) Costs (A):</strong> ₹ 45,000 - ₹ 65,000</li>
                <li><strong>Key Cost Driver:</strong> Labor for **Retting** and **Weeding**.</li>
            </ul>
            <h4>Major Operational Costs Breakdown:</h4>
            <ul>
                <li><strong>Retting Labour:</strong> ₹ 12,000 - ₹ 18,000 (Single highest labor cost component).</li>
                <li><strong>Fertilizers (High N):</strong> ₹ 7,000 - ₹ 12,000.</li>
                <li><strong>Weeding & Inter-cultivation:</strong> ₹ 5,000 - ₹ 10,000.</li>
            </ul>
            <h4>Market Outlook:</h4>
            <p>Market demand is cyclical, tied to the demand for natural fiber packaging (sacks, geo-textiles). Prices are subject to volatility based on seasonal output.</p>
        `,
        // ADDED FOR CALCULATOR
        costRange: [45000, 65000],
        yield: 25, // Quintals/Ha (Placeholder for dry fiber)
        pricePerQuintal: 6000 // Placeholder Avg Price in ₹
    },
    
    // ----------------------------------------------------------------------
    // 3. ORANGE (Horticulture/Sub-tropical) - NEW DETAILED GUIDE
    // ----------------------------------------------------------------------
    "Orange": {
        details: "A sub-tropical fruit tree (e.g., Mandarin, Sweet Orange). Requires a moderate climate with dry, sunny periods for high-quality fruit setting and ripening.",
        
        plantation: `
            <h4>Soil and Land Preparation:</h4>
            <ul>
                <li><strong>Soil Type:</strong> Well-drained loamy to sandy loam soils. Heavy clay soils must be strictly avoided.</li>
                <li><strong>Pitting:</strong> Dig pits (1m x 1m x 1m) and fill them with topsoil, Farm Yard Manure (FYM), and superphosphate.</li>
            </ul>
            <h4>Planting and Spacing:</h4>
            <ul>
                <li><strong>Method:</strong> Use certified **budded seedlings** for consistent yield and fruit quality.</li>
                <li><strong>Spacing:</strong> Standard spacing ranges from 5m x 5m to 6m x 6m (300-400 plants/Ha).</li>
                <li><strong>Timing:</strong> Planting is best done at the onset of the monsoon (June-August).</li>
            </ul>
        `,
        
        maintenance: `
            <h4>Water Management:</h4>
            <ul>
                <li><strong>Requirement:</strong> Water application is critical during **flowering, fruit setting, and fruit development**. Avoid water stagnation.</li>
                <li><strong>Method:</strong> **Drip irrigation** is highly recommended for efficient water use and disease prevention.</li>
            </ul>
            <h4>Nutrient Management:</h4>
            <ul>
                <li><strong>Application:</strong> Requires balanced NPK based on soil testing, supplemented with crucial micro-nutrients like **Zinc and Manganese** via foliar spray.</li>
            </ul>
            <h4>Pruning and Training:</h4>
            <ul>
                <li>**Pruning:** Light annual pruning is needed to remove dead/diseased wood and maintain an open canopy for light penetration.</li>
                <li>**Training:** Young trees require training to establish a strong central leader or modified central leader system.</li>
            </ul>
        `,
        
        financials: `
            <h4>Cost Structure:</h4>
            <ul>
                <li><strong>High Initial Investment (Fixed Cost):</strong> The cost of budded planting material and establishing the orchard/irrigation system is substantial (₹ 50,000 - ₹ 1,00,000+).</li>
                <li><strong>Long Maturity:</strong> Trees start yielding commercially in 3–5 years.</li>
            </ul>
            <h4>Major Operational Costs (Per Hectare - Annual):</h4>
            <ul>
                <li><strong>Fertilizer/Nutrients:</strong> ₹ 15,000 - ₹ 25,000 (High NPK and micro-nutrient cost).</li>
                <li><strong>Pest/Disease Control:</strong> ₹ 10,000 - ₹ 20,000 (To control citrus canker, trunk borer, etc.).</li>
                <li><strong>Harvesting & Packing:</strong> Varies significantly by yield (High labor cost).</li>
            </ul>
            <h4>Market Outlook:</h4>
            <p>Orange juice and fresh fruit command high consumer demand. Prices are stable but may see seasonal dips during peak harvest season. Export quality fruit fetches a premium.</p>
        `,
        // ADDED FOR CALCULATOR
        costRange: [40000, 60000], // Annual operational cost (excluding initial investment)
        yield: 250, // Quintals/Ha (Placeholder)
        pricePerQuintal: 4500 // Placeholder Avg Price in ₹
    },
    
    // ----------------------------------------------------------------------
    // 4. POMEGRANATE (Horticulture/Arid) - NEW DETAILED GUIDE
    // ----------------------------------------------------------------------
    "Pomegranate": {
        details: "A hardy fruit crop suitable for semi-arid and arid regions. It tolerates high temperatures and drought but is highly susceptible to bacterial diseases under humid conditions.",
        
        plantation: `
            <h4>Soil and Land Preparation:</h4>
            <ul>
                <li><strong>Soil Type:</strong> Thrives in sandy loam to deep alluvial soils. Soil pH tolerance is wide (up to 8.5).</li>
                <li><strong>Pitting:</strong> Dig deep pits (0.6m x 0.6m x 0.6m) and fill them with manure and soil mix.</li>
            </ul>
            <h4>Planting and Spacing:</h4>
            <ul>
                <li><strong>Method:</strong> Use cuttings or air layering (anab-e-shahi variety is common).</li>
                <li><strong>Season:</strong> Best planted in July-August.</li>
                <li><strong>Spacing:</strong> Standard spacing is 4m x 3m to 5m x 5m (400-800 plants/Ha).</li>
            </ul>
        `,
        
        maintenance: `
            <h4>Water Management and Bahar Treatment:</h4>
            <ul>
                <li><strong>Drought Tolerance:</strong> Requires less water than other fruits, but specific irrigation is needed for high yield.</li>
                <li><strong>Bahar Treatment:</strong> Water stress is intentionally imposed to induce flowering (Bahar) during the most favorable period (e.g., Feb-March or June-July) for harvesting.</li>
            </ul>
            <h4>Pest and Disease Control:</h4>
            <ul>
                <li><strong>High Risk:</strong> Highly susceptible to **Bacterial Blight** and **Fruit Borer**.</li>
                <li>**Control:** Requires an **intensive and preventative spray schedule** using copper-based fungicides and appropriate insecticides.</li>
            </ul>
            <h4>Pruning and Training:</h4>
            <ul>
                <li>**Training:** Trained to a single stem or multiple stems.</li>
                <li>**Pruning:** Remove unwanted shoots and water sprouts regularly.</li>
            </ul>
        `,
        
        financials: `
            <h4>Cost Structure:</h4>
            <ul>
                <li><strong>Initial Investment:</strong> Moderate. Plants yield commercially in 2-3 years.</li>
                <li><strong>Key Cost Driver:</strong> Plant Protection is the highest operational cost.</li>
            </ul>
            <h4>Major Operational Costs (Per Hectare - Annual):</h4>
            <ul>
                <li><strong>Plant Protection (Fungicides/Insecticides):</strong> ₹ 20,000 - ₹ 35,000 (High due to Blight risk).</li>
                <li><strong>Fertilizer/Manure:</strong> ₹ 10,000 - ₹ 18,000.</li>
                <li><strong>Labor (Bahar, Pruning, Harvesting):</strong> Highly variable.</li>
            </ul>
            <h4>Market Outlook:</h4>
            <p>Excellent export potential due to high demand for high-quality fruit. Domestic prices are consistently high, making it a potentially very profitable crop, provided the farmer manages bacterial blight effectively.</p>
        `,
        // ADDED FOR CALCULATOR
        costRange: [40000, 60000], // Annual operational cost
        yield: 150, // Quintals/Ha (Placeholder)
        pricePerQuintal: 8000 // Placeholder Avg Price in ₹
    },
    
    // ----------------------------------------------------------------------
    // 5. APPLE (Horticulture/Temperate) - NEW DETAILED GUIDE
    // ----------------------------------------------------------------------
    "Apple": {
        details: "A temperate fruit requiring a prolonged **chilling period** (1,000-1,600 hours below 7°C) for flower bud differentiation. Cultivation is restricted to high-altitude, cold regions (e.g., Himalayas).",
        
        plantation: `
            <h4>Site and Land Preparation:</h4>
            <ul>
                <li><strong>Climate:</strong> Requires a site with reliably cold winters and protection from spring frost.</li>
                <li><strong>Soil Type:</strong> Deep, fertile, well-drained loam soil.</li>
                <li><strong>Pitting:</strong> Pits should be prepared in autumn and left exposed to weather before planting.</li>
            </ul>
            <h4>Planting and Rootstock:</h4>
            <ul>
                <li><strong>Planting Material:</strong> Use certified planting material grafted onto suitable dwarf or semi-dwarf rootstock.</li>
                <li><strong>Method:</strong> Modern orchards use **High Density Planting (HDP)** (1,250-2,500 plants/Ha).</li>
                <li><strong>Timing:</strong> Dormant season planting (Winter/early Spring) is required.</li>
            </ul>
        `,
        
        maintenance: `
            <h4>Pruning and Training:</h4>
            <ul>
                <li><strong>Pruning:</strong> Requires annual, intensive pruning during the dormant season to maximize light interception and maintain the tree structure.</li>
                <li><strong>Training:</strong> Trees must be trained to a central leader or spindle bush system, often supported by trellising wire.</li>
            </ul>
            <h4>Pest and Disease Control (Highest Risk):</h4>
            <ul>
                <li><strong>High Risk:</strong> Highly susceptible to **Apple Scab** and **Powdery Mildew**.</li>
                <li>**Control:** Requires the **most intensive and costly spray schedule** among all fruit crops (up to 15-20 sprays per season).</li>
            </ul>
            <h4>Nutrient Management:</h4>
            <ul>
                <li>Requires annual soil testing and balanced fertilization, with a special focus on **Potassium and Calcium** (for fruit storage life).</li>
            </ul>
        `,
        
        financials: `
            <h4>Cost Structure:</h4>
            <ul>
                <li><strong>Very High Initial Investment:</strong> The cost of dwarf planting material, trellising, and anti-hail nets (if used) is extremely high.</li>
                <li><strong>High Maturity Time:</strong> Traditional varieties yield in 7-10 years; HDP yields in 3-4 years.</li>
            </ul>
            <h4>Major Operational Costs (Per Hectare - Annual):</h4>
            <ul>
                <li><strong>Plant Protection (Fungicides/Insecticides):</strong> ₹ 30,000 - ₹ 50,000+ (Highest annual cost component).</li>
                <li><strong>Pruning/Training Labour:</strong> ₹ 15,000 - ₹ 25,000 (Requires skilled labor).</li>
                <li><strong>Harvesting & Grading:</strong> Very high labor cost, must be done manually.</li>
            </ul>
            <h4>Market Outlook:</h4>
            <p>Premium crop with stable, high demand. Prices are dictated by grade, quality, and cold storage availability. Excellent financial return when properly managed.</p>
        `,
        // ADDED FOR CALCULATOR
        costRange: [60000, 90000], // Annual operational cost
        yield: 300, // Quintals/Ha (Placeholder)
        pricePerQuintal: 12000 // Placeholder Avg Price in ₹
    }
};

// Helper function to calculate the conservative (upper bound) operational cost per hectare
function getConservativeCost(cropName) {
    const guide = CROP_GUIDES[cropName];
    if (guide && guide.costRange && guide.costRange.length === 2) {
        // Use the upper bound to be conservative with cost estimates
        return guide.costRange[1]; 
    }
    // Default to a high value if data is missing
    return 80000; 
}

const AVAILABLE_CROPS = Object.keys(CROP_GUIDES);

// --- Initialization Functions ---

function initializePage() {
    const urlParams = new URLSearchParams(window.location.search);
    let cropName = urlParams.get('crop');

    // **Retrieval of Top 5 names from sessionStorage**
    const top5String = sessionStorage.getItem('top5Crops');
    let top5Crops = [];
    if (top5String) {
        try {
            top5Crops = JSON.parse(top5String);
        } catch (e) {
            console.error("Error parsing top5Crops from session storage:", e);
        }
    }
     
    if (cropName) {
        cropName = decodeURIComponent(cropName).trim();
    }
    
    // Pass the retrieved list to the dropdown function
    populateCropDropdown(cropName, top5Crops);
    loadCropGuide(cropName);

    // Setup Event Listeners
    document.getElementById('cropSelect').addEventListener('change', handleCropSelection);
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', handleTabSwitch);
    });
    
    // --- Calculator Form Logic (Revised and Fixed) ---
    const cropSelect = document.getElementById('cropSelect');
    
    // Helper function for formatting currency
    const formatCurrency = (value) => `₹ ${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

    // This listener handles the form submission and calculation
    document.getElementById('calculatorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const selectedCrop = cropSelect.value;

        if (!selectedCrop || !CROP_GUIDES[selectedCrop]) {
            alert("Please select a valid crop before calculating.");
            return;
        }

        const landArea = parseFloat(document.getElementById('landArea').value);
        const budget = parseFloat(document.getElementById('budget').value);
        
        // Use the value entered by the user, or default to 0 if invalid
        const marketPriceInput = document.getElementById('marketPrice');
        const marketPrice = parseFloat(marketPriceInput.value);
        
        if (isNaN(landArea) || landArea <= 0 || isNaN(budget) || budget <= 0 || isNaN(marketPrice) || marketPrice <= 0) {
            alert("Please enter valid positive numbers for all fields.");
            return;
        }

        // --- CORE CALCULATION ---
        const estCostPerHa = getConservativeCost(selectedCrop);
        const estYieldPerHa = CROP_GUIDES[selectedCrop].yield || 0; 
        
        const totalEstimatedCost = landArea * estCostPerHa;
        const totalEstimatedYield = landArea * estYieldPerHa;
        const totalEstimatedRevenue = totalEstimatedYield * marketPrice;
        const totalEstimatedProfit = totalEstimatedRevenue - totalEstimatedCost;
        
        // --- DISPLAY RESULTS ---
        document.getElementById('totalCost').textContent = formatCurrency(totalEstimatedCost);
        document.getElementById('harvestYield').textContent = `${totalEstimatedYield.toFixed(1)} Quintals`;
        document.getElementById('totalRevenue').textContent = formatCurrency(totalEstimatedRevenue);
        
        // Profit formatting (Green for profit, Red for loss)
        const profitElement = document.getElementById('totalProfit');
        profitElement.textContent = formatCurrency(Math.abs(totalEstimatedProfit));
        profitElement.style.color = totalEstimatedProfit >= 0 ? 'var(--accent-green)' : '#ff4d4d'; // Red for loss

        document.getElementById('resultTitle').textContent = `Financial Estimate for ${cropSelect.options[cropSelect.selectedIndex].text}`;
        
        // --- WARNING MESSAGE LOGIC (Budget Check) ---
        const budgetWarning = document.getElementById('budgetWarning');
        if (budget < totalEstimatedCost) {
            budgetWarning.textContent = `⚠️ Warning: Your budget (${formatCurrency(budget)}) is insufficient for the estimated cultivation cost of ${formatCurrency(totalEstimatedCost)}.`;
            budgetWarning.style.display = 'block';
        } else {
            budgetWarning.style.display = 'none';
        }
        
        document.getElementById('calculationResult').style.display = 'block';
    });
    
    // --- End Calculator Form Logic ---
    
    // Update placeholder when crop changes manually (or from URL)
    cropSelect.addEventListener('change', (e) => {
        // Only call loadCropGuide if the change event wasn't already triggered by initializePage
        // The event listener for 'change' is handled above in initializePage
    });
    
}

// --- Dynamic Content Functions ---

function populateCropDropdown(selectedCrop, top5Crops) {
    const select = document.getElementById('cropSelect');
    
    // Clear existing options
    select.innerHTML = '<option value="" disabled selected>Select a Crop</option>';

    const uniqueCropsSet = new Set();

    // 1. Add Top 5 predicted crops (if available) under a group label
    if (top5Crops && top5Crops.length > 0) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = "Your Top 5 Recommendations";
        select.appendChild(optgroup);

        top5Crops.forEach(crop => {
            if (!uniqueCropsSet.has(crop)) {
                const option = document.createElement('option');
                option.value = crop;
                option.textContent = crop;
                if (crop === selectedCrop) {
                    option.selected = true;
                }
                optgroup.appendChild(option);
                uniqueCropsSet.add(crop);
            }
        });
        
        // Add a separator for better visual distinction
        const separator = document.createElement('optgroup');
        separator.label = "--- All Other Crops ---";
        select.appendChild(separator);
    }
    
    // 2. Add ALL other crops (fallback list)
    AVAILABLE_CROPS.forEach(crop => {
        if (!uniqueCropsSet.has(crop)) {
            const option = document.createElement('option');
            option.value = crop;
            option.textContent = crop;
            // Handle selection if the initial crop wasn't one of the Top 5
            if (crop === selectedCrop) {
                option.selected = true;
            }
            select.appendChild(option);
            uniqueCropsSet.add(crop);
        }
    });
}

function loadCropGuide(cropName) {
    const header = document.getElementById('currentCropName');
    const initialMessage = document.getElementById('initialMessage');
    const guideContent = document.getElementById('guideContent');
    const select = document.getElementById('cropSelect');
    const resultTitle = document.getElementById('resultTitle');

    // Helper to update the market price field
    const updateMarketPriceField = (crop) => {
        const input = document.getElementById('marketPrice');
        if (CROP_GUIDES[crop]) {
            const price = CROP_GUIDES[crop].pricePerQuintal;
            // Set the placeholder with the default price for guidance
            input.placeholder = `e.g., ${price.toLocaleString('en-IN')} (Default: ${price.toLocaleString('en-IN')})`;
            // Clear the input value to force user input or explicit use of the placeholder/default
            input.value = ''; 
        } else {
            input.placeholder = 'e.g., 5000';
            input.value = '';
        }
    };
    
    // Hide everything first
    guideContent.style.display = 'none';
    initialMessage.style.display = 'block';
    
    // Reset the calculator result view on new crop load
    document.getElementById('calculationResult').style.display = 'none';
    document.getElementById('budgetWarning').style.display = 'none';

    if (!cropName || !CROP_GUIDES[cropName]) {
        header.textContent = "Please Select a Crop";
        resultTitle.textContent = "Financial Estimate";
        updateMarketPriceField(null); // Reset placeholder
        return; 
    }

    const guide = CROP_GUIDES[cropName];
    header.textContent = cropName;
    
    // Ensure the dropdown reflects the currently loaded crop
    if (select.value !== cropName) {
         select.value = cropName;
    }

    // Populate Tab Content
    document.getElementById('plantation').innerHTML = guide.plantation;
    document.getElementById('maintenance').innerHTML = guide.maintenance;
    document.getElementById('financials').innerHTML = guide.financials;
    
    // Ensure calculator title is updated and price placeholder is set
    resultTitle.textContent = `Financial Estimate for ${cropName}`;
    updateMarketPriceField(cropName);

    // Show the content and hide the initial message
    initialMessage.style.display = 'none';
    guideContent.style.display = 'block';
    
    // Ensure the first tab is active and visible
    document.querySelector('.tab-button[data-tab="plantation"]').click();
}

// --- Event Handlers ---

function handleCropSelection(event) {
    const selectedCrop = event.target.value;
    // Update the URL without reloading the page (good practice)
    window.history.pushState(null, null, `guide.html?crop=${encodeURIComponent(selectedCrop)}`);
    loadCropGuide(selectedCrop);
}

function handleTabSwitch(event) {
    const targetTab = event.target.dataset.tab;

    // Remove 'active' class from all buttons and panes
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.style.display = 'none');

    // Add 'active' class to the clicked button
    event.target.classList.add('active');

    // Show the corresponding pane
    document.getElementById(targetTab).style.display = 'block';
}

// Start the whole process
document.addEventListener('DOMContentLoaded', initializePage);
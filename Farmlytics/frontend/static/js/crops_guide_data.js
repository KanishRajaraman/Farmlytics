// /static/js/crop_guides_data.js
// This module provides the detailed guide data for all predicted crops.

export const CROP_GUIDES = {
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
                <li><strong>Transplanting:</strong> Seedlings are transplanted by hand or machine into the puddled field. This is the **highest manual labor cost** (₹ 10,000 - ₹ 18,000/Ha) .</li>
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
                <li><strong>Weedicides:</strong> Essential for control (₹ 1,500 - ₹ 3,500/Ha) .</li>
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
        `
    },
    
    // ----------------------------------------------------------------------
    // 2. JUTE (Kharif/Fibre Crop)
    // ----------------------------------------------------------------------
    "Jute": {
        details: "A major fiber crop requiring hot and humid climate (24°C to 37°C) and heavy rainfall. Cultivated mainly in the rainy season.",
        plantation: "<h4>Soil Preparation:</h4><ul><li>Requires fine tilth. Ploughing should be done 3-4 times to break up all clods.</li><li>Land must be leveled for uniform water retention.</li></ul><h4>Sowing:</h4><ul><li>**Timing:** March to May (pre-monsoon).</li><li>**Method:** Broadcast seeds or sow in rows 30cm apart. Row sowing is better for inter-cultivation.</li></ul>",
        maintenance: "<h4>Thinning & Weeding:</h4><ul><li>Thinning of plants is essential 3-4 weeks after sowing.</li><li>Requires intensive weeding, especially in the early stages.</li></ul><h4>Fertilizer:</h4><ul><li>Needs high Nitrogen, applied in two splits after thinning.</li></ul><h4>Retting:</h4><ul><li>Harvesting is followed by retting (immersion in slow-moving water) for fiber extraction. This step is critical for fiber quality.</li></ul>",
        financials: "<h4>Estimated Cost (Per Acre):</h4><ul><li>Seeds: ₹1,000 - ₹1,500</li><li>Fertilizer/Pesticide: ₹4,000 - ₹5,000</li><li>Labor Cost (Harvesting & Retting): ₹10,000 - ₹13,000</li><li>**Total Estimated Cost:** ₹15,000 - ₹19,500</li></ul><h4>Market Outlook:</h4><p>Demand is linked to packaging material (sacks, bags). Highly dependent on raw fiber price fluctuations.</p>"
    },
    
    // ----------------------------------------------------------------------
    // 3. ORANGE (Horticulture/Sub-tropical)
    // ----------------------------------------------------------------------
    "Orange": {
        details: "Sub-tropical fruit tree (e.g., Mandarin, Sweet Orange). Requires a moderate climate with dry, sunny periods for high-quality fruit setting.",
        plantation: "<h4>Soil Preparation:</h4><ul><li>Deep plowing to break hardpan. Avoid heavy clay soils.</li><li>Planting should be done in square or rectangular systems after the rainy season.</li></ul><h4>Planting:</h4><ul><li>**Seedlings:** Use budded seedlings for true-to-type yield.</li><li>**Spacing:** 5m x 5m to 6m x 6m depending on the variety.</li></ul>",
        maintenance: "<h4>Water Management:</h4><ul><li>Critical irrigation periods are flowering, fruit setting, and fruit development. Drip irrigation is highly recommended.</li></ul><h4>Pruning:</h4><ul><li>Requires light pruning to remove dead or diseased wood and maintain tree shape.</li></ul><h4>Nutrient Management:</h4><ul><li>Requires balanced NPK, Zinc, and Manganese application, often via foliar spray.</li></ul>",
        financials: "<h4>Estimated Cost (Per Acre - Annual Maintenance):</h4><ul><li>Fertilizer/Pesticide: ₹15,000 - ₹25,000</li><li>Irrigation/Utility: ₹8,000 - ₹12,000</li><li>Harvesting/Packing Labor: Varies significantly by yield.</li><li>**High Initial Investment:** Long-term crop (starts yielding in 3-5 years).</li></ul><h4>Market Outlook:</h4><p>High consumer demand. Prices are stable but can see seasonal dips during peak harvest.</p>"
    },
    
    // ----------------------------------------------------------------------
    // 4. POMEGRANATE (Horticulture/Arid)
    // ----------------------------------------------------------------------
    "Pomegranate": {
        details: "Hardy fruit crop suitable for semi-arid and arid regions. Tolerates high temperatures and drought but is sensitive to humidity.",
        plantation: "<h4>Soil Preparation:</h4><ul><li>Dig pits of 60x60x60 cm and fill them with topsoil, manure, and superphosphate.</li></ul><h4>Planting:</h4><ul><li>**Method:** Use cuttings or air layering.</li><li>**Season:** July-August is best. **Spacing:** 4m x 3m to 5m x 5m.</li></ul>",
        maintenance: "<h4>Water Management:</h4><ul><li>Requires less water than most fruits but timely irrigation during fruit development is vital.</li><li>**Bahar Treatment:** Regulating water stress to induce a main flowering season (Feb-March) is common practice.</li></ul><h4>Pest & Disease:</h4><ul><li>Highly susceptible to bacterial blight and fruit borer. Strict spray schedule is essential.</li></ul>",
        financials: "<h4>Estimated Cost (Per Acre - Annual Maintenance):</h4><ul><li>Fertilizer/Pesticide: ₹20,000 - ₹30,000 (Pesticide cost is high due to disease pressure).</li><li>Water Management: ₹5,000 - ₹8,000.</li><li>**Total Estimated Annual Cost:** High maintenance due to pest risk.</li></ul><h4>Market Outlook:</h4><p>Excellent export potential and high domestic price. Very profitable if disease is controlled.</p>"
    },

    // ----------------------------------------------------------------------
    // 5. APPLE (Horticulture/Temperate)
    // ----------------------------------------------------------------------
    "Apple": {
        details: "A temperate fruit requiring a prolonged chilling period (1,000-1,600 chilling hours below 7°C) for flower bud differentiation. Restricted to high-altitude regions.",
        plantation: "<h4>Soil Preparation:</h4><ul><li>Deep, well-drained loam soil. Prepare planting pits in autumn.</li></ul><h4>Planting:</h4><ul><li>**Rootstock:** Use certified rootstock suitable for the region's climate.</li><li>**Spacing:** High density planting is modern practice (1m x 3m to 2m x 4m).</li></ul>",
        maintenance: "<h4>Pruning & Training:</h4><ul><li>Requires annual pruning (dormant season) for proper light penetration and fruit quality.</li></ul><h4>Pest & Disease:</h4><ul><li>Highly susceptible to scab and powdery mildew. Requires intensive fungicide and insecticide spray schedules.</li></ul><h4>Nutrient Management:</h4><ul><li>Requires annual soil testing and balanced fertilization, focusing on Potassium and Calcium.</li></ul>",
        financials: "<h4>Estimated Cost (Per Acre - Annual Maintenance):</h4><ul><li>Fertilizer/Pesticide: ₹30,000 - ₹50,000 (Highest input cost due to intensive care).</li><li>Pruning/Training Labor: High specialized labor cost.</li><li>**Initial Investment:** Very high cost for high-density planting material.</li></ul><h4>Market Outlook:</h4><p>Premium crop with consistently high market demand. Price stability is linked to global cold storage stocks and quality.</p>"
    },

    // Include the existing crops to maintain full functionality
    "Maize": {
        details: "A flexible crop grown in both Kharif and Rabi seasons. Requires moderate rainfall and well-drained soil.",
        plantation: "<h4>Soil Preparation:</h4><ul><li>Requires a fine, loose seedbed. Single deep plowing is sufficient.</li><li>Sow seeds at 3-5 cm depth.</li></ul>",
        maintenance: "<h4>Water Management:</h4><ul><li>Irrigation is critical during tasseling and grain filling stages. Avoid water stress.</li></ul><h4>Weed Control:</h4><ul><li>Critical during the first 4 weeks. Use herbicides or manual weeding.</li></ul>",
        financials: "<h4>Estimated Cost (Per Acre):</h4><ul><li>Seeds: ₹1,500</li><li>Fertilizer/Pesticide: ₹4,000</li><li>Labor Cost: ₹8,000</li><li>**Total Estimated Cost: ₹13,500**</li></ul><h4>Market Outlook:</h4><p>Used widely for feed and industrial starch. Prices can fluctuate. Check local market trends.</p>"
    },
    "Pigeonpea": {
        details: "A major pulse crop (Arhar/Toor) suitable for dryland farming, often intercropped.",
        plantation: "Requires a deep, well-drained loamy soil. Can tolerate slightly acidic soil common in Jharkhand.",
        maintenance: "Hardy crop. Focus on initial weed control and protection from pod borer pest.",
        financials: "High MSP support from the government due to pulse requirements. Lower input cost than cereals."
    }
};
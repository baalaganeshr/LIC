/**
 * LIC Circuit Calculator and Visualizer - JavaScript Logic
 * Beginner-friendly code with comments for college students.
 */

// Object containing data for each circuit type
const circuitData = {
    inverting: {
        name: "Inverting Amplifier",
        formula: "Vout = -(Rf / Rin) * Vin",
        explanation: "In an inverting amplifier, the input signal is applied to the inverting terminal (-) through the input resistor (Rin). Due to the 'virtual ground' concept at the inverting terminal, the input current is determined by Vin/Rin. This same current flows through the feedback resistor (Rf), creating an output voltage Vout = -I * Rf. The negative sign indicates a 180-degree phase shift, meaning the output is an inverted version of the input signal. The gain is precisely controlled by the ratio of Rf to Rin.",
        formulaDetail: "This formula shows that the output is proportional to the input but inverted in phase. It is derived using KCL at the inverting node, where the 'virtual ground' forces the input current (Vin/Rin) to flow entirely through the feedback resistor (Rf).",
        image: "https://placehold.co/400x300/2563eb/ffffff?text=Inverting+Amplifier+Diagram",
        applications: [
            "Phase shifters",
            "Signal integrators",
            "Summing amplifiers",
            "Current-to-voltage converters"
        ],
        inputs: [
            { id: "vin", label: "Input Voltage (Vin)", unit: "Volts", placeholder: "-15V to 15V" },
            { id: "rin", label: "Input Resistance (Rin)", type: "resistance", placeholder: "1k to 100k" },
            { id: "rf", label: "Feedback Resistance (Rf)", type: "resistance", placeholder: "10k to 1M" }
        ]
    },
    'non-inverting': {
        name: "Non-Inverting Amplifier",
        formula: "Vout = (1 + Rf / R1) * Vin",
        explanation: "In a non-inverting amplifier, the input signal is applied directly to the non-inverting terminal (+). This configuration offers extremely high input impedance, making it ideal for buffering weak signals. The feedback network (Rf and R1) is connected to the inverting terminal, ensuring that the output voltage is in phase with the input. The voltage gain is always greater than or equal to 1, calculated as 1 + (Rf/R1). It is widely used in audio pre-amps and signal conditioning.",
        formulaDetail: "This formula indicates that the output is in phase with the input and always has a gain ≥ 1. It is derived by equating the input voltage at the (+) terminal to the voltage divider output at the (-) terminal, ensuring the op-amp maintains equilibrium.",
        image: "https://placehold.co/400x300/2563eb/ffffff?text=Non-Inverting+Amplifier+Diagram",
        applications: [
            "Voltage followers (Buffer)",
            "High impedance sensors",
            "Audio pre-amplifiers",
            "Signal conditioning"
        ],
        inputs: [
            { id: "vin", label: "Input Voltage (Vin)", unit: "Volts", placeholder: "-15V to 15V" },
            { id: "r1", label: "Resistance (R1)", type: "resistance", placeholder: "1k to 100k" },
            { id: "rf", label: "Feedback Resistance (Rf)", type: "resistance", placeholder: "10k to 1M" }
        ]
    },
    integrator: {
        name: "Integrator (Simplified)",
        formula: "Vout = -(Vin * t) / (R * C)",
        explanation: "An integrator circuit uses a capacitor in the feedback loop to perform the mathematical operation of integration. The input current (Vin/R) charges the feedback capacitor (C), causing the output voltage to change at a rate proportional to the input. For a constant DC input, the output decreases linearly over time, creating a 'ramp' waveform. The output voltage at any time 't' depends on the product of R and C, known as the time constant. It is a fundamental block in analog-to-digital converters and waveform generators.",
        formulaDetail: "This is a simplified calculation for a constant DC input over time 't'. It shows how the feedback capacitor accumulates charge from the input current (Vin/R), resulting in a linear ramp output. In AC circuits, the full integral ∫Vin dt would be used.",
        image: "https://placehold.co/400x300/2563eb/ffffff?text=Integrator+Circuit+Diagram",
        applications: [
            "Analog-to-digital converters",
            "Waveform generators (Triangle wave)",
            "Low-pass filters",
            "Signal processing"
        ],
        inputs: [
            { id: "vin", label: "Input Voltage (Vin)", unit: "Volts", placeholder: "-15V to 15V" },
            { id: "r", label: "Resistance (R)", type: "resistance", placeholder: "1k to 100k" },
            { id: "c", label: "Capacitance (C)", type: "capacitance", placeholder: "0.01μF to 10μF" },
            { id: "t", label: "Time (t)", unit: "Seconds", placeholder: "0.001s to 1s" }
        ]
    }
};

// Unit Multipliers
const multipliers = {
    resistance: {
        "Ω": 1,
        "kΩ": 1000,
        "MΩ": 1000000
    },
    capacitance: {
        "F": 1,
        "mF": 0.001,
        "μF": 0.000001,
        "nF": 0.000000001
    }
};

// DOM Elements
const inputContainer = document.getElementById('input-container');
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');
const outputSection = document.getElementById('output-section');
const errorMessage = document.getElementById('error-message');

// Result Elements
const resultDisplay = document.getElementById('result-display');
const explanationText = document.getElementById('explanation-text');
const applicationsList = document.getElementById('applications-list');
const circuitTitle = document.getElementById('circuit-title');
const circuitFormula = document.getElementById('circuit-formula');
const circuitFormulaContainer = document.getElementById('circuit-formula-container');

// Get current circuit from body data attribute
const currentCircuit = document.body.dataset.circuit;

/**
 * Function to render input fields based on current circuit
 */
function renderInputs() {
    if (!currentCircuit || !circuitData[currentCircuit]) return;
    
    const config = circuitData[currentCircuit];

    // Update title and formula
    if (circuitTitle) circuitTitle.textContent = config.name;
    if (circuitFormula) {
        circuitFormula.textContent = config.formula;
        
        // Add tooltip functionality
        const container = circuitFormula.parentElement;
        if (container) {
            container.classList.add('tooltip-container');
            
            // Create tooltip element if it doesn't exist
            let tooltip = container.querySelector('.tooltip-text');
            if (!tooltip) {
                tooltip = document.createElement('span');
                tooltip.className = 'tooltip-text';
                container.appendChild(tooltip);
            }
            tooltip.textContent = config.formulaDetail;
        }
    }
    if (circuitFormulaContainer) circuitFormulaContainer.classList.remove('hidden');
    
    // Clear existing inputs
    inputContainer.innerHTML = '';
    
    // Create and append new input groups
    config.inputs.forEach(input => {
        const group = document.createElement('div');
        group.className = 'input-group';
        
        let unitHtml = '';
        if (input.type && multipliers[input.type]) {
            const options = Object.keys(multipliers[input.type]).map(u => 
                `<option value="${u}" ${u === (input.type === 'resistance' ? 'kΩ' : 'μF') ? 'selected' : ''}>${u}</option>`
            ).join('');
            
            unitHtml = `
                <div class="input-with-unit">
                    <input type="number" id="${input.id}" placeholder="${input.placeholder}" step="any">
                    <select id="${input.id}-unit" class="unit-select">
                        ${options}
                    </select>
                </div>
            `;
        } else {
            unitHtml = `<input type="number" id="${input.id}" placeholder="${input.placeholder}" step="any">`;
        }

        group.innerHTML = `
            <label for="${input.id}">${input.label} ${input.unit ? `(${input.unit})` : ''}</label>
            ${unitHtml}
        `;
        
        inputContainer.appendChild(group);
    });

    // Add event listeners for real-time SVG updates
    config.inputs.forEach(input => {
        const element = document.getElementById(input.id);
        const unitElement = document.getElementById(`${input.id}-unit`);
        
        const updateOnInput = () => {
            const values = {};
            config.inputs.forEach(inp => {
                const el = document.getElementById(inp.id);
                values[inp.id] = parseFloat(el.value) || 0;
            });
            updateSvgLabels(values, 0, true); // true means "partial update"
        };

        if (element) element.addEventListener('input', updateOnInput);
        if (unitElement) unitElement.addEventListener('change', updateOnInput);
    });
}

/**
 * Function to perform calculations
 */
function calculate() {
    if (!currentCircuit || !circuitData[currentCircuit]) return;
    
    const config = circuitData[currentCircuit];
    if (errorMessage) errorMessage.classList.add('hidden');

    // Get all input values
    const values = {};
    let hasError = false;

    config.inputs.forEach(input => {
        const element = document.getElementById(input.id);
        let val = parseFloat(element.value);
        
        if (isNaN(val)) {
            hasError = true;
        }

        // Apply unit conversion if applicable
        if (input.type && multipliers[input.type]) {
            const unitElement = document.getElementById(`${input.id}-unit`);
            const unit = unitElement.value;
            const multiplier = multipliers[input.type][unit];
            val = val * multiplier;
        }

        values[input.id] = val;
    });

    if (hasError) {
        showError("Please enter valid numbers for all fields.");
        return;
    }

    let result = 0;

    // Calculation logic based on circuit (values are now in base units: Ohms, Farads, Volts, Seconds)
    if (currentCircuit === 'inverting') {
        if (values.rin === 0) {
            showError("Input Resistance (Rin) cannot be zero.");
            return;
        }
        result = -(values.rf / values.rin) * values.vin;
    } 
    else if (currentCircuit === 'non-inverting') {
        if (values.r1 === 0) {
            showError("Resistance (R1) cannot be zero.");
            return;
        }
        result = (1 + (values.rf / values.r1)) * values.vin;
    } 
    else if (currentCircuit === 'integrator') {
        if (values.r === 0 || values.c === 0) {
            showError("Resistance (R) and Capacitance (C) cannot be zero.");
            return;
        }
        result = -(values.vin * values.t) / (values.r * values.c);
    }

    displayResults(result, config, values);
}

/**
 * Function to display results in the UI and update SVG diagram
 */
function displayResults(result, config, values) {
    if (resultDisplay) resultDisplay.textContent = result.toFixed(3) + " Volts";
    if (explanationText) explanationText.textContent = config.explanation;
    
    // Update SVG Diagram Labels
    updateSvgLabels(values, result);

    // Render applications list
    if (applicationsList) {
        applicationsList.innerHTML = '';
        config.applications.forEach(app => {
            const li = document.createElement('li');
            li.textContent = app;
            applicationsList.appendChild(li);
        });
    }

    // Show output section
    if (outputSection) {
        outputSection.classList.remove('hidden');
        outputSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Function to update SVG text labels with actual values
 */
function updateSvgLabels(values, result, isPartial = false) {
    // Helper to format values for display in SVG
    const format = (val, id) => {
        if ((val === 0 || isNaN(val)) && isPartial) {
            return "--";
        }
        
        if (id === 'vin' || id === 'vout') return val.toFixed(2) + "V";
        if (id === 't') return val.toFixed(3) + "s";
        
        // For resistance/capacitance, show with original units if possible
        const inputEl = document.getElementById(id);
        const unitEl = document.getElementById(`${id}-unit`);
        if (inputEl && unitEl && inputEl.value) {
            return inputEl.value + unitEl.value;
        }
        return val.toString();
    };

    // Update specific labels based on current circuit
    if (currentCircuit === 'inverting') {
        const vinLabel = document.getElementById('svg-vin-label');
        const rinLabel = document.getElementById('svg-rin-label');
        const rfLabel = document.getElementById('svg-rf-label');
        const voutLabel = document.getElementById('svg-vout-label');

        if (vinLabel) vinLabel.textContent = `Vin = ${format(values.vin, 'vin')}`;
        if (rinLabel) rinLabel.textContent = `Rin = ${format(values.rin, 'rin')}`;
        if (rfLabel) rfLabel.textContent = `Rf = ${format(values.rf, 'rf')}`;
        if (voutLabel) {
            if (isPartial) voutLabel.textContent = "Vout = --V";
            else voutLabel.textContent = `Vout = ${result.toFixed(3)}V`;
        }
    } 
    else if (currentCircuit === 'non-inverting') {
        const vinLabel = document.getElementById('svg-vin-label');
        const r1Label = document.getElementById('svg-r1-label');
        const rfLabel = document.getElementById('svg-rf-label');
        const voutLabel = document.getElementById('svg-vout-label');

        if (vinLabel) vinLabel.textContent = `Vin = ${format(values.vin, 'vin')}`;
        if (r1Label) r1Label.textContent = `R1 = ${format(values.r1, 'r1')}`;
        if (rfLabel) rfLabel.textContent = `Rf = ${format(values.rf, 'rf')}`;
        if (voutLabel) {
            if (isPartial) voutLabel.textContent = "Vout = --V";
            else voutLabel.textContent = `Vout = ${result.toFixed(3)}V`;
        }
    }
    else if (currentCircuit === 'integrator') {
        const vinLabel = document.getElementById('svg-vin-label');
        const rLabel = document.getElementById('svg-r-label');
        const cLabel = document.getElementById('svg-c-label');
        const tLabel = document.getElementById('svg-t-label');
        const voutLabel = document.getElementById('svg-vout-label');

        if (vinLabel) vinLabel.textContent = `Vin = ${format(values.vin, 'vin')}`;
        if (rLabel) rLabel.textContent = `R = ${format(values.r, 'r')}`;
        if (cLabel) cLabel.textContent = `C = ${format(values.c, 'c')}`;
        if (tLabel) tLabel.textContent = `t = ${format(values.t, 't')}`;
        if (voutLabel) {
            if (isPartial) voutLabel.textContent = "Vout = --V";
            else voutLabel.textContent = `Vout = ${result.toFixed(3)}V`;
        }
    }
}

/**
 * Function to show error messages
 */
function showError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
    if (outputSection) outputSection.classList.add('hidden');
}

/**
 * Function to reset all fields
 */
function resetFields() {
    const inputs = inputContainer.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    if (outputSection) outputSection.classList.add('hidden');
    if (errorMessage) errorMessage.classList.add('hidden');
}

// Event Listeners
if (calculateBtn) calculateBtn.addEventListener('click', calculate);
if (resetBtn) resetBtn.addEventListener('click', resetFields);

// Initialize
window.onload = renderInputs;

# LIC Circuit Calculator and Visualizer

## Project Description
The **LIC Circuit Calculator and Visualizer** is an interactive educational web application designed for college students studying Linear Integrated Circuits (LIC). It allows users to select fundamental Operational Amplifier (Op-Amp) configurations, input component values, and instantly see the calculated output voltage along with the circuit diagram and an academic explanation.

This project serves as a practical tool for verifying theoretical calculations performed in the laboratory or during lectures.

## Features
- **Interactive Selection:** Choose between Inverting Amplifier, Non-Inverting Amplifier, and Integrator circuits.
- **Dynamic UI:** Input fields change automatically based on the selected circuit.
- **Real-time Calculation:** Instantly computes $V_{out}$ using standard LIC formulas.
- **Visual Learning:** Displays the circuit diagram and the mathematical formula used.
- **Educational Content:** Provides a concise explanation of how each circuit works and its common real-world applications.
- **Responsive Design:** Works seamlessly on desktops, tablets, and mobile phones.
- **Validation:** Includes error handling for missing or invalid inputs.

## Formulas Used

### 1. Inverting Amplifier
$$V_{out} = -\left(\frac{R_f}{R_{in}}\right) \times V_{in}$$
*Produces an amplified output with a 180-degree phase shift.*

### 2. Non-Inverting Amplifier
$$V_{out} = \left(1 + \frac{R_f}{R_1}\right) \times V_{in}$$
*Produces an amplified output in phase with the input.*

### 3. Integrator (Simplified for DC)
$$V_{out} = -\frac{V_{in} \times t}{R \times C}$$
*Produces an output proportional to the time integral of the input signal. This calculation assumes a constant DC input voltage.*

## Folder Structure
```
/
├── index.html          # Home page (Landing page)
├── inverting.html      # Inverting Amplifier calculator
├── non-inverting.html  # Non-Inverting Amplifier calculator
├── integrator.html     # Integrator calculator
├── style.css           # Shared professional styling
├── script.js           # Shared logic for all calculators
├── README.md           # Project documentation
└── circuits/           # Folder for circuit diagram images
```

## Note on Images
The application currently uses prominent placeholder images from `placehold.co` to ensure the circuit diagrams are clearly visible. To use your own circuit diagrams:
1. Place your images in the `circuits/` folder.
2. Update the `src` attribute of the `<img>` tag in the `main-diagram` section of each `.html` file.
3. Also update the `image` paths in the `circuitData` object within `script.js` if needed (though the HTML tags are now the primary source for the main diagram).

## How to Run Locally
1. Download or clone this repository.
2. Ensure the `circuits` folder contains the necessary images (inverting.png, noninverting.png, integrator.png).
3. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, etc.).

## How to Deploy on GitHub Pages
1. Create a new repository on GitHub.
2. Upload all the files (`index.html`, `style.css`, `script.js`, `README.md`) and the `circuits` folder.
3. Go to **Settings** > **Pages**.
4. Under **Branch**, select `main` (or `master`) and click **Save**.
5. Your site will be live at `https://yourusername.github.io/your-repo-name/`.

## Academic Explanation
This project demonstrates the application of Operational Amplifiers in linear mode. By adjusting the feedback network (resistors and capacitors), the Op-Amp can be configured to perform different mathematical operations. The **Inverting** and **Non-Inverting** configurations are basic voltage amplifiers, while the **Integrator** demonstrates how Op-Amps can be used for time-dependent signal processing, which is a precursor to analog computing.

---
*Developed as a Linear Integrated Circuits mini project.*

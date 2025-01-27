let warsData = [];

// Fetch the JSON data for wars and deaths
async function fetchData() {
    try {
        const response = await fetch('deaths.json');
        const data = await response.json();
        warsData = data.wars; // Store wars data
        populateDropdown(); // Populate the dropdown menu once the data is loaded
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Populate the dropdown with wars from the JSON
function populateDropdown() {
    const selectElement = document.getElementById('war-select');
    
    warsData.forEach(war => {
        const option = document.createElement('option');
        option.value = war.name;
        option.textContent = war.name;
        selectElement.appendChild(option);
    });
}

// Update the different parameters text immediately when a war is selected
function updateCounter() {
    const selectedWar = document.getElementById('war-select').value;
    const warNameElement = document.getElementById('war-name');
    const counterElement = document.getElementById('counter');
    const combatantsElement = document.getElementById('combatants');
    
    if (selectedWar) {
        // Find the selected war data
        const war = warsData.find(w => w.name === selectedWar);
        
        // Display the war name
        warNameElement.textContent = `War: ${selectedWar}`;
        
        // Immediately show the total number of deaths/combatants
        counterElement.textContent = `Deaths: ${war.deaths.toLocaleString()}`;
    combatantsElement.textContent = `Combatants: ${war.combatants.join(', ')}`;
    } else {
        warNameElement.textContent = "War: Select a War";
        counterElement.textContent = "Deaths: 0";
        combatantsElement.textContent = "Combatants: ";
    }
}

// Fetch the data on page load
window.onload = fetchData;

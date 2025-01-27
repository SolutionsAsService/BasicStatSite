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

// Start counter when the user selects a war and presses the button
function startCounter() {
    const selectedWar = document.getElementById('war-select').value;
    const war = warsData.find(w => w.name === selectedWar);
    
    if (war) {
        let deathCount = 0;
        let target = war.deaths;
        let interval = setInterval(() => {
            deathCount += 100000; // Add deaths in increments of 100,000
            document.getElementById('counter').textContent = `Deaths: ${deathCount.toLocaleString()}`;
            if (deathCount >= target) {
                clearInterval(interval);
                document.getElementById('counter').textContent = `Total Deaths: ${target.toLocaleString()}`;
            }
        }, 100); // Update every 100ms
    }
}

// Update the death counter text when a new war is selected from the dropdown
function updateCounter() {
    const selectedWar = document.getElementById('war-select').value;
    const warNameElement = document.getElementById('war-name');
    if (selectedWar) {
        warNameElement.textContent = `War: ${selectedWar}`;
    } else {
        warNameElement.textContent = "War: Select a War";
    }
}

// Fetch the data on page load
window.onload = fetchData;

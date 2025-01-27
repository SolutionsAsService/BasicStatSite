async function fetchData() {
    try {
        const response = await fetch('deaths.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Counter function that updates the death count
function startCounter() {
    fetchData().then(data => {
        if (data && data.deaths) {
            let deathCount = 0;
            let target = data.deaths;
            let interval = setInterval(() => {
                deathCount += 100000; // Add deaths in increments of 100,000
                document.getElementById('counter').textContent = `Deaths: ${deathCount.toLocaleString()}`;
                if (deathCount >= target) {
                    clearInterval(interval);
                    document.getElementById('counter').textContent = `Total Deaths: ${target.toLocaleString()}`;
                }
            }, 100); // Update every 100ms
        }
    });
}


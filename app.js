// Get location and calculate renewable energy potential
window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

// Success function for getting the geolocation
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById('location').innerHTML = `Your location: Latitude ${latitude}, Longitude ${longitude}`;

    // Fetch weather data using OpenWeatherMap API
    fetchWeatherData(latitude, longitude);
}

// Error function for geolocation
function error() {
    alert("Unable to retrieve your location");
}

// Fetch weather data from OpenWeatherMap API
function fetchWeatherData(lat, lon) {
    const apiKey = '4526a80a5d5bdacefda7579162a723a8';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const windSpeed = data.wind.speed; // Wind speed in m/s
            const solarIrradiance = getSolarIrradiance(lat, lon); // Assuming you have a function for this

            // Calculate wind power
            const windPower = calculateWindPower(windSpeed);

            // Calculate solar power
            const solarPower = calculateSolarPower(solarIrradiance);

            // Update DOM elements with results
            document.getElementById('wind-power').innerText = windPower.toFixed(2);
            document.getElementById('solar-power').innerText = solarPower.toFixed(2);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Function to calculate wind power
function calculateWindPower(windSpeed) {
    const airDensity = 1.225; // kg/m^3 at sea level
    const rotorArea = 10; // Assuming 10 m^2 for a small turbine
    return 0.5 * airDensity * rotorArea * Math.pow(windSpeed, 3); // Power in watts
}

// Function to calculate solar power
function calculateSolarPower(irradiance) {
    const panelArea = 10; // m^2
    const efficiency = 0.2; // 20% efficient solar panels
    return irradiance * panelArea * efficiency; // Power in watts
}

// Dummy function for solar irradiance (replace with actual API or calculation)
function getSolarIrradiance(lat, lon) {
    // For now, we return a fixed value. You can replace this with real data
    return 1000; // W/m^2 (this value varies depending on location and weather)
}

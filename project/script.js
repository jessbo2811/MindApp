const API_KEY = "7bddc59f2ca9436ea55142237261011&q";

document.getElementById("getWeather").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(getWeather);
});

async function getWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`
        );

        const data = await response.json();

        document.getElementById("weather").innerHTML = `
            <h2>${data.location.name}</h2>
            <p>${data.location.region}</p>
            <p>${data.location.country}</p>
            <p>${data.current.temp_c}°C</p>
            <p>${data.current.condition.text}</p>
            <img src="https:${data.current.condition.icon}" alt="weather icon">
        `;
    }
    catch (error) {
        console.error(error);
        document.getElementById("weather").textContent =
            "Failed to load weather data";
    }
}
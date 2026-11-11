const API_KEY = "7bddc59f2ca9436ea55142237261011&q";

window.addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition(getWeather);
});

async function getWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

function formatTime(number) {
    return number < 10 ? '0' + number : number;
}

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`
        );

        const data = await response.json();
        const now = new Date();
        const formattedTime = `${formatTime(now.getHours())}:${formatTime(now.getMinutes())}`;

        document.getElementById("location").innerHTML = `
            <h2>${data.location.name}</h2>
            <p>${data.location.region}, ${data.location.country}</p>
            <p>${formattedTime}</p>
            <p>${now.toDateString()}</p>
        `;

        document.getElementById("weather").innerHTML = `
            <img src="https:${data.current.condition.icon}" alt="weather icon">
            <p>${data.current.temp_c}°C</p>
            <p>${data.current.condition.text}</p>
        `;
    }
    catch (error) {
        console.error(error);
        document.getElementById("weather").textContent =
            "Failed to load weather data";
    }

    const expression = ["", "😄", "😌", "🙂", "😴", "😢", "😟", "😡"];
    const emotions = ["", "Happy", "Calm", "Okay", "Tired", "Sad", "Anxious", "Angry"];

    const slider = document.getElementById("slider");
    const emoji = document.getElementById("mood-expression");
    const mood = document.getElementById("mood-display");

    slider.addEventListener("input", () => {
        mood.textContent = emotions[slider.value];
    });

    slider.addEventListener("input", () => {
        emoji.textContent = expression[slider.value];
    });
}
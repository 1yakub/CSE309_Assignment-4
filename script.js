const apiKey = "a84e0ac75c2669f7035808e1901a2580";
let urlCityName = "dhaka"; // Use let instead of const for urlCityName
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${urlCityName}&appid=${apiKey}`;

function GetWeather() {
    const newName = document.getElementById("cityInput");
    const cityName = document.getElementById("cityName");

    cityName.innerHTML = `Forecast for ${newName.value}`;
    urlCityName = newName.value;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < 5; i++) {
                const dayOfWeek = CheckDay(i);
                document.getElementById("day" + (i + 1)).innerHTML =
                    daysOfWeek[dayOfWeek];
                document.getElementById("day" + (i + 1) + "Min").innerHTML =
                    "Min: " +
                    Number(data.list[i].main.temp_min - 288.53).toFixed(1) +
                    "°";
                document.getElementById("day" + (i + 1) + "Max").innerHTML =
                    "Max: " +
                    Number(data.list[i].main.temp_max - 288.53).toFixed(1) +
                    "°";
            }
        })
        .catch((error) => {
            alert("Please try again later.");
            console.error(error);
        });
}

const d = new Date();
const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    } else {
        return day + d.getDay();
    }
}

for (let i = 0; i < 5; i++) {
    const dayOfWeek = CheckDay(i);
    document.getElementById("day" + (i + 1)).innerHTML = daysOfWeek[dayOfWeek];
}

function DefaultScreen() {
    const cityName = document.getElementById("cityName");
    cityName.innerHTML = `Forecast for ${urlCityName}`;
    GetWeather();
}

// Call DefaultScreen to set the default value and fetch weather data
DefaultScreen();

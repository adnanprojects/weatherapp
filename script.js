'use strict';

const input = document.getElementById('city');
const search = document.getElementById('search-button');
const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemp = document.getElementById('city-temp');
const button = document.getElementById('getlocation');

// Render Result data
function render(result) {
    cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
    cityTime.innerText = result.location.localtime;
    cityTemp.innerText = `${result.current.temp_c} C`;
}

// Using city name
async function getData(city) {
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=2cded80fbe954916a77100421242002&q=${city}&aqi=yes`);
    return data.json();
}

search.addEventListener('click', async () => {
    const city = input.value;
    const result = await getData(city);
    render(result);
    input.value = '';
});

// Using Location
async function getGeoData(latitude, longitude) {
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=2cded80fbe954916a77100421242002&q=${latitude},${longitude}&aqi=yes`);
    return await data.json();
}

async function getLocation(position) {
    const result = await getGeoData(position.coords.latitude, position.coords.longitude);
    render(result);
}

function failedToGet() {
    console.log('failed to get the location');
}

button.addEventListener('click', async () => {
    const location = navigator.geolocation.getCurrentPosition(getLocation, failedToGet);
});
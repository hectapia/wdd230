// select HTML elements in the document
const currentTemp = document.querySelector('#currentTemp');
const weatherIcon = document.querySelector('#weatherIcon');
const captionDesc = document.querySelector('#weatherDesc');
const windCondition = document.querySelector('#windCondition');
const windChill = document.querySelector('#windChill');

const apiKey = '1239f81b2a6cc0c2674caa34d85f1c99';
// const q = 'Fairbanks';
const zipCode = 86179;
const countryCode = 'mx'
const units = 'metric';
//const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=${units}&appid=${apiKey}`;
const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}&units=${units}`;



async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetch();

  function displayResults(weatherData) {
    currentTemp.innerHTML = `${weatherData.main.temp.toFixed(0)} °C`;

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
    const descAsArray = desc.split(' ');
    const windCondit = weatherData.wind.speed;
  
    for (var i=0; i < descAsArray.length; i++) {
        descAsArray[i] = descAsArray[i].charAt(0).toUpperCase() + descAsArray[i].slice(1);
    };

    const descUpperCase = descAsArray.join(' ');


    const temperature = weatherData.main.temp.toFixed(0);
    const windSpeed = weatherData.wind.speed;
    
    const windChillNA = "N/A";
    var windChillCalc = 0;
    
    if (temperature <= 50 && windSpeed > 3) {
      windChillCalc = 35.74 + (0.6125 * temperature) - 35.75 * (windSpeed ** 0.16) + 0.4275 * temperature * (windSpeed ** 0.16);
      windChillCalc = windChillCalc.toFixed(1) + " \u00B0F";
      windChill.textContent = `Wind Chill: ${windChillCalc}`;
    }
    else {
      windChill.textContent = `Wind Chill: ${windChillNA}`;
    };
    

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', descUpperCase);
    captionDesc.textContent = descUpperCase;
    windCondition.textContent = `Wind Speed ${windCondit} meter/sec`;
   
  }
 


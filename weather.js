const app = document .querySelector('.weather-app');
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");             //it's date not data
const timeoutput = document.querySelector(".time");             //error found
const dayoutput = document.querySelector(".day");
const conditionOutput = document.querySelector(".condition");
const nameoutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
let search = document.querySelector('.search');
const form = document.getElementById('locationInput');
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city")

let cityInput = "Delhi, India";

cities.forEach((city) =>{
    city.addEventListener("click", (e) =>{
        search.placeholder = 'Type City or Country...';
        search.style.background = "";
        cityInput = e.target.innerHTML;
        fetchWeatherData();                     //error found
        app.style.opacity ="0";
    });
}) 
form.addEventListener("submit", (e) =>{
    e.preventDefault();                         //error found
    if(search.value.length == 0){
        // alert('Please type  a city name')
        search.placeholder = '"Please Type City or Country"';
        search.style.background = "red";
    }
    else{
        cityInput = search.value;
        fetchWeatherData();                    //error found spell error
        search.value = "";
        app.style.opacity ="0";
    }
});

function dayOfTheweek(day , month, year){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekday[new Date (`'${month} ${day}, ${year}'`).getDay()];                               //error data written instead of date
};
 function fetchWeatherData (){
     fetch(`https://api.weatherapi.com/v1/current.json?key=0b81ef921411437aa0f60344232402&q=${cityInput}`).then(response => response.json())
     .then(data =>{
        search.style.background = "";
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;

       const date = data.location.localtime;
       const y = parseInt(date.substr(0,4));        //error it's for date not for data 
       const m = parseInt(date.substr(5,2));        //error it's for date not for data
       const d = parseInt(date.substr(8,2));        //error it's for date not for data
       const time = date.substr(11);                //error it's for date not for data

       dateOutput.innerHTML = `${d}/ ${m}/ ${y}`;
       dayoutput.innerHTML = `${dayOfTheweek(d, m, y)} `;
       timeoutput.innerHTML = time;
       nameoutput.innerHTML = data.location.name +"," + data.location.country;
       const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length );                     //error in src link
        icon.src = "icons/" + iconId;
        cloudOutput.innerHTML = data.current.cloud+ "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";
        let timeOfDay ="day";
        const code = data.current.condition.code;
        if (!data.current.is_day) {
            timeOfDay = "Night";
       }else{
           timeOfDay = "Day";
       }
       if (code == 1000) {
           app.style.backgroundImage = `url(img/${timeOfDay}/clear.jpg)`;
       }
       else if (code == 1003 || code == 1006 || code == 1009 ||
           code == 1030 || code == 1069 || code == 1087 ||
           code == 1135 || code == 1273 || code == 1276 ||
           code == 1279 || code == 1282) {
               app.style.backgroundImage = `url(img/${timeOfDay}/cloudy.jpg)`;
       }
       else if (code == 1063 || code == 1072 || code == 1069 ||
           code == 1150 || code == 1153 || code == 1180 ||
           code == 1183 || code == 1186 || code == 1192 ||
           code == 1189 || code == 1195|| code == 1204||
            code == 1207|| code == 1240|| code == 1243|| code == 1246
            || code == 1249|| code == 1252) {
               app.style.backgroundImage = `url(img/${timeOfDay}/rainy.jpg)`;
       }
       else{
           app.style.backgroundImage = `url(img/${timeOfDay}/snowy.jpg)`;
       }
       app.style.opacity = "1";

     })
     .catch((error) =>{
        alert('No Match Found');
        console.log(error);
        app.style.opacity = "1";
  });
 }
 fetchWeatherData();
 app.style.opacity = "1";

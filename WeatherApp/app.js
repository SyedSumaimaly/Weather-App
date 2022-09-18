const wrapper = document.querySelector(".wrapper");
inputPart = wrapper.querySelector(".input-part");
infoTxt = inputPart.querySelector(".info-txt");
inputField = inputPart.querySelector("input");
locationBtn = inputPart.querySelector("button");
wIcon = wrapper.querySelector(".weather-part img")
arrowBack = wrapper.querySelector("header i");
let api = "";

inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser dosnot support geo loacaton")
    }
});

function onSuccess(position) {
    const { latitude, Longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${Longitude}&units=metric&appid=${apiKey}`
    fetchData();
}

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

const apiKey = "1d62d355afd337e02dcd6517df0ba683";


function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
}

function fetchData() {
    infoTxt.innerText = "Getting Weather Details...";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    infoTxt.classList.replace("pending", "error");
    if (info.code == "404") {
        infoTxt.innerText = `${inputField.value} isn't a valid city name `
    } else {
        const city = info.name;
        const Country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        console.log(city)

        if(id == 800){
            wIcon.src = "Weather Icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "Weather Icons/strom.svg";
        }else if(id >= 600 && id <= 622){
            wIcon.src = "Weather Icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "Weather Icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "Weather Icons/cloud.svg";
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            wIcon.src = "Weather Icons/rain.svg";
        }

        wrapper.querySelector(".temp .num").innerHTML = Math.floor(temp);
        wrapper.querySelector(".weather").innerHTML = description;
        wrapper.querySelector(".location span").innerHTML = `${city}, ${Country}`;
        wrapper.querySelector(".temp .num2").innerHTML = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerHTML = `${humidity}%`;


        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active")
        console.log(info);
    }

};

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});
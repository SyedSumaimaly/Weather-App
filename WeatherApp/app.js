const wrapper = document.querySelector(".wrapper");
inputPart = wrapper.querySelector(".input-part");
infoTxt = inputPart.querySelector(".info-txt");
inputfield = inputPart.querySelector(".input");
locationBtn = inputPart.querySelector("button");

inputfield.addEventListener("keyup", e =>{
    if (e.key == "Enter" && inputfield.value != " ") {
        reqestApi(inputfield.value);
    }
});

locationBtn.addEventListener("click", () => {
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(onSuccess, onError);
}else{
    alert("Your browser dosnot support geo loacaton")
}
});

function onSuccess(position){
console.log(position);
}

function onError(error){

}

function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    infoTxt.innerText = "Getting Weather Details...";
    info.Txt.classList.add("pending");
    fetch(api).then(respnse => respnse.json()).then(result => weatherDeatils(result));
}

function weatherDetails(info) {

}
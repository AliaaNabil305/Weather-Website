let days = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday","saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var search=document.getElementById("searchInput")
var find=document.getElementById("findBtn");
var currentDay=document.getElementById("currentDay");
var currentDateElement=document.getElementById("currentDateElement");
var currentPlace=document.getElementById("currentPlace");
var currentWeatherIcon=document.getElementById("currentWeatherIcon");
var currentTemp=document.getElementById("temp");
var currentState=document.getElementById("currentState");
var secondDay=document.getElementById("secondDay")
var secondDayIcon=document.getElementById("secondDayIcon")
var secondMaxTemp=document.getElementById("secondMaxTemp");
var secondMinTemp=document.getElementById("secondMinTemp");
var secondState=document.getElementById("secondState");
var thirdDay=document.getElementById("thirdDay");
var thirdDayIcon=document.getElementById("thirdDayIcon")
var thirdMaxTemp=document.getElementById("thirdMaxTemp");
var thirdMinTemp=document.getElementById("thirdMinTemp");
var thirdState=document.getElementById("thirdState");

var currentDate=new Date(); 
currentDay.textContent=days[currentDate.getDay()]

if(currentDate.getDay()==6){
    secondDay.textContent=days[currentDate.getDay() - 6]
    thirdDay.textContent=days[currentDate.getDay() - 6 + 1]
}
else if(currentDate.getDay()==5){
    secondDay.textContent=days[currentDate.getDay() + 1]
    thirdDay.textContent=days[currentDate.getDay() - 5]
}
else{
    secondDay.textContent=days[currentDate.getDay() + 1]
    thirdDay.textContent=days[currentDate.getDay() + 2]
}
currentDateElement.textContent= currentDate.getDate()+ " "+ months[currentDate.getMonth()]

async function getDefault(){
    var response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=513530c8b4e24060a47193216222506&q=Cairo&days=3&aqi=no&alerts=no`);
    data = await response.json()
    localStorage.setItem("weather", JSON.stringify(data));
    currentPlace.textContent=data.location.name;
    currentTemp.textContent=data.current.temp_c + "°C";
    currentState.textContent=data.current.condition.text;
    currentWeatherIcon.src=data.current.condition.icon;

    secondMaxTemp.textContent=data.forecast.forecastday[1].day.maxtemp_c + "°C";
    secondMinTemp.textContent=data.forecast.forecastday[1].day.mintemp_c + "°";
    secondDayIcon.src=data.forecast.forecastday[1].day.condition.icon;
    secondState.textContent=data.forecast.forecastday[1].day.condition.text;


    thirdMaxTemp.textContent=data.forecast.forecastday[2].day.maxtemp_c + "°C";
    thirdMinTemp.textContent=data.forecast.forecastday[2].day.mintemp_c + "°";
    thirdDayIcon.src=data.forecast.forecastday[2].day.condition.icon;
    thirdState.textContent=data.forecast.forecastday[2].day.condition.text;
}
getDefault()

search.addEventListener('keyup', function(){
    if(localStorage.getItem('weather') == null) {
        data=[]
    }
    else{
        data=JSON.parse(localStorage.getItem('weather'))
    }

    var searchedvalue=search.value;
    if(searchedvalue.length>=3){
        async function getData(){
            var response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=513530c8b4e24060a47193216222506&q=${searchedvalue}&days=3&aqi=no&alerts=no`)
            data = await response.json()
            localStorage.setItem("weather", JSON.stringify(data));
            currentPlace.textContent=data.location.name;
            currentTemp.textContent=data.current.temp_c + "°C";
            currentState.textContent=data.current.condition.text;
            currentWeatherIcon.src=data.current.condition.icon;

            secondMaxTemp.textContent=data.forecast.forecastday[1].day.maxtemp_c + "°C";
            secondMinTemp.textContent=data.forecast.forecastday[1].day.mintemp_c + "°";
            secondDayIcon.src=data.forecast.forecastday[1].day.condition.icon;
            secondState.textContent=data.forecast.forecastday[1].day.condition.text;


            thirdMaxTemp.textContent=data.forecast.forecastday[2].day.maxtemp_c + "°C";
            thirdMinTemp.textContent=data.forecast.forecastday[2].day.mintemp_c + "°";
            thirdDayIcon.src=data.forecast.forecastday[2].day.condition.icon;
            thirdState.textContent=data.forecast.forecastday[2].day.condition.text;
        }
        getData()
    }
})
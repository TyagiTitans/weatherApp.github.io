function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

// let today = new Date();

// let dd=today.getDate();
// let mm=today.getMonth()+1;
// let yy=today.getFullYear();

// if(dd<10)
// {
//     dd='0'+dd;
// }
// if(mm<10)
// {
//     mm='0'+mm;
// }
// let tt=today.toLocaleTimeString();
// today=`${dd}/${mm}/${yy} , ${tt} `;
// document.getElementById("date").innerText=today;

let weather = {
    apiKey: "23057acfc5a78245c469030870908b58",
    fetchWeather: function(city)
    {
       fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+ this.apiKey)
       .then((response)=> response.json())
       .then((data)=>this.displayWeather(data))
       .catch((err)=>
       {
           alert("Error Try Again !!");
       });
    },
    displayWeather: function(data)
    {
       const { name } = data;
       const { icon , description } = data.weather[0];
       const { temp , humidity } = data.main;
       const { speed } = data.wind;
      // console.log(name,icon,description,temp,humidity,speed);

       document.querySelector('.city').innerText=name;
       document.querySelector('.des').innerText=capitalize(description);
       document.querySelector('.temp').innerText=Math.floor(temp-273.15)+ "°C";
       document.querySelector('.windSpeed').innerText="Wind Speed:- " + speed+ " km/h";
       document.querySelector('.humidity').innerText="Humidity:- " +humidity + "%";
       document.querySelector('.icon').src=`img/${icon}.svg`;
    },
    search: function()
    {
        this.fetchWeather(document.querySelector(".searchBar").value);
    }
};

document.querySelector(".btn").addEventListener('click',function()
{
     weather.search();
});

document.querySelector(".searchBar").addEventListener('keyup',function(e)
{
   if(e.key=="Enter")
   {
       weather.search();
   }  
});

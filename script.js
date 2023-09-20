// https://api.openweathermap.org/data/2.5/weather?q=Gowanda&units=imperial&appid=b15051e834bb7aeb541ad842dbad6c61

function displayWeather(data) 
{
    let name = data.name   
    let WeatherHeading = document.getElementById("outerBox")

    if (name == undefined) 
    {
        WeatherHeading.classList.add("blankSearch")
    }
    else
    {
        WeatherHeading.classList.remove("blankSearch")
        WeatherHeading.classList.add("afterSearch")
        WeatherHeading.textContent = name

        let degreeDiv = document.createElement("div")
        degreeDiv.id = "innerBox"
        degreeDiv.classList.add("degree")
        WeatherHeading.appendChild(degreeDiv)
        degreeDiv.textContent = Math.round(data.main.temp) + getDegreeSymbol()

        let feelsLikeDiv = document.createElement("div")
        feelsLikeDiv.id = "innerBox"
        feelsLikeDiv.classList.add("innerBox")
        WeatherHeading.appendChild(feelsLikeDiv)
        feelsLikeDiv.textContent = "(Feels like " + Math.round(data.main.feels_like) + getDegreeSymbol() + ")"

        let highLowDiv = document.createElement("div")
        highLowDiv.id = "innerBox"
        highLowDiv.classList.add("innerBox")
        WeatherHeading.appendChild(highLowDiv)
        highLowDiv.innerHTML = "H: " + Math.round(data.main.temp_max) + getDegreeSymbol()+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L: " + Math.round(data.main.temp_min) + getDegreeSymbol()

        let descriptionDiv = document.createElement("div")
        descriptionDiv.id = "descriptionDiv"
        descriptionDiv.classList.add("cloudDiv")
        WeatherHeading.appendChild(descriptionDiv)
        descriptionDiv.textContent = data.weather[0].description
        let icon = data.weather[0].icon
        let image = document.createElement("img")
        // image.classList.add("cloudDiv")
        image.src = "https://openweathermap.org/img/wn/" + icon + ".png"
        descriptionDiv.appendChild(image)
        // when div is clicked it shows cloud % instead
        let isCloudVisible = false;
        descriptionDiv.addEventListener('click', function() {
            isCloudVisible = !isCloudVisible;  // Toggle the flag
          
            if (isCloudVisible) {
              cloudpercent(data);  // Show clouds
              descriptionDiv.appendChild(image);
            } else {
              resetDescription(data);  // Reset to the original text
              descriptionDiv.appendChild(image);
            }
          });

        let humidity = document.createElement("div")
        humidity.id = "humidity"
        humidity.classList.add("innerBox")
        WeatherHeading.appendChild(humidity)
        humidity.textContent = "Humidity: " + data.main.humidity + "%";
    }

}

function fetchData() 
{
    let searchInput = document.getElementById("searchbar")
    let city = searchInput.value;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=' + getDegree() + '&appid=b15051e834bb7aeb541ad842dbad6c61')
        .then(response => response.json())
        .then(data => {
            console.clear();
            console.log(data);
            displayWeather(data);
    })
    .catch(error => {
        console.log(error.message)
    });
}

function getDegree()
{
    let degreeFormat = document.getElementById("degreeFormat").value;
    if(degreeFormat == 1)
    {
        return 'imperial'
    }
    else
    {
        return 'metric'
    }
}

function getDegreeSymbol()
{
    if(getDegree() == 'imperial')
    {
        return '°F'
    }
    else
    {
        return '°C'
    }
}

function cloudpercent(data)
{
    let div = document.getElementById('descriptionDiv');
    div.textContent = "Clouds: " + data.clouds.all + "%";
}

function resetDescription(data) {
    let div = document.getElementById('descriptionDiv');
    div.textContent = data.weather[0].description
  }








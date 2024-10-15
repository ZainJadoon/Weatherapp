
const menuToggle = document.getElementById('menu-toggle');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

document.addEventListener('click', (event) => {
    if (window.innerWidth <= 1192 && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});


const weatherBackgrounds = {
  "clear sky": "sunny",
  "few clouds": "cloudy",
  "scattered clouds": "cloudy",
  "broken clouds": "cloudy",
  "overcast clouds": "cloudy",
  "light rain": "rainy",
  "moderate rain": "rainy",
  "heavy intensity rain": "rainy",
  "very heavy rain": "rainy",
  "extreme rain": "rainy",
  "shower rain": "rainy",
  "freezing rain": "rainy",
  "light drizzle": "drizzle",
  "drizzle": "drizzle",
  "heavy drizzle": "drizzle",
  "light snow": "snowy",
  "snow": "snowy",
  "heavy snow": "snowy",
  "sleet": "snowy",
  "light shower snow": "snowy",
  "shower snow": "snowy",
  "light thunderstorm": "thunderstorm",
  "thunderstorm": "thunderstorm",
  "heavy thunderstorm": "thunderstorm",
  "ragged thunderstorm": "thunderstorm",
  "mist": "foggy",
  "smoke": "foggy",
  "haze": "foggy",
  "fog": "foggy",
  "sand": "dusty",
  "dust": "dusty",
  "ash": "dusty",
  "tornado": "tornado",
  "squall": "tornado"
};

const formats = ['jpg', 'jpeg', 'png', 'webp'];

let lastSearchedCity = '';

$('.searchbutton').click(async function() {


 
  var city = $('.search-bar').val();
  
  if (city === lastSearchedCity) {
    console.log("City is already searched. API call will not be made.");
    return; 
  }

  lastSearchedCity = city;

  const api = "f84037eb280bda20c7e51c4ec7c48041";
  const address = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
  const forecast= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}`;

  let html = '';

  const fetching = await fetch(address);
  const data = await fetching.json();
  const forecastfetch= await fetch(forecast);
  const forecastdata = await forecastfetch.json();

  $(".error").html("");
  if(data.cod!=="404")
  { 
    const displayer=$(".weather-data");
    if (displayer.css("display") === "none") {
      displayer.css("display", "flex");  
    } 
  
    const chartdisplayer=$(".charts");
    if (chartdisplayer.css("display") === "none") {
      chartdisplayer.css("display", "flex");  
    }
  
    let cityname = data.name;
    let temperature = data.main.temp;
    let description = data.weather[0].description;
    let icon = data.weather[0].icon;
    let humidity = data.main.humidity;
    let wind = data.wind.speed;
    let weatherClass = `/images/${weatherBackgrounds[description]}` || 'default'; 
    let iconUrl = '';
    if(description=="clear sky"||description=="sunny")
    {
      iconUrl="/images/sun.png";
    }
    else
    {
    iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    }
  
    html += `<div class="weather-upper">
                  <div class="city-info">
                      <div style="display: flex;flex-direction: row;" class="city-name">
                          <div><p style="font-size: 25px; font-weight: bold;">${cityname}</p></div>
                          <div style="width:20px; " class="pin-icon">
                              <img style="width: 100%; margin-left: 5px;" src="pin.png" alt="">
                          </div>
                      </div>
                      <div class="temperature">
                          <p>${((temperature - 273.15)).toFixed(2)} &#176;C</p>
                      </div>
                      <div class="description">
                          <p>${description}</p>
                      </div>
                      <div class="humidity">
                          <p>Humidity: ${humidity}%</p>
                      </div>
                      <div class="wind">
                          <p>Speed: ${wind} KM/H</p>
                      </div>
                  </div>
                  <div style="width:120px;" class="weather-icon">
                      <img style="width: 100%;" src="${iconUrl}" alt="Weather Icon">
                  </div>
              </div>
  
               <!-- New section for the five-day forecast -->
              <div class="weather-lower">
                  <div class="forecast">
                      <p style="font-weight:bold;">${((new Date(forecastdata.list[0].dt * 1000)).toLocaleDateString())}</p>
                      <img style="width: 90px;" src="${forecastdata.list[0].weather[0].description === "clear sky" || forecastdata.list[0].weather[0].description === "sunny" ? "/images/sun.png" : `http://openweathermap.org/img/wn/${forecastdata.list[0].weather[0].icon}@2x.png`}" alt="Day 1 Weather">
                      <p style="font-weight:bold;">${forecastdata.list[0].weather[0].description}</p>
                      <p style="font-weight:bold;">${((forecastdata.list[0].main.temp - 273.15)).toFixed(2)} &#176;C</p>
                  </div>
                  <div class="forecast">
                      <p style="font-weight:bold;">${((new Date(forecastdata.list[9].dt * 1000)).toLocaleDateString())}</p>
                      <img style="width: 90px;" src="${forecastdata.list[0].weather[0].description === "clear sky" || forecastdata.list[9].weather[0].description === "sunny" ? "/images/sun.png" : `http://openweathermap.org/img/wn/${forecastdata.list[0].weather[0].icon}@2x.png`}" alt="Day 1 Weather">
                      <p style="font-weight:bold;">${forecastdata.list[9].weather[0].description}</p>
                      <p style="font-weight:bold;">${((forecastdata.list[9].main.temp - 273.15)).toFixed(2)} &#176;C</p>
                  </div>
                  <div class="forecast">
                      <p style="font-weight:bold;">${((new Date(forecastdata.list[17].dt * 1000)).toLocaleDateString())}</p>
                     <img style="width: 90px;" src="${forecastdata.list[17].weather[0].description === "clear sky" || forecastdata.list[0].weather[0].description === "sunny" ? "/images/sun.png" : `http://openweathermap.org/img/wn/${forecastdata.list[0].weather[0].icon}@2x.png`}" alt="Day 1 Weather">
                      <p style="font-weight:bold;">${forecastdata.list[17].weather[0].description}</p>
                      <p style="font-weight:bold;">${((forecastdata.list[17].main.temp - 273.15)).toFixed(2)} &#176;C</p>
                  </div>
                  <div class="forecast">
                      <p style="font-weight:bold;">${((new Date(forecastdata.list[25].dt * 1000)).toLocaleDateString())}</p>
                      <img style="width: 90px;" src="${forecastdata.list[25].weather[0].description === "clear sky" || forecastdata.list[0].weather[0].description === "sunny" ? "/images/sun.png" : `http://openweathermap.org/img/wn/${forecastdata.list[0].weather[0].icon}@2x.png`}" alt="Day 1 Weather">
                      <p style="font-weight:bold;">${forecastdata.list[25].weather[0].description}</p>
                      <p style="font-weight:bold;">${((forecastdata.list[25].main.temp - 273.15)).toFixed(2)} &#176;C</p>
                  </div>
                  <div class="forecast">
                      <p style="font-weight:bold;">${((new Date(forecastdata.list[33].dt * 1000)).toLocaleDateString())}</p>
                    <img style="width: 90px;" src="${forecastdata.list[33].weather[0].description === "clear sky" || forecastdata.list[0].weather[0].description === "sunny" ? "/images/sun.png" : `http://openweathermap.org/img/wn/${forecastdata.list[0].weather[0].icon}@2x.png`}" alt="Day 1 Weather">
                      <p style="font-weight:bold;">${forecastdata.list[33].weather[0].description}</p>
                      <p style="font-weight:bold;">${((forecastdata.list[33].main.temp - 273.15)).toFixed(2)} &#176;C</p>
                  </div>
              </div>
              
              
              `;
  
    $('.weather-data').html(html);
  
    async function setBackgroundImage(weatherClass) {
      for (const format of formats) {
        const imageUrl = `${weatherClass}.${format}`; 
        const img = new Image();
        
        img.src = imageUrl;
        img.onload = function() {
          $('.weather-data').css('background-image', `url(${imageUrl})`);
        };
        img.onerror = function() {
          console.error(`Failed to load image: ${imageUrl}`);
        };
      }
    }
  
    setBackgroundImage(weatherClass);
    setbarchart(forecastdata);
    setdoughnut(forecastdata);
    setlinechart(forecastdata);
    
  }
  else
  {
    $(".error").html("<p>City Not Found</p>");
  }

  
 
});

let lineChart; 
let barChart;
let doughnutChart;
function setlinechart(forecastdata) {
  const ctx = $("#linechart")[0].getContext("2d");

  const temperatures = [];
  const labels = [];

  for (let i = 0; i < 5; i++) {
    temperatures.push((forecastdata.list[(i * 8)+1].main.temp - 273.15).toFixed(2)); // Convert temperature from Kelvin to Celsius
    labels.push(`Day ${i + 1}`);
  }

  // Destroy the previous line chart instance if it exists
  if (lineChart) {
    lineChart.destroy();
  }

  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 1,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Temperature (°C)',
            color: 'white'
          },
          ticks: {
            color: 'white'
          }
        },
        x: {
          ticks: {
            color: 'white'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        },
        tooltip: {
          titleColor: 'white',
          bodyColor: 'white'
        }
      },
      animations: {
        tension: {
            duration: 2000,  // Extend the animation duration
            easing: 'easeOutBounce',  // Use a more noticeable easing effect
            from: 1,
            to: 0,
            loop: false
        },
        x: {
            duration: 2000, // Animate the x-axis
            easing: 'easeOutBounce'
        },
        y: {
            duration: 2000, // Animate the y-axis
            easing: 'easeOutBounce'
        }
    }
    }
  });
}


function setbarchart(forecastdata) {
  const ctx = $("#barchart")[0].getContext("2d");

  const temperatures = [];
  for (let i = 0; i < 5; i++) {
    temperatures.push((forecastdata.list[(i * 8)+1].main.temp - 273.15).toFixed(2));
  }

  if (barChart) {
    barChart.destroy();
  }

  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5'],
      datasets: [{
        label: 'Temperature (°C)',
        data: temperatures,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Temperature (°C)',
            color: 'white'
          },
          ticks: {
            color: 'white'
          }
        },
        x: {
          ticks: {
            color: 'white'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        },
        tooltip: {
          titleColor: 'white',
          bodyColor: 'white'
        }
      },
      animations: {
        tension: {
            duration: 2000,  // Extend the animation duration
            easing: 'easeOutBounce',  // Use a more noticeable easing effect
            from: 1,
            to: 0,
            loop: false
        },
        x: {
            duration: 2000, // Animate the x-axis
            easing: 'easeOutBounce'
        },
        y: {
            duration: 2000, // Animate the y-axis
            easing: 'easeOutBounce'
        }
    }
    }
  });
}

function setdoughnut(forecastdata) {
  const ctx = $("#doughnutchart")[0].getContext("2d");

  const weatherCounts = {};
  for (let i = 0; i < 5; i++) {
    const condition = forecastdata.list[i * 8].weather[0].description;
    weatherCounts[condition] = (weatherCounts[condition] || 0) + 1;
  }

  const labels = Object.keys(weatherCounts);
  const data = Object.values(weatherCounts);

  if (doughnutChart) {
    doughnutChart.destroy();
  }

  doughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: 'Weather Conditions Count',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',  
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        },
        tooltip: {
          titleColor: 'white',
          bodyColor: 'white'
        }
      },
      animations: {
        tension: {
            duration: 2000,  // Longer animation for tension effect
            easing: 'easeOutExpo' // More prominent easing effect
        },
        delay: {
            delay: 1000,  // Delay before animation starts
            duration: 2000 // Slower, more visible transition
        }
    }
    
    }
  });
}



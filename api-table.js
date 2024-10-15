
const menuToggle = document.getElementById('menu-toggle');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Close sidebar when clicking outside of it (for mobile)
document.addEventListener('click', (event) => {
    if (window.innerWidth <= 920 && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});




import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDgQTsqLUOW3d9TjQ9JLXiUQgxpWhehbPk";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

document.getElementById("send-btn").addEventListener("click", async function() {

  

  const input = document.getElementById("chat-input").value.trim();
  
  if (input !== "") {
    document.getElementById("chat-input").value = "";
    const answerArea = document.querySelector(".answer-area");
    answerArea.innerHTML = `<p style="color:white;"> Loading...</p>`;

    try {
      if (input.toLowerCase().includes("weather")) {
        // Weather-related query
        const city = input.split("weather in")[1].trim(); // Get the city from the user's query
        const apiKey = "f84037eb280bda20c7e51c4ec7c48041";
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        if (weatherData.cod === 200) {
          const temp = (weatherData.main.temp - 273.15).toFixed(2);
          const description = weatherData.weather[0].description;
          answerArea.innerHTML = `<p style="color:white;">The weather in ${city} is ${temp} °C with ${description}.</p>`;
        } else {
          answerArea.innerHTML = `<p style="color:white;">Sorry, I couldn't fetch the weather data for ${city}. Please try again.</p>`;
        }
      } else {
        // Non-weather-related query, use Gemini API
        const result = await model.generateContent(input);
        const generatedText = result.response.text();
        answerArea.innerHTML = `<p style="color:white;">${generatedText}</p>`;
      }
    } catch (error) {
      answerArea.innerHTML = `<p>Error: Unable to get a response.</p>`;
      console.error(error);
    }
  }
});



$('.searchbutton').click(async function() {

  
   $(".error").html("");
    
  var city = $('.search-bar').val();
  if(city!=="")
  {
    const api = "f84037eb280bda20c7e51c4ec7c48041";
  
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}`;
    const forecastfetch = await fetch(forecast);
    const forecastdata = await forecastfetch.json();
    let list = forecastdata.list; // Store list for global access
    
    if(forecastdata.cod !== "404")
    {
      const dashboard = $(".dashboard-container");
      if (dashboard.css("display") === "none") {
        dashboard.css("display", "flex");  
      } else {
        dashboard.css("display", "none"); 
      }
  
       // Pagination variables
    const recordsPerPage = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(list.length / recordsPerPage);
  
    // Function to render table with pagination
    function renderTable(page, dataList) {
      let startIndex = (page - 1) * recordsPerPage;
      let endIndex = Math.min(startIndex + recordsPerPage, dataList.length);
  
      let html = `
        <table id="tabledisplay" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: green; color: white;">
              <th style="background-color: green;">Date</th>
              <th style="background-color: green;">Temperature (&#176;C)</th>
              <th style="background-color: green;">Description</th>
            </tr>
          </thead>
          <tbody>
      `;
  
      for (let i = startIndex; i < endIndex; i++) {
        const temp = dataList[i].main.temp;
        const description = dataList[i].weather[0].description;
        const date = dataList[i].dt_txt;
        html += `
          <tr>
            <td>${date}</td>
            <td>${(temp - 273.15).toFixed(2)} &#176;C</td>
            <td>${description}</td>
          </tr>
        `;
      }
  
      html += `
      </tbody>
      </table>
      <div id="pagination-controls" style="margin-top: 10px; text-align: center;">
        <button id="prev-btn" style="background-color: #4CAF50; color: white;padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px; font-size: 14px;" ${page === 1 ? 'disabled' : ''}>Previous</button>
        <span style="color:white;"> Page ${page} of ${totalPages} </span>
        <button id="next-btn" style="background-color: #4CAF50; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px; font-size: 14px;" ${page === totalPages ? 'disabled' : ''}>Next</button>
      </div>
    `;
  
      $("#weather-table").html(html);
  
      // Add hover effect for the buttons after rendering the table
      $('#prev-btn, #next-btn').hover(
        function() {
          $(this).css('background-color', '#45a042');
        },
        function() {
          $(this).css('background-color', '#4CAF50');
        }
      );
  
      // Add event listeners for pagination buttons
      $('#prev-btn').off('click').on('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderTable(currentPage, dataList);
        }
      });
  
      $('#next-btn').off('click').on('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderTable(currentPage, dataList);
        }
      });
    }
  
    // Render the first page of the original list
    renderTable(currentPage, list);
  
    // Event listener for the dropdown to sort/filter
    $("#city-dropdown").change(function() {
      const value = $(this).val();
  
      let sortedList = [...list]; // Create a copy of the list to sort/filter
  
      if (value == 1) {
        // 1. Sort Ascending: Sort by temperature in ascending order
        sortedList.sort((a, b) => a.main.temp - b.main.temp);
        console.log("Sorted Ascending");
      } else if (value == 2) {
        // 2. Filter: Show only days with rain
        sortedList = sortedList.filter(item => item.weather[0].description.includes('rain'));
        console.log("Filtered by rain");
      } else if (value == 3) {
        // 3. Reduce: Find the day with the highest temperature
        const highestTempDay = sortedList.reduce((max, current) => max.main.temp > current.main.temp ? max : current);
        sortedList = [highestTempDay]; // Show only the highest temperature day
        console.log("Day with highest temperature");
      } else if (value == 4) {
        // 4. Sort Descending: Sort by temperature in descending order
        sortedList.sort((a, b) => b.main.temp - a.main.temp);
        console.log("Sorted Descending");
      }
  
      // Render the new table based on the sorted/filtered list
      currentPage = 1; // Reset to the first page
      renderTable(currentPage, sortedList);
    });

    }
    else
    {
      $(".error").html("<p>City Not Found</p>");
    }



   

  }

 
});

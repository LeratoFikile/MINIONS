// Splash Screen Logic
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const loadingBar = document.getElementById('loading-bar');
  
    // Animate the loading bar
    setTimeout(function() {
      loadingBar.style.width = '100%';
    }, 100); // Start the animation slightly after the DOM is loaded
  
    // Hide splash screen after 3 seconds
    setTimeout(function() {
      splashScreen.style.opacity = '0';
      setTimeout(function() {
        splashScreen.style.display = 'none';
      }, 1000); // Allow time for the fade-out effect
    }, 3000); // Duration of splash screen display
  });
  
  // Replace with your actual API key from OpenWeatherMap
  const apiKey = 'a13adb0e40c2d0aa2be1d21db7f715ec';
  const city = 'Durban,ZA'; // ZA is the country code for South Africa
  
  // OpenWeatherMap API URL for current weather
  const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  document.addEventListener('DOMContentLoaded', function() {
    // Fetch current weather data
    fetch(openWeatherUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Add this line to check the response
      document.getElementById('currentTemperature').innerText = `Current Temperature: ${data.main.temp} °C`;
      document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
      document.getElementById('temperature').innerText = `Temperature: Min ${data.main.temp_min} °C, Max ${data.main.temp_max} °C`;
      document.getElementById('soilPh').innerText = `Soil pH: 6.5`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
  
  });
  
  // Function to toggle weather details
  function toggleWeatherDetails() {
    const weatherDetails = document.getElementById('weatherDetails');
    if (weatherDetails.style.display === 'none' || !weatherDetails.style.display) {
      weatherDetails.style.display = 'block';
    } else {
      weatherDetails.style.display = 'none';
    }
  }
  
      document.addEventListener('DOMContentLoaded', function() {
          const fetchNewsData = async () => {
              try {
                  const response = await fetch('../mock-data1.json');
                  if (!response.ok) {
                      throw new Error('Failed to fetch the data');
                  }
                  const data = await response.json();
                  displayUpdates(data);
              } catch (error) {
                  console.error('Error fetching the data:', error);
              }
          };
    
          const displayUpdates = (data) => {
              const updatesContainer = document.querySelector('.slideshow-container');
              updatesContainer.innerHTML = `<h2>Water Outage Updates for ${data.region}</h2>`;
    
              const updateCards = data.updates.map(update => `
                  <div class="update-card" data-description="${update.description}">
                      <img src="${update.image || '../images/download.jpeg'}" alt="${update.title}" class="update-image">
                      <h3>${update.title}</h3>
                      <p>${update.description}</p>
                      <p><strong>Status:</strong> ${update.status}</p>
                      ${update.affected_areas ? `<p><strong>Affected Areas:</strong> ${update.affected_areas.join(', ')}</p>` : ''}
                      ${update.estimated_repair_time ? `<p><strong>Estimated Repair Time:</strong> ${update.estimated_repair_time}</p>` : ''}
                      <p><small><strong>Updated on:</strong> ${new Date(update.date).toLocaleString()}</small></p>
                  </div>
              `).join('');
    
              updatesContainer.innerHTML += `
                  <div class="update-grid">
                      ${updateCards}
                  </div>
              `;
    
              startSlideshow();
          };
    
          let slideshowInterval;
    
          const startSlideshow = () => {
              const cards = document.querySelectorAll('.update-card');
              let index = 0;
    
              const updateDisplay = () => {
                  cards.forEach(card => card.style.display = 'none'); // Hide all cards
                  for (let i = 0; i < 2; i++) { // Show two cards
                      const cardToShow = cards[index + i];
                      if (cardToShow) cardToShow.style.display = 'block';
                  }
                  index = (index + 2) % cards.length; // Increment index by 2
              };
    
              updateDisplay();
              slideshowInterval = setInterval(updateDisplay, 5000); // Change every 5 seconds
    
              cards.forEach(card => {
                  card.addEventListener('click', () => {
                      clearInterval(slideshowInterval);
                      cards.forEach(c => c.style.display = 'none'); // Hide all
                      card.style.display = 'block'; // Show clicked card
                      showDetails(card);
                  });
              });
          };
    
          const showDetails = (card) => {
              alert(card.dataset.description); // Show the description in an alert
          };
    
          fetchNewsData(); // Call the function to load and display the news updates
      });
  
  
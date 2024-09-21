
document.addEventListener('DOMContentLoaded', function() {
  // InitializING the map
  const map = L.map('map').setView([-28.738, 24.766], 6); // Center on Northern Cape


  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  }).addTo(map);

  // Fetch and display default outage data
  fetch('../mock-data.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          displayDefaultOutages(data);
          addWaterOutageMarkers(data); // Add markers to the map
      })
      .catch(error => {
          console.error('Error fetching the water outage data:', error);
      });

  // Event listener for the search button
  document.getElementById('search-btn').addEventListener('click', function() {
      const location = document.getElementById('location').value;
      if (!location) {
          alert('Please enter a location');
          return;
      }

      // Fetching mock data from the JSON file
      fetch('../mock-data.json')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              const filteredData = data.filter(outage => 
                  outage.location.toLowerCase().includes(location.toLowerCase())
              );
              displayOutageInfo(filteredData);
              updateMapMarkers(filteredData); // Update markers on the map
          })
          .catch(error => {
              console.error('Error fetching the water outage data:', error);
          });
  });
});

// Function to display default outage information
function displayDefaultOutages(data) {
  const resultDiv = document.getElementById('outage-result');

  // Clear previous results
  resultDiv.innerHTML = '';

  data.forEach(outage => {
      resultDiv.innerHTML += `
          <div class="outage-card">
              <h3>${outage.location}</h3>
              <p><strong>Status:</strong> ${outage.status}</p>
              <p><strong>Start Time:</strong> ${outage.start_time ? new Date(outage.start_time).toLocaleString() : "N/A"}</p>
              <p><strong>Estimated End Time:</strong> ${outage.end_time ? new Date(outage.end_time).toLocaleString() : "N/A"}</p>
          </div>
          <hr>
      `;
  });
}

// Function to display outage information based on user search
function displayOutageInfo(data) {
  const resultDiv = document.getElementById('outage-result');

  // Clear previous results
  resultDiv.innerHTML = '';

  if (data.length === 0) {
      resultDiv.innerHTML = '<p>No outages reported in your area.</p>';
  } else {
      data.forEach(outage => {
          resultDiv.innerHTML += `
              <div class="outage-card">
                  <h3>${outage.location}</h3>
                  <p><strong>Status:</strong> ${outage.status}</p>
                  <p><strong>Start Time:</strong> ${new Date(outage.start_time).toLocaleString()}</p>
                  <p><strong>Estimated End Time:</strong> ${new Date(outage.end_time).toLocaleString()}</p>
              </div>
              <hr>
          `;
      });
  }
}

// Function to add markers to the map
function addWaterOutageMarkers(outages) {
  outages.forEach(outage => {
      const marker = L.marker([outage.latitude, outage.longitude]).addTo(map);
      marker.bindPopup(`<b>${outage.location}</b><br>Status: ${outage.status}<br>From: ${new Date(outage.start_time).toLocaleString()}<br>To: ${new Date(outage.end_time).toLocaleString()}`);
  });
}

// Function to update markers based on user search
function updateMapMarkers(data) {
  // Clear existing markers (if you want to remove them before adding new ones)
  map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
          map.removeLayer(layer);
      }
  });

  // Add new markers for the filtered data
  addWaterOutageMarkers(data);
}

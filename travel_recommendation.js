const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const resultDiv = document.getElementById('result');

function searchCondition() {
  const input = document.getElementById('userSearch').value.toLowerCase();
  resultDiv.innerHTML = '';  // Clear previous results

  // Fetching data from the JSON file
  fetch('travel_recommendation_api.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const results = [];

      // Search in countries and their cities
      data.countries.forEach(country => {
        country.cities.forEach(city => {
          if (city.name.toLowerCase().includes(input) || city.description.toLowerCase().includes(input)) {
            results.push(city);
          }
        });
      });

      // Search in temples (standalone items)
      data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(input) || temple.description.toLowerCase().includes(input)) {
          results.push(temple);
        }
      });

      // Search in beaches (standalone items)
      data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(input) || beach.description.toLowerCase().includes(input)) {
          results.push(beach);
        }
      });

      // If results are found, display them
      if (results.length > 0) {
        results.forEach(result => {
          const { name, imageUrl, description } = result;
          resultDiv.innerHTML += `
            <div class="result-item">
              <h3>${name}</h3>
              <img src="${imageUrl}" alt="${name}" style="width: 100%; max-width: 300px;">
              <p><strong>Description:</strong> ${description}</p>
            </div>
          `;
        });
      } else {
        resultDiv.innerHTML = 'No results found for your search.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

btnSearch.addEventListener('click', searchCondition);

btnClear.addEventListener('click', () => {
  document.getElementById('userSearch').value = '';  // Clear the input
  resultDiv.innerHTML = '';  // Clear the results
});





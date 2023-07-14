document.addEventListener('DOMContentLoaded', function() {
    const continentSelect = document.getElementById('continent-select');
    const countryGrid = document.getElementById('country-grid');
  
    // Fetch countries based on selected continent
    function fetchCountries(continent) {
      fetch(`https://restcountries.com/v3.1/region/${continent}`)
        .then(response => response.json())
        .then(data => {
          countryGrid.innerHTML = ''; // Clear existing countries
  
          data.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.className = 'country-card';
  
            const flag = document.createElement('img');
            flag.className = 'country-flag';
            flag.src = country.flags.png;
            flag.alt = `${country.name.common} flag`;
            countryCard.appendChild(flag);
  
            const name = document.createElement('div');
            name.className = 'country-name';
            name.textContent = country.name.common;
            countryCard.appendChild(name);
  
            const population = document.createElement('div');
            population.className = 'country-population';
            population.textContent = `Population: ${country.population}`;
            countryCard.appendChild(population);
  
            countryGrid.appendChild(countryCard);
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  
    // Event listener for continent select change
    continentSelect.addEventListener('change', function() {
      const selectedContinent = continentSelect.value;
      fetchCountries(selectedContinent);
    });
  
    // Fetch default continent (Africa) on page load
    fetchCountries('africa');
  });
  
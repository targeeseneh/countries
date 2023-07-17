document.addEventListener('DOMContentLoaded', function() {
  var continentSelect = document.getElementById('continent-select');
  var searchInput = document.getElementById('search-input');
  var countryGrid = document.getElementById('country-grid');
  var countryDetails = document.getElementById('country-details');

  function fetchCountries(continent) {
    fetch('https://restcountries.com/v3.1/region/' + continent)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        countryGrid.innerHTML = '';

        data.forEach(function(country) {
          var countryCard = document.createElement('div');
          countryCard.className = 'country-card';

          var flag = document.createElement('img');
          flag.className = 'country-flag';
          flag.src = country.flags.png;
          flag.alt = country.name.common + ' flag';
          countryCard.appendChild(flag);

          var name = document.createElement('div');
          name.className = 'country-name';
          name.textContent = country.name.common;
          countryCard.appendChild(name);

          var population = document.createElement('div');
          population.className = 'country-population';
          population.textContent = 'Population: ' + country.population;
          countryCard.appendChild(population);

          countryCard.addEventListener('click', function() {
            showCountryDetails(country);
          });

          countryGrid.appendChild(countryCard);
        });
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  }

  continentSelect.addEventListener('change', function() {
    var selectedContinent = continentSelect.value;
    fetchCountries(selectedContinent);
  });

  searchInput.addEventListener('input', function() {
    var searchTerm = searchInput.value.toLowerCase();
    var countries = Array.from(countryGrid.getElementsByClassName('country-card'));

    countries.forEach(function(countryCard) {
      var countryName = countryCard.getElementsByClassName('country-name')[0].textContent.toLowerCase();

      if (countryName.includes(searchTerm)) {
        countryCard.style.display = 'block';
      } else {
        countryCard.style.display = 'none';
      }
    });
  });

  function showCountryDetails(country) {
    countryDetails.innerHTML = '';

    var returnIcon = document.createElement('i');
    returnIcon.className = 'fas fa-arrow-left return-icon';
    returnIcon.addEventListener('click', function() {
      hideCountryDetails();
    });
    countryDetails.appendChild(returnIcon);

    var name = document.createElement('h2');
    name.textContent = country.name.common;
    countryDetails.appendChild(name);

    var capital = document.createElement('p');
    capital.textContent = 'Capital: ' + country.capital;
    countryDetails.appendChild(capital);

    var population = document.createElement('p');
    population.textContent = 'Population: ' + country.population;
    countryDetails.appendChild(population);

    var languages = document.createElement('p');
    var languagesList = Object.values(country.languages).join(', ');
    languages.textContent = 'Languages: ' + languagesList;
    countryDetails.appendChild(languages);
  }

  function hideCountryDetails() {
    countryDetails.innerHTML = '';
  }

  fetchCountries('africa');
});

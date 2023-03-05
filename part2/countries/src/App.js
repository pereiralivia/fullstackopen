import { useState, useEffect } from 'react';
import countriesService from './services/countries';
import weatherService from './services/weather';
import CountrySearchResult from './CountrySearchResult';

const App = () => {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [capitalWeather, setCapitalWeather] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const promise = countriesService.getAll();
    promise.then((response) => setCountries(response));
  }, []);

  useEffect(() => {
    if (country) {
      const promise = weatherService.getCurrentWeather(country.capital[0]);
      promise.then((response) => setCapitalWeather(response));
    }
  }, [country]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleKeyUp = () => {
    filteredCountries.length === 1
      ? setCountry(filteredCountries[0])
      : setCountry('');
  };

  const handleClick = (country) => {
    setCountry(country);
  };

  return (
    <div>
      find countries
      <input
        value={searchKeyword}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      {searchKeyword && (
        <CountrySearchResult
          filteredCountries={filteredCountries}
          country={country}
          capitalWeather={capitalWeather}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default App;


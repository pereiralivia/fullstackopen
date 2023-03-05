import CountriesList from './CountriesList';
import Country from './Country';

const CountrySearchResult = ({
  filteredCountries,
  onClick,
  country,
  capitalWeather,
}) => {
  const results = filteredCountries.length;

  if (country) {
    return <Country country={country} capitalWeather={capitalWeather} />;
  } else {
    if (results > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (results > 1 && results <= 10) {
      return (
        <CountriesList
          filteredCountries={filteredCountries}
          onClick={onClick}
        />
      );
    }
  }
  return '';
};

export default CountrySearchResult;

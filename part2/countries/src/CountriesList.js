const CountriesList = ({ filteredCountries, onClick }) => {
  return (
    <div>
      {filteredCountries.map((country) => (
        <p key={country.name.common}>
          <span>{country.name.common}</span>
          <button onClick={() => onClick(country)}>show</button>
        </p>
      ))}
    </div>
  );
};

export default CountriesList;

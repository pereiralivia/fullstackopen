import CapitalWeather from "./CapitalWeather";

const Country = ({ country, capitalWeather }) => {
  const { name, capital, area, languages, flags } = country;

  return (
    <div>
      <h2>{name.common}</h2>
      <div>
        <p>capital {capital[0]}</p>
        <p>area {area}</p>
      </div>
      <div>
        <h3>languages</h3>
        <ul>
          {Object.values(languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <img src={flags.png} alt={flags.alt} width="150" />
      {capitalWeather && <CapitalWeather capitalWeather={capitalWeather} />}
    </div>
  );
};

export default Country;

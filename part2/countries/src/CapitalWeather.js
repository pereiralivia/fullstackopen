const CapitalWeather = ({ capitalWeather }) => {
  const { name, main, weather, wind } = capitalWeather;

  return (
    <div>
      <h2>Wheather in {name}</h2>
      <p>temperature {main.temp} Celsius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt={weather[0].description}
      />
      <p>wind {wind.speed} m/s</p>
    </div>
  );
};

export default CapitalWeather;
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = 'https://api.openweathermap.org//data/2.5/weather';

const getCurrentWeather = (capitalName) => {
  return axios
    .get(
      `${baseUrl}?q=${capitalName}&units=metric&appid=${apiKey}`
    )
    .then((response) => response.data);
};

export default {
  getCurrentWeather,
};


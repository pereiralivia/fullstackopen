import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) return;

    const getCountry = async () => {
      try {
        setCountry(null);
        setError(null);
        const baseUrl = `https://restcountries.com/v3.1/name`;
        const country = await axios.get(`${baseUrl}/${name}?fullText=true`);
        setCountry(country);
      } catch (e) {
        setError(e);
      }
    };

    getCountry();
  }, [name]);

  return {
    data: country?.data[0],
    found: !error,
  };
};

const Country = ({ country }) => {
  if (!country.data && country.found) {
    return null;
  }

  if (!country.data && !country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;


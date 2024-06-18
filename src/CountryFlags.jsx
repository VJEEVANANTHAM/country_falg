// src/CountryFlags.jsx
import React, { useEffect, useState } from 'react';
import './CountryFlags.css'; // Create and import a CSS file for styling

const CountryFlags = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://xcountries-backend.azurewebsites.net/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCountries(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="country-flags-container">
      {countries.map((country, index) => (
        <div key={index} className="country-flag">
          <img src={country.flag} alt={`${country.name} flag`} />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CountryFlags;

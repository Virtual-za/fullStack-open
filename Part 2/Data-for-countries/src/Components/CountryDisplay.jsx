const CountryDisplay = ({ filtered = [] }) => {
  if (filtered.length === 1) {
    const country = filtered[0];

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>
          {country.capital?.join(', ')}
          <br />
          Area: {country.area}
        </p>

        <h2>Languages</h2>
        {country.languages ? (
          <ul>
            {Object.values(country.languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
        ) : (
          <p>No languages listed</p>
        )}

        <img src={country.flags.png}></img>
      </div>
    );
  }
  return null;
};

export default CountryDisplay;
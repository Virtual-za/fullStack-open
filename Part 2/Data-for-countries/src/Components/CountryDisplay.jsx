const CountryDisplay = ({ filtered = [], selectedCountry = null }) => {
  const country = selectedCountry || (filtered.length === 1 ? filtered[0] : null);
  if (!country) return null;

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

      {country.flags?.png && (
        <img src={country.flags.png} alt={`Flag of ${country.name?.common}`} />
      )}
    </div>
  );
};

export default CountryDisplay;
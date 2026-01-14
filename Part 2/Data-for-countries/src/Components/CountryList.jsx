const CountryList = ({ filtered = [], handleDisplay }) => {
  if (!filtered.length) return <p>No countries match</p>
  else if (filtered.length > 10) return <p>Too many matches, specify another filter </p>
  else if (filtered.length ===1 ) return null;
  return (
    <ul>
      {filtered.map(country => (
        <li key={country.cca3 || country.ccn3 || country.name?.common}>
          {country.name?.common} <button type="button" onClick={() => handleDisplay(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
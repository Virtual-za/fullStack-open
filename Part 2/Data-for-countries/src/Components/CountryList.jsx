const CountryList = ({ filtered = [], handleDisplay }) => {
  if (!filtered.length) return <p className="muted">No countries match</p>
  else if (filtered.length > 10) return <p className="muted">Too many matches, specify another filter</p>
  else if (filtered.length === 1) return null;
  return (
    <ul className="country-list">
      {filtered.map(country => (
        <li className="country-item" key={country.cca3 || country.ccn3 || country.name?.common}>
          <span className="country-name">{country.name?.common}</span>
          <button className="btn btn-small" type="button" onClick={() => handleDisplay(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
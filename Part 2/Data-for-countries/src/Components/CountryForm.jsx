const CountryForm = ({newCountry,handleCountryChange}) => {
  return (
    <form className="country-form" onSubmit={(e)=>e.preventDefault()}>
      <label htmlFor="country-search">Find countries</label>
      <input
        id="country-search"
        className="country-input"
        value={newCountry}
        onChange={handleCountryChange}
        placeholder="Search by name..."
      />
    </form>
  )
}
export default CountryForm
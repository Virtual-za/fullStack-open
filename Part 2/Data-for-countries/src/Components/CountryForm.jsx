const CountryForm = ({newCountry,handleCountryChange}) => {
    return (
        <div>find countries <input value={newCountry} onChange={handleCountryChange} /></div>
    )
}
export default CountryForm
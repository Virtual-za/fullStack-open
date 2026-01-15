import { useState,useEffect } from 'react'
import CountryForm from './Components/CountryForm'
import './App.css'
import countryService from './Services/countries.js'
import CountryList from './Components/CountryList.jsx'
import CountryDisplay from './Components/CountryDisplay.jsx'

const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key now has the value set in startup

const App =()=> {
  const [newCountry,setNewCountry] = useState('');
  const [countries,setCountries] = useState([]);
  
const hook = () => {
    console.log("effect");
    countryService.getAll().then((Response) => {
      console.log("promise fulfilled");
      setCountries(Response.data);
     
      
    });
  };
  useEffect(hook,[])


  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryChange = (e) => {
    setNewCountry(e.target.value)
    setSelectedCountry(null)
    console.log(e.target.value)
  }

  const filteredCountries = newCountry.trim() === ''
    ? countries
    : countries.filter(country =>
        country.name?.common?.toLowerCase().includes(newCountry.toLowerCase())
      );

  const handleDisplay = (country) => {
    setSelectedCountry(country);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Country Finder</h1>
        <p className="app-sub">Search countries and view details + weather</p>
      </header>

      <main className="app-main">
        <aside className="search-panel">
          <CountryForm newCountry={newCountry} handleCountryChange={handleCountryChange} />
          <CountryList filtered={filteredCountries} handleDisplay={handleDisplay} />
        </aside>

        <section className="detail-panel">
          <CountryDisplay filtered={filteredCountries} selectedCountry={selectedCountry} />
        </section>
      </main>
    </div>
  )} 
  
  export default App

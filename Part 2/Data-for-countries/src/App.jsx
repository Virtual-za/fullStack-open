import { useState,useEffect } from 'react'
import CountryForm from './Components/CountryForm'
import './App.css'
import countryService from './Services/countries.js'
import CountryList from './Components/CountryList.jsx'
import CountryDisplay from './Components/CountryDisplay.jsx'

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
    <div>
      <CountryForm newCountry={newCountry} handleCountryChange={handleCountryChange} />
      <CountryList filtered={filteredCountries} handleDisplay={handleDisplay} />
      <CountryDisplay filtered={filteredCountries} selectedCountry={selectedCountry} />

    </div>
  )}
  
  export default App

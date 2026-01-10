import { useState } from "react";
import Filter from "./Components/Filter.jsx";
import PersonForm from "./Components/PersonForm.jsx"
import Persons from "./Components/Persons.jsx";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    console.log("button clicked", event.target);

    const isIncluded = persons.some((person) => person.name === newName);
    if (isIncluded) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewNumber("");
  };
  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };
   const filtered = filter.trim() === '' 
    ? persons 
    : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handler={handleFilterChange} />

      <h2>add a new</h2>
     <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
    <Persons filtered={filtered}/>
    
    </div>
  );
};

export default App;

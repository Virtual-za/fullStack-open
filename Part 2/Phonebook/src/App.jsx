import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Components/Filter.jsx";
import PersonForm from "./Components/PersonForm.jsx";
import Persons from "./Components/Persons.jsx";
import personService from "./Services/persons.js";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const hook = () => {
    console.log("effect");
    personService.getAll().then((Response) => {
      console.log("promise fulfilled");
      setPersons(Response.data);
    });
  };

  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();

    console.log("button clicked", event.target);

    const isIncluded = persons.some((person) => person.name === newName);
    if (isIncluded && persons.some((person) => person.number === newNumber)) {
      alert(`${newName} is already added to phonebook`);
    } else if (persons.some((person) => person.number !== newNumber)) {
      {
        if (
          window.confirm(
            `${newName} is already added to phonebook,replace the old number with a new one?`
          )
        ) {
          const findName = persons.find((person) => person.name === newName);

          const updatedItem = { ...findName, number: newNumber };
          console.log(updatedItem);
          personService.update(findName.id, updatedItem).then((response) => {
            setPersons(
              persons.map((p) => (p.id !== findName.id ? p : response.data))
            );
          });
        }
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      //add person to server
      personService.create(personObject);
      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewNumber("");
    
  };
  
  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    console.log(id);
    personService
      .deleteItem(id)
      .then(() => { 
        setPersons(persons.filter((p) => p.id !== id));
      })
      .catch((error) => {
        alert(`Information of ${name} has already been removed from server`);
        setPersons(persons.filter((p) => p.id !== id));
      });
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
  const filtered =
    filter.trim() === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handler={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filtered={filtered} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

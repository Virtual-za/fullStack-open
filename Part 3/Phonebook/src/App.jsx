import { useState, useEffect } from "react";

import Filter from "./Components/Filter.jsx";
import PersonForm from "./Components/PersonForm.jsx";
import Persons from "./Components/Persons.jsx";
import personService from "./Services/persons.js";
import Notification from "./Components/Notification.jsx";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage,setErrorMessage] = useState(null)
  const [successMessage,setSuccessMessage] = useState(null)

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
    const existing = persons.find((p) => p.name === newName);

    if (existing) {
      if (existing.number === newNumber) {
        alert(`${newName} is already added to phonebook`);
      } else {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const updatedItem = { ...existing, number: newNumber };
          personService
            .update(existing.id, updatedItem)
            .then((response) => {
              setPersons(
                persons.map((p) => (p.id !== existing.id ? p : response.data))
              );
              setSuccessMessage(`Number replaced for ${existing.name}`);
              setTimeout(() => setSuccessMessage(null), 5000);
            })
            .catch(() => {
              setErrorMessage(
                `Information of ${newName} has already been removed from the server`
              );
              setTimeout(() => setErrorMessage(null), 5000);
              setPersons(persons.filter((p) => p.id !== existing.id));
            });
        }
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      // add person to server and update UI with server response
      personService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setSuccessMessage(`Added ${response.data.name}`);
          setTimeout(() => setSuccessMessage(null), 5000);
        })
        .catch(() => {
          setErrorMessage("Failed to add person");
          setTimeout(() => setErrorMessage(null), 5000);
        });
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
        setErrorMessage(
          `Information of ${name} has already been removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)}
          ,5000)
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
    
      <Notification message={successMessage} type="success"/>
    <Notification message={errorMessage} type="error"/>
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
  );}
  

export default App;

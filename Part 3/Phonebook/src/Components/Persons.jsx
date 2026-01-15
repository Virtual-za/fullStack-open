const Persons = ({ filtered = [],handleDelete }) => {
  return (
    <>
      {filtered.map((person) => (
        <div key={person.id}>
         <li> {person.name} {person.number} <button type="button" onClick={() => handleDelete(person.id, person.name)}>delete</button></li>
        </div>
      ))}
    </>
  );
};

export default Persons;
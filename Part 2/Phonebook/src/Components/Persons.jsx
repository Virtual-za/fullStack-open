const Persons = ({ filtered = []}) => {
  return (
    <>
      {{filtered}.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};

export default Persons;
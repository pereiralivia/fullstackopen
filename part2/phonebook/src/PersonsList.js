const PersonsList = ({ filteredPersons, onClick }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => onClick(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default PersonsList;


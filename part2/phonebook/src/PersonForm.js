const PersonForm = ({ newPerson, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <h2>add a new</h2>
        <div>
          name:
          <input value={newPerson.name} name="name" onChange={onChange} />
        </div>
        <div>
          number:
          <input value={newPerson.number} name="number" onChange={onChange} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;


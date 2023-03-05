import './App.css';
import { useState, useEffect } from 'react';
import personsService from './services/persons';

import Filter from './Filter';
import PersonForm from './PersonForm';
import PersonsList from './PersonsList';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [notificationMessage, setNotificationMessage] = useState({
    type: '',
    message: '',
  });

  useEffect(() => {
    const promise = personsService.getPersons();
    promise.then((persons) => setPersons(persons));
  }, []);

  const handleNewPersonChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handlePersonSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const showNotificationMessage = (type, message) => {
    setNotificationMessage({ type, message });
    setTimeout(
      () =>
        setNotificationMessage({
          type: '',
          message: '',
        }),
      5000
    );
  };

  const handleCreatePerson = (person) => {
    const promise = personsService.createPerson(person);
    return promise.then((personCreated) => {
      showNotificationMessage('success', `Added ${personCreated.name}`);
      setPersons([...persons, personCreated]);
    });
  };

  const handleUpdatePersonNumber = () => {
    if (
      !window.confirm(
        `${newPerson.name} is alreay added to phonebook, replace the old number with a new one?`
      )
    )
      return;

    const person = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    const { id, name, number } = person;

    const promise = personsService.updatePerson(id, newPerson);
    return promise.then((personUpdated) => {
      setPersons(
        persons.map((person) =>
          person.id === personUpdated.id
            ? { ...person, number: personUpdated.number }
            : person
        )
      );
      showNotificationMessage(
        'success',
        `${name}'s number changed from ${number} to ${personUpdated.number}`
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const personAlreadyExists = persons.some(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    personAlreadyExists
      ? handleUpdatePersonNumber()
      : handleCreatePerson(newPerson);

    setNewPerson({ name: '', number: '' });
  };

  const handleDelete = (personToDelete) => {
    const { id, name } = personToDelete;

    if (!window.confirm(`Delete ${name}?`)) return;

    const promise = personsService.deletePerson(id);
    return promise
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        showNotificationMessage(
          'error',
          `Information of ${name} has already been removed from server`
        );
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {notificationMessage.message && (
        <Notification notificationMessage={notificationMessage} />
      )}
      <Filter searchKeyword={searchKeyword} onChange={handlePersonSearch} />
      <PersonForm
        newPerson={newPerson}
        onChange={handleNewPersonChange}
        onSubmit={handleSubmit}
      />
      <PersonsList filteredPersons={filteredPersons} onClick={handleDelete} />
    </div>
  );
};

export default App;


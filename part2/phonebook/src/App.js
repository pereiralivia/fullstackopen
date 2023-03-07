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
  const [notificationMessage, setNotificationMessage] = useState({ type: '', message: '' });

  useEffect(() => {
    const promise = personsService.getPersons();
    promise.then((persons) => setPersons(persons));
  }, []);

  const filteredPersons = persons?.filter((person) => person?.name?.toLowerCase().includes(searchKeyword?.toLowerCase()));

  const utils = {
    showNotificationMessage: (type, message) => {
      setNotificationMessage({ type, message });
      setTimeout(() => setNotificationMessage({ type: '', message: '' }), 5000);
    },
  };

  const createPerson = (person) => {
    const promise = personsService.createPerson(person);
    return promise
      .then((personCreated) => {
        utils.showNotificationMessage('success', `Added ${personCreated.name}`);
        setPersons([...persons, personCreated]);
      })
      .catch((error) =>
        utils.showNotificationMessage('error', error.response.data.error)
      );
  };

  const updatePerson = () => {
    if (!window.confirm(`${newPerson.name} is alreay added to phonebook, replace the old number with a new one?`)) return;

    const person = persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase());
    const { id, name, number } = person;

    const promise = personsService.updatePerson(id, newPerson);
    return promise
      .then((personUpdated) => {
        setPersons(persons.map((person) => person.id === id ? { ...person, number: personUpdated.number } : person));
        utils.showNotificationMessage('success', `${name}'s number changed from ${number} to ${personUpdated.number}`);
      })
      .catch((error) =>
        utils.showNotificationMessage('error', error.response.data.error)
      );
  };

  const deletePerson = (personToDelete) => {
    const { id, name } = personToDelete;

    if (!window.confirm(`Delete ${name}?`)) return;

    const promise = personsService.deletePerson(id);
    return promise
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) =>
        utils.showNotificationMessage('error', error.response.data.error)
      );
  };

  const handlers = {
    newPersonChange: (e) => setNewPerson({ ...newPerson, [e.target.name]: e.target.value }),
    searchKeywordChange: (e) => setSearchKeyword(e.target.value),
    submitForm: (e) => {
      e.preventDefault();

      const personExists = persons.some(
        (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      );
      personExists ? updatePerson() : createPerson(newPerson);
  
      setNewPerson({ name: '', number: '' });
    }, 
    createPerson: (person) => {
      const promise = personsService.createPerson(person);
      return promise
        .then((personCreated) => {
          utils.showNotificationMessage('success', `Added ${personCreated.name}`);
          setPersons([...persons, personCreated]);
        })
        .catch((error) =>
          utils.showNotificationMessage('error', error.response.data.error)
        );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notificationMessage.message && (
        <Notification notificationMessage={notificationMessage} />
      )}
      <Filter
        searchKeyword={searchKeyword}
        onChange={handlers.searchKeywordChange}
      />
      <PersonForm
        newPerson={newPerson}
        onChange={handlers.newPersonChange}
        onSubmit={handlers.submitForm}
      />
      <PersonsList filteredPersons={filteredPersons} onClick={deletePerson} />
    </div>
  );
};

export default App;


import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = (payload) => {
  const request = axios.post(baseUrl, payload);
  return request.then((response) => response.data);
};

const updatePerson = (id, payload) => {
  const request = axios.put(`${baseUrl}/${id}`, payload);
  return request.then((response) => response.data);
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default {
  getPersons,
  createPerson,
  deletePerson,
  updatePerson
};


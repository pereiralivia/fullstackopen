import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils';

const routes = express.Router();

routes.get('/', (_request, response) => {
  response.send(patientService.getNonSensitivePatients())
})

routes.get('/:id', (request, response) => {
  try {
    response.send(patientService.getPatientById(request.params.id))
  } catch (error) {
    let errorMessage = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMessage += error.message
    }
    response.status(404).send(errorMessage)
  }
})

routes.post('/', (request, response) => {
  try {
    const newPatient = toNewPatient(request.body);
    const addedPatient = patientService.addPatient(newPatient);
    response.send(addedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMessage += error.message
    }
    response.status(400).send(errorMessage);
  }
})

routes.post('/:id/entries', (request, response) => {
  try {
    const newEntry = toNewEntry(request.body);
    const updatedPatient = patientService.addEntry(request.params.id, newEntry)
    response.send(updatedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMessage += error.message
    }
    response.status(400).send(errorMessage);
  }
})

export default routes;
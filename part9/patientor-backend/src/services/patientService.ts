import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient, NewEntry } from "../types";
import patientsData from '../../data/patients';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
}

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
}

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }))
}

const addPatient = (patient: NewPatient): Patient => {
  const patientToAdd = {
    id: uuid(),
    ...patient
  }

  patients.push(patientToAdd);
  return patientToAdd;
}

const addEntry = (patientId: string, entry: NewEntry): Patient => {
  const entryToAdd = {
    id: uuid(),
    ...entry
  }

  const patient = patients.find(p => p.id === patientId)

  if (!patient) throw new Error('Patient now found')

  patient.entries = [...patient.entries, entryToAdd]
  return patient

}

export default {
  getPatients,
  getPatientById,
  getNonSensitivePatients,
  addPatient,
  addEntry,
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Typography, Box, Button } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import PatientEntry from "./PatientEntry";
import AddPatientEntryForm from "./AddPatientEntryForm";

import { Patient, Diagnosis } from "../../types";

import patientService from '../../services/patients'
import diagnoseService from "../../services/diagnoses";


const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>()
  const [showAddEntryForm, setShowAddEntryForm] = useState(false);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const diagnoses = await diagnoseService.getDiagnoses();
        setDiagnoses(diagnoses);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDiagnoses();
  }, [])

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        const patient = await patientService.getPatientByid(id);
        setPatient(patient);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPatient();
  }, [id])

  return (
    <Box sx={{ paddingTop: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {patient?.name}
        {patient?.gender === 'male' ? <MaleIcon /> : patient?.gender === 'female' ? <FemaleIcon /> : null}
      </Typography>
      <Box sx={{ paddingTop: 2 }}>
        <Typography>ssn: {patient?.ssn}</Typography>
        <Typography>occupation: {patient?.occupation}</Typography>
      </Box>
      {
        showAddEntryForm ? (
          <Box>
            {patient?.id && <AddPatientEntryForm id={patient.id} setPatient={setPatient} setShowAddEntryForm={setShowAddEntryForm} diagnoses={diagnoses} />}
          </Box>
        ) : (
          <Button
            color="primary"
            variant="contained"
            style={{ float: "left", marginTop: 2 }}
            type="button"
            onClick={() => setShowAddEntryForm(true)}>Add entry</Button>
        )
      }
      <Box sx={{ paddingTop: 8 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', paddingBottom: 2 }}>entries</Typography>
        {patient?.entries && <PatientEntry entries={patient?.entries} diagnoses={diagnoses} />}
      </Box>
    </Box>
  )
}

export default PatientDetailsPage;
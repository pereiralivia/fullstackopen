import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react"
import axios from 'axios';

import { TextField, Select, MenuItem, InputLabel, Grid, Button, Alert, Container, OutlinedInput, Rating } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Diagnosis, Patient, HealthCheckRating, PatientEntryFormValues } from "../../types"
import patientService from "../../services/patients";

interface AddPatientEntryFormProps {
  id: string
  diagnoses: Diagnosis[]
  setPatient: Dispatch<SetStateAction<Patient | undefined>>
  setShowAddEntryForm: React.Dispatch<React.SetStateAction<boolean>>
}

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const AddPatientEntryForm = ({ id, diagnoses, setPatient, setShowAddEntryForm }: AddPatientEntryFormProps) => {
  const [type, setType] = useState('HealthCheck')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([])
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.LowRisk);
  const [employerName, setEmployerName] = useState('')
  const [sickLeave, setSickLeave] = useState({ startDate: '', endDate: '' })
  const [discharge, setDischarge] = useState({ date: '', criteria: '' })
  const [error, setError] = useState('');

  const codes = diagnoses?.map(d => d.code)

  const resetFormState = (): void => {
    setType('HealthCheck')
    setDate('')
    setDescription('')
    setSpecialist('')
    setDiagnosisCodes([])
    setHealthCheckRating(HealthCheckRating.LowRisk);
    setEmployerName('')
    setSickLeave({ startDate: '', endDate: '' })
    setDischarge({ date: '', criteria: '' })
    setError('');
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const baseEntry = {
      date,
      description,
      specialist,
      diagnosisCodes,
    }

    const getEntryObject = (type: string): PatientEntryFormValues => {
      switch (type) {
        case 'HealthCheck':
          return { ...baseEntry, type: "HealthCheck", healthCheckRating }
        case 'OccupationalHealthcare':
          return { ...baseEntry, type: "OccupationalHealthcare", employerName, sickLeave }
        case 'Hospital':
          return { ...baseEntry, type: "Hospital", discharge }
        default:
          return { ...baseEntry, type: "HealthCheck", healthCheckRating }
      }
    }

    try {
      const patient = await patientService.createEntry(id, getEntryObject(type))
      setPatient(patient);
      resetFormState();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  }

  return (
    <div>
      <Container>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: 'column', gap: 10 }}>
          <InputLabel style={{ marginTop: 20 }}>Entry type</InputLabel>
          <Select
            label="Entry type"
            value={type}
            onChange={({ target }) => setType(target.value)}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue || date)}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />

          <InputLabel id="demo-multiple-name-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={diagnosisCodes}
            onChange={({ target: { value } }) => setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value)}
            input={<OutlinedInput label="Name" />}
          >
            {codes.map((code) => (
              <MenuItem
                key={code}
                value={code}
              >
                {code}
              </MenuItem>
            ))}
          </Select>

          {type === 'HealthCheck' && (
            <StyledRating
              name="customized-color"
              value={healthCheckRating}
              precision={1}
              max={3}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              onChange={(event, newValue) => {
                setHealthCheckRating(Number(newValue));
              }}
            />

          )}

          {type === 'Hospital' && (
            <>
              <DatePicker
                label="Discharge date"
                value={discharge.date}
                onChange={(newValue) => setDischarge({ ...discharge, date: newValue || discharge.date })}
              />

              <TextField
                label="Discharge criteria"
                fullWidth
                value={discharge.criteria}
                name="criteria"
                onChange={({ target }) => setDischarge({ ...discharge, [target.name]: [target.value] })}
              />
            </>
          )}

          {type === 'OccupationalHealthcare' && (
            <>
              <TextField
                label="Employer Name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />

              <DatePicker
                label="Sick leave - Start date"
                value={sickLeave.startDate}
                onChange={(newValue) => setSickLeave({ ...sickLeave, startDate: newValue || sickLeave.startDate })}
              />
              <DatePicker
                label="Sick leave - End date"
                value={sickLeave.endDate}
                onChange={(newValue) => setSickLeave({ ...sickLeave, endDate: newValue || sickLeave.endDate })}
              />
            </>

          )}

          <Grid sx={{ paddingY: 2 }}>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={() => setShowAddEntryForm(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  )
}

export default AddPatientEntryForm;
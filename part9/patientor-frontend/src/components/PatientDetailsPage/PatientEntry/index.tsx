import { Box, Typography } from "@mui/material";

import { Entry, Diagnosis } from "../../../types";

import HealthCheck from "./HealthCheck";
import OccupationalHealthcare from "./OccupationalHealthcare";
import Hospital from "./Hospital";

interface PatientEntryProps {
  entries: Entry[],
  diagnoses: Diagnosis[],
}

const PatientEntry = (props: PatientEntryProps) => {
  if (props.entries.length === 0) return <Typography>Patient has no entries yet.</Typography>

  return (
    <Box>
      {
        props.entries.map(entry => {
          switch (entry.type) {
            case 'HealthCheck':
              return <HealthCheck key={entry.id} entry={entry} diagnoses={props.diagnoses} />
            case 'OccupationalHealthcare':
              return <OccupationalHealthcare key={entry.id} entry={entry} diagnoses={props.diagnoses} />
            case 'Hospital':
              return <Hospital key={entry.id} entry={entry} diagnoses={props.diagnoses} />
            default:
              return null;
          }
        })
      }
    </Box>
  )
}

export default PatientEntry;
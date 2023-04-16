import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import { Diagnosis, OccupationalHealthcareEntry } from "../../../types";

interface OccupationalHealthcareProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcare = ({ entry, diagnoses }: OccupationalHealthcareProps) => {
  return (
    <Box key={entry.id} sx={{ padding: 1, marginTop: 2, border: '1px solid black', borderRadius: 1 }}>
      <Typography variant="body1">{entry.date}<WorkIcon /><span>{entry.employerName}</span></Typography>
      <Typography sx={{ fontStyle: 'italic' }}>{entry.description}</Typography>
      <List>
        {entry.diagnosisCodes?.map((code) => {
          const diagnose = diagnoses?.find(d => d.code === code);
          return <ListItem key={code}><ListItemText primary={`${code} ${diagnose?.name}`} /></ListItem>
        })}
      </List>
      {entry.sickLeave && (
        <Box sx={{ paddingBottom: 2 }}>
          <Typography sx={{ fontWeight: 'bold', paddingBottom: 1 }}>Sick leave</Typography>
          <Typography>Start date: {entry.sickLeave?.startDate}</Typography>
          <Typography>Sick leave: {entry.sickLeave?.endDate}</Typography>
        </Box>
      )}
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  )
}

export default OccupationalHealthcare;
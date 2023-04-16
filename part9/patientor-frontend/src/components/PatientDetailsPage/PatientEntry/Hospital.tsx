import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Diagnosis, HospitalEntry } from "../../../types";

interface HospitalProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const Hospital = ({ entry, diagnoses }: HospitalProps) => {
  return (
    <Box key={entry.id} sx={{ padding: 1, marginTop: 2, border: '1px solid black', borderRadius: 1 }}>
      <Typography variant="body1">{entry.date}<LocalHospitalIcon /></Typography>
      <Typography sx={{ fontStyle: 'italic' }}>{entry.description}</Typography>
      <List>
        {entry.diagnosisCodes?.map((code) => {
          const diagnose = diagnoses?.find(d => d.code === code);
          return <ListItem key={code}><ListItemText primary={`${code} ${diagnose?.name}`} /></ListItem>
        })}
      </List>
      {entry.discharge && (
        <Box sx={{ paddingBottom: 2 }}>
          <Typography sx={{ fontWeight: 'bold', paddingBottom: 1 }}>Discharge</Typography>
          <Typography>Date: {entry.discharge?.date}</Typography>
          <Typography>Criteria: {entry.discharge?.criteria}</Typography>
        </Box>
      )}

      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  )
}

export default Hospital;
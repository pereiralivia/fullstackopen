import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Diagnosis, HealthCheckEntry } from "../../../types";

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheck = ({ entry, diagnoses }: HealthCheckEntryProps) => {
  return (
    <Box key={entry.id} sx={{ padding: 1, marginTop: 2, border: '1px solid black', borderRadius: 1 }}>
      <Typography variant="body1">{entry.date} <MonitorHeartIcon /></Typography>
      <Typography sx={{ fontStyle: 'italic' }}>{entry.description}</Typography>
      <List>
        {entry.diagnosisCodes?.map((code) => {
          const diagnose = diagnoses?.find(d => d.code === code);
          return <ListItem key={code}><ListItemText primary={`${code} ${diagnose?.name}`} /></ListItem>
        })}
      </List>
      <FavoriteIcon color={entry.healthCheckRating === 3 ? 'error' : entry.healthCheckRating === 2 ? 'warning' : entry.healthCheckRating === 1 ? 'info' : 'success'} />
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  )
}

export default HealthCheck;
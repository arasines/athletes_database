import { Grid } from '@mui/material';
import config from 'config';

export default function AthletePage(): React.ReactElement {
  return (
    <Grid container spacing={config.gridSpacing}>
      <Grid item md={12}></Grid>
    </Grid>
  );
}

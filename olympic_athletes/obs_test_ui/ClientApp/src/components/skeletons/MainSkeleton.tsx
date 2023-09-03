// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import config from 'config';

// ==============================|| SKELETON TOTAL GROWTH BAR CHART ||============================== //

const MainSkeleton = () => (
  <Card>
    <CardContent>
      <Grid container spacing={config.gridSpacing}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={config.gridSpacing}>
            <Grid item xs zeroMinWidth>
              <Skeleton variant="rectangular" height={50} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={530} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default MainSkeleton;

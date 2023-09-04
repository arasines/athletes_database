import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import config from 'config';

const MainSkeleton = () => (
  <Card>
    <CardHeader avatar={<Skeleton variant="rectangular" height={140} width={140} />} title={<Skeleton variant="rectangular" height={140} />} />
    <CardContent>
      <Grid container spacing={config.gridSpacing}>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={150} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={300} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default MainSkeleton;

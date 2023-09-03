import { useQuery } from '@apollo/client';
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ErrorPanel } from 'components/controls/error.panel';
import MainSkeleton from 'components/skeletons/MainSkeleton';
import config from 'config';
import { GET_GAMES, GET_PAGED_ATHLETES, IGame } from 'models';

export default function LandingPage(): React.ReactElement {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const size = matchDownSm ? 200 : matchDownMd ? 300 : 500;

  const { loading, error, data } = useQuery(GET_GAMES.query);
  if (loading) return <MainSkeleton />;
  if (error) return <ErrorPanel error={error} />;
  return (
    <Grid container spacing={config.gridSpacing}>
      <Grid item md={12}>
        {data[GET_GAMES.queryNode].map((e: IGame) => (
          <Grid item md={12} key={e.gameId}>
            <Typography>{e.city}</Typography>
            
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

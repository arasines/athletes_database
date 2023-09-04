import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import MainCard from 'components/cards/MainCard';
import { ErrorPanel } from 'components/controls/error.panel';
import MainSkeleton from 'components/skeletons/MainSkeleton';
import config from 'config';
import { GET_GAMES, IGame } from 'models';
import { GameAthletes } from './GameAthletes';
import useDocumentTitle from 'helpers/useDocumentTitle';
import strings from 'res/string';

export default function LandingPage(): React.ReactElement {
  useDocumentTitle(strings.main.project.name);
  const { loading, error, data } = useQuery(GET_GAMES.query);
  if (loading) return <MainSkeleton />;
  if (error) return <ErrorPanel error={error} />;
  return (
    <Grid container spacing={config.gridSpacing}>
      {data[GET_GAMES.queryNode].map((e: IGame) => (
        <Grid item xs={12} md={12} lg={12} key={e.gameId}>
          <MainCard title={`${e.city} ${e.year}`} border={false} divider={false} sx={{ paddingBottom: 2 }} contentSX={{ py: 1, paddingBottom: '0!important' }}>
            <GameAthletes gameId={e.gameId} />
          </MainCard>
        </Grid>
      ))}
    </Grid>
  );
}

import { useQuery } from '@apollo/client';
import { Avatar, Button, CardActions, CardContent, CardHeader, Grid, IconButton, List, ListItem, ListItemText, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import MainCard from 'components/cards/MainCard';
import { ErrorPanel } from 'components/controls/error.panel';
import MainSkeleton from 'components/skeletons/MainSkeleton';
import config from 'config';
import { GET_ATHLETE_BY_ID } from 'models';
import { useNavigate, useParams } from 'react-router-dom';
import medal_bronze from 'assets/images/medal_bronze.png';
import medal_gold from 'assets/images/medal_gold.png';
import medal_silver from 'assets/images/medal_silver.png';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import useDocumentTitle from 'helpers/useDocumentTitle';
import ReactMarkdown from 'react-markdown';

interface TitleProps {
  title: string;
  value: string;
}
function TitleCard({ title, value }: TitleProps): React.ReactElement {
  return (
    <Typography variant="h4" sx={{ lineHeight: 1, fontWeight: 'normal' }}>
      <b>{title}: </b>
      {` ${value}`}
    </Typography>
  );
}
export default function AthletePage(): React.ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { loading, error, data } = useQuery(GET_ATHLETE_BY_ID.query, { variables: { id: id } });
  const athlete = loading ? {} : data[GET_ATHLETE_BY_ID.queryNode];
  useDocumentTitle(`${athlete.fullName} Details`);
  if (loading) return <MainSkeleton />;
  if (error) return <ErrorPanel error={error} />;

  return (
    <MainCard sx={{ height: '100%' }} border={false} elevation={1}>
      <CardHeader
        avatar={
          <Avatar
            variant="square"
            aria-label="athlete"
            sx={smallScreen ? { height: 100, width: 100 } : { width: 140, height: 140 }}
            src={`data:${athlete.photo.mimeType};base64,${athlete.photo.photo}`}
          />
        }
        title={
          <Typography variant="h2" sx={{ paddingBottom: 1 }}>
            {athlete.fullName}
          </Typography>
        }
        action={
          <IconButton size="small" onClick={() => navigate('/')} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
            <ArrowBackOutlinedIcon />
          </IconButton>
        }
        subheader={
          <Stack direction={'column'} spacing={config.gridSpacing - 1}>
            <TitleCard title="DOB" value={athlete.dateOfBirth} />
            <TitleCard title="Weight" value={`${athlete.weight}kg`} />
            <TitleCard title="Height" value={`${athlete.height}cm`} />
          </Stack>
        }
      />
      <CardContent>
        <Grid container spacing={config.gridSpacing}>
          <Grid item xs={12}>
            <Typography variant="h3">Medals</Typography>
            <List dense sx={{ py: 0 }}>
              {athlete.athleteResults.map((result: any) => {
                return (
                  <ListItem
                    sx={{ py: 0 }}
                    key={result.game.city}
                    secondaryAction={
                      <Stack direction={'row'} spacing={1}>
                        {result.gold > 0 && (
                          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
                            {result.gold}
                            <img src={medal_gold} alt={'gold medals'} style={{ height: 16 }} />
                          </Typography>
                        )}
                        {result.silver > 0 && (
                          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
                            {result.silver}
                            <img src={medal_silver} alt={'solver medals'} style={{ height: 16 }} />
                          </Typography>
                        )}
                        {result.bronze > 0 && (
                          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
                            {result.bronze}
                            <img src={medal_bronze} alt={'gold medals'} style={{ height: 16 }} />
                          </Typography>
                        )}
                      </Stack>
                    }
                  >
                    <ListItemText primary={<Typography variant="h4">{result.game.city}</Typography>} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          {/* <Grid item xs={12} sx={{ padding: 0, display: { xs: 'flex', sm: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
            <Button variant="text" color="inherit" startIcon={<ArrowBackOutlinedIcon />} onClick={() => navigate('/')}>
              Back to Athletes List
            </Button>
          </Grid> */}
          <Grid item xs={12}>
            <Typography variant="h3">Bio</Typography>
            <ReactMarkdown>{athlete.bio}</ReactMarkdown>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ padding: 0, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="text" color="inherit" startIcon={<ArrowBackOutlinedIcon />} onClick={() => navigate('/')}>
          Back to Athletes List
        </Button>
      </CardActions>
    </MainCard>
  );
}

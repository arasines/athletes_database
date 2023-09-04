import { useQuery } from '@apollo/client';
import { Alert } from '@mui/material';
import { ErrorPanel } from 'components/controls/error.panel';
import { GET_PAGED_ATHLETES, IAthlete } from 'models';
import { ThumbnailCard } from './ThumbnailCard';
import { sortDesc } from 'helpers/utils';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import ThumbnailSkeleton from 'components/skeletons/ThumbnailSkeleton';

interface Props {
  gameId: string;
}
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 12,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 12,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};
export function GameAthletes({ gameId }: Props): React.ReactElement {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PAGED_ATHLETES.query, { variables: { id: gameId.toString() } });
  const athletePage = loading || error ? { edges: [], totalCount: 0 } : data[GET_PAGED_ATHLETES.queryNode];
  const athletes = athletePage.edges.map((item: any) => ({ ...item.node }));
  const handleOnClick = (id: string) => {
    navigate(`athlete\\${id}`);
  };
  if (loading) return <ThumbnailSkeleton />;
  if (error) return <ErrorPanel error={error} />;
  if (athletePage.totalCount === 0) return <Alert severity="info">No Athletes available</Alert>;
  return (
    <Carousel responsive={responsive} autoPlay={false} infinite={true} showDots={true}>
      {sortDesc(athletes, 'globalScore').map((e: IAthlete) => (
        <ThumbnailCard data={e} onClick={handleOnClick} key={e.athleteId} />
      ))}
    </Carousel>
  );
}

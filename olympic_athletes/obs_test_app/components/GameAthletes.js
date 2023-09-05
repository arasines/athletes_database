import { GET_PAGED_ATHLETES } from '../models/graphql.queries';
import { useQuery } from '@apollo/client';
import { Text, FlatList } from 'react-native';
import AthleteCard from './AthleteCard';
import SkeletonListLoader from './skeletons/SkeletonListLoader';

 const sortDesc = (arr, field) => {
    return arr.sort((a, b) => {
      if (a[field] > b[field]) {
        return -1;
      }
      if (b[field] > a[field]) {
        return 1;
      }
      return 0;
    });
  };

const GameAthletes = ({ gameId, navigation }) => {
    const { loading, error, data } = useQuery(GET_PAGED_ATHLETES.query, { variables: { id: gameId.toString() } });
    if (loading) return <SkeletonListLoader loading={true}/>;
    if (error) return <Text>Error loading Athletes: {error.message}</Text>;
    const athletePage = loading || error ? { edges: [], totalCount: 0 } : data[GET_PAGED_ATHLETES.queryNode];
    const athletes = athletePage.edges.map((item) => ({ ...item.node }));
    return (
      <FlatList
        data={sortDesc(athletes, 'globalScore')}
        keyExtractor={(item) => item.athleteId.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <AthleteCard
            item={item}
            onPress={() => {
              navigation.navigate('AthleteDetail', { item });
            }}
          />
        )}
      />
    );
  };
  export default GameAthletes;
  
import React from 'react';
import { useQuery } from '@apollo/client';
import { View, Text, ScrollView } from 'react-native';
import { GET_GAMES } from '../models/graphql.queries';
import GameAthletes from '../components/GameAthletes';

const AthleteList = ({ navigation }) => {
  React.useEffect(() => {
    navigation.setParams({ title: 'Olimpic Athletes'  });
  }, [navigation]);

  const { loading, error, data } = useQuery(GET_GAMES.query);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  
  return (
    <ScrollView>
       {data[GET_GAMES.queryNode].map((item) => (
        <View key={item.gameId}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 8 }}>{`${item.city} ${item.year}`}</Text>
          <GameAthletes gameId={item.gameId} navigation={navigation} />
        </View>
      ))}
    </ScrollView>
  );
};

export default AthleteList;
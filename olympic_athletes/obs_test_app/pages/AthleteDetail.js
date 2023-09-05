import React from 'react';
import { useQuery } from '@apollo/client';
import { SafeAreaView, ScrollView, View, Text, Image, Button } from 'react-native';
import { GET_ATHLETE_BY_ID } from '../models/graphql.queries';
import SkeletonLoader from '../components/skeletons/SkeletonLoader';
import Markdown from 'react-native-markdown-text'

const AthleteDetail = ({ route, navigation }) => {
  const { item } = route.params;
  React.useEffect(() => {
    navigation.setParams({ title: `${item.fullName} Detail` });
  }, [item, navigation]);

  const { loading, error, data } = useQuery(GET_ATHLETE_BY_ID.query, { variables: { id: item.athleteId.toString() } });
  const athlete = loading ? {} : data[GET_ATHLETE_BY_ID.queryNode];
  
  if (loading) return <SkeletonLoader loading={true}/>;
  if (error) return <Text>Error loading athlete: {error.message}</Text>;
  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <Image
          source={`data:${athlete.photo.mimeType};base64,${athlete.photo.photo}`} 
          style={{ width: 150, height: 150, marginRight: 16 }}
        />
        <View>
          <Text><b>Name:</b> {item.fullName}</Text>
          <Text><b>DOB:</b> {athlete.dateOfBirth}</Text>
          <Text><b>Weight:</b> {athlete.weight}kg</Text>
          <Text><b>Height:</b> {athlete.height}cm</Text>
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Medals</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {athlete.athleteResults.map((result) => (
          <View  key={result.game.city}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: "4px 8px",
              width: "100%"
            }}>
            <Text style={{ fontSize: 16, fontSize: "bold"}}>{result.game.city}</Text>
            <View style={{ flexDirection: 'row' }}>
              {result.gold > 0 &&(
                <>
                <Text style={{ fontSize: "bold"}}>{result.gold}</Text>
                <Image source={require('../assets/medal_gold.png')} style={{ width: 16, height: 16, marginLeft: 4 }} />
                </>
              )}
              {result.silver > 0 &&(
                <>
                <Text style={{ fontSize: "bold"}}>{result.silver}</Text>
                <Image source={require('../assets/medal_silver.png')} style={{ width: 16, height: 16, marginLeft: 4 }} />
                </>
              )}
              {result.bronze > 0 &&(
                <>
                <Text style={{ fontSize: "bold"}}>{result.bronze}</Text>
                <Image source={require('../assets/medal_bronze.png')} style={{ width: 16, height: 16, marginLeft: 4 }} />
                </>
              )}
            </View>
        </View>
        ))}
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Bio</Text>
        <Markdown>
        {athlete.bio}
        </Markdown>
        </View>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
     </ScrollView>
  );
};

export default AthleteDetail;
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AthleteList from './pages/AthleteList';
import AthleteDetail from './pages/AthleteDetail';
import CustomHeader from './components/CustomHeader'; 
import GameAthletes from './components/GameAthletes'; 

const Stack = createStackNavigator();
const apolloClient = new ApolloClient({
  uri: 'https://localhost:7198/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AthleteList"
      screenOptions={{
        header: ({ navigation, route }) => (
          <CustomHeader navigation={navigation} route={route} />
        ),
      }}>
        <Stack.Screen
          name="AthleteList"
          component={AthleteList}
          options={({ route }) => ({ title:'Olimpic Athletes'  })}
        />
        <Stack.Screen
          name="AthleteDetail"
          component={AthleteDetail}
          options={{ title: 'Athlete Detail' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  );
}

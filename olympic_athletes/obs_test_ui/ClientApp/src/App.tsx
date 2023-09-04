import React from 'react';
import './assets/scss/main.scss';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import NavigationScroll from './layout/NavigationScroll';
import theme from './themes';
import { RootState } from './store';
import ThemeRoutes from 'routes';

function App() {
  const customization = useSelector((x: RootState) => x.nav);
  const apolloClient = new ApolloClient({
    uri: process.env.REACT_APP_API_CONFIG_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(customization)}>
        <CssBaseline />
        <ApolloProvider client={apolloClient}>
          <NavigationScroll>
            <ThemeRoutes />
          </NavigationScroll>
        </ApolloProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

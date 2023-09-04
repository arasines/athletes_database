import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';
import MainStyled from './MainLayoutStyled';

const MainLayout = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" color="inherit" elevation={0}>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Header />
          </Toolbar>
        </Container>
      </AppBar>
      <MainStyled theme={theme} open={false}>
        <Outlet />
      </MainStyled>
    </Box>
  );
};
export default MainLayout;

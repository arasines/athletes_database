import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, CssBaseline, Paper, Toolbar, useMediaQuery } from '@mui/material';
import Header from './Header';
import config from 'config';

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="static" color="inherit" elevation={0}>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Header />
          </Toolbar>
        </Container>
      </AppBar>
      <Paper
        component="div"
        id="main"
        // sx={{
        //   ...theme.typography.mainContent,
        //   [theme.breakpoints.up('md')]: {
        //     marginLeft: -(config.drawerWidth - 20),
        //     width: `calc(100% - ${config.drawerWidth}px)`,
        //   },
        //   [theme.breakpoints.down('md')]: {
        //     marginLeft: '20px',
        //     padding: '16px',
        //   },
        //   [theme.breakpoints.down('sm')]: {
        //     marginLeft: '10px',
        //     width: `calc(100% - ${config.drawerWidth}px)`,
        //     padding: '16px',
        //     marginRight: '10px',
        //   },
        // }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
};
export default MainLayout;

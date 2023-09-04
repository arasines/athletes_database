import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import LogoSection from './LogoSection';
import strings from 'res/string';
import { useLocation } from 'react-router-dom';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

const Header = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { title } = useSelector((state: RootState) => state.nav);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', sm: 'block', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
      </Box>
      <Typography
        variant="h2"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: 'flex',
          flexGrow: 1,
          fontWeight: 700,
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {pathname == '/' ? strings.main.project.name : title}
      </Typography>
    </>
  );
};
export default Header;

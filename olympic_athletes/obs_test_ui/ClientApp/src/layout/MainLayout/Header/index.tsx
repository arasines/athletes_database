import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import LogoSection from './LogoSection';
import strings from 'res/string';

const Header = () => {
  const theme = useTheme();
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
        {strings.main.project.name}
      </Typography>
    </>
  );
};
export default Header;

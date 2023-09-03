import React from 'react';
import logo_white from '../assets/images/logoLupa.png';
import { Box, Container, Typography, Link } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        {strings.main.project.name}
      </Link>{' '}
      {new Date().getFullYear()}
      {'. '}
      <i>{strings.main.footer.slogan}</i>
    </Typography>
  );
}

export const MasterFooter = (): React.ReactElement => {
  return (
    <Box component="footer" sx={{ py: 2, mt: 'auto', position: 'sticky', bottom: 0 }}>
      <Container sx={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo_white} alt={strings.main.project.name} style={{ height: 30, filter: 'sepia(100%)' }} />
        <Copyright />
      </Container>
    </Box>
  );
};

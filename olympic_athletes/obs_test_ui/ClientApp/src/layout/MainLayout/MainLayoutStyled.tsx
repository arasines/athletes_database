import { Interpolation, Theme, styled } from '@mui/material/styles';
import config from 'config';

type InterpolationWithTheme<Props extends {}> = Interpolation<Props & { theme: Theme }>;
const MainStyles: InterpolationWithTheme<{ open: boolean }> = ({ theme, open }) => ({
  ...theme.typography.mainContent,
  ...(!open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: '20px',
      width: `calc(100% - ${config.drawerWidth}px)`,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      width: `calc(100% - ${config.drawerWidth}px)`,
      padding: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      width: `calc(100% - ${config.drawerWidth}px)`,
      padding: '16px',
      marginRight: '10px',
    },
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    width: `calc(100% - ${config.drawerWidth}px)`,
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
    },
  }),
});
const MainStyled = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open: boolean }>(MainStyles);
export default MainStyled;

import { createTheme } from '@mui/material/styles';
import colors from 'assets/scss/themes-vars.module.scss';
import themeTypography from './typography';
import themePalette from './palettes';
import componentStyleOverrides from './compStyleOverride';
export const theme = (customization: any) => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    customization,
  };

  const themes = createTheme({
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(themeOption),
  });
  themes.components = componentStyleOverrides(themeOption);
  return themes;
};
export default theme;

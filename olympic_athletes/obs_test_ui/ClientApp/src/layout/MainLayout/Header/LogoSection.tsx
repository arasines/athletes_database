import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ButtonBase } from '@mui/material';
import config from 'config';
import { navActions } from 'store';
import logo from 'assets/images/obs_logo.png';
import strings from 'res/string';

const LogoSection = () => {
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple component={Link} to={config.defaultPath} onClick={() => dispatch(navActions.activeItem({ openItem: [config.defaultId] }))}>
      <img src={logo} alt={strings.main.project.name} style={{ height: 50 }} />
    </ButtonBase>
  );
};

export default LogoSection;

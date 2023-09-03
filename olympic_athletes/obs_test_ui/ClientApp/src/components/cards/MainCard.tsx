import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, SxProps, Theme, Typography } from '@mui/material';

const headerSX = {
  paddingTop: 2,
  paddingBottom: 2,
  px: 3,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
};

interface Props {
  border?: boolean;
  boxShadow?: boolean;
  contentSX?: any;
  darkTitle?: boolean;
  divider?: boolean;
  elevation?: number;
  secondary?: React.ReactElement;
  shadow?: string;
  title?: string | JSX.Element | JSX.Element[];
  avatar?: JSX.Element | JSX.Element[];
  subtitle?: string;
  subheader?: JSX.Element | JSX.Element[];
  codeHighlight?: boolean;
  content?: boolean;
  sx?: SxProps<Theme>;
  children?: JSX.Element | JSX.Element[];
  onClick?: () => void;
}
const MainCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      border = true,
      boxShadow,
      subheader,
      children,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      avatar,
      subtitle,
      onClick,
      ...others
    }: Props,
    ref,
  ) => {
    const theme = useTheme();
    boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

    return (
      <Card
        elevation={elevation || 0}
        onClick={() => {
          if (onClick) onClick();
        }}
        ref={ref}
        {...others}
        sx={{
          ...sx,
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.secondary.light,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0px 1px 4px rgba(52, 58, 63, 0.05), 0px 4px 12px rgba(52, 58, 63, 0.12)' : 'inherit',
          },
        }}
      >
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            avatar={avatar}
            title={
              <>
                {typeof title === 'string' ? <Typography variant="h3">{title}</Typography> : title}
                {subtitle && <Typography variant="body1" component={'div'} dangerouslySetInnerHTML={{ __html: subtitle }} />}
                {subheader}
              </>
            }
            action={secondary}
          />
        )}
        {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}
        {title && divider && <Divider />}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}
      </Card>
    );
  },
);
export default MainCard;

import { Card, CardActionArea, CardContent, CardMedia, Typography, useMediaQuery, useTheme } from '@mui/material';
import { IAthlete } from 'models';
import { useDispatch } from 'react-redux';
import { navActions } from 'store';

interface Props {
  data: IAthlete;
  onClick: (id: string) => void;
}
export function ThumbnailCard({ data, onClick }: Props): React.ReactElement {
  const dispatch = useDispatch();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const sizeCard = smallScreen ? 126 : 136;
  const handleClick = () => {
    dispatch(navActions.changeTitle(`${data.fullName} Details`));
    onClick(data.athleteId);
  };
  return (
    <Card sx={{ width: sizeCard, height: 'auto', paddingX: 1, cursor: 'pointer' }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          sx={smallScreen ? { height: 100, width: 100 } : { height: 120, width: 120 }}
          image={`data:${data.photo.mimeType};base64,${data.photo.thumbnail}`}
          title={data.fullName}
        />
        <CardContent sx={{ paddingX: 0, paddingY: 1, paddingBottom: '0!important', textAlign: 'center' }}>
          <Typography gutterBottom variant="body1" component="div">
            {data.fullName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

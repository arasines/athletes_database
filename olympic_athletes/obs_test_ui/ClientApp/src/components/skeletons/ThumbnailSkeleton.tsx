import { Box, Card, CardHeader, useMediaQuery, useTheme } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';

function ThumbnailSkeleton(): React.ReactElement {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const size = smallScreen ? 100 : 120;
  const sizeCard = smallScreen ? 130 : 150;
  return (
    <Box sx={{ display: 'flex' }}>
      <Card sx={{ width: sizeCard }}>
        <CardHeader avatar={<Skeleton variant="rectangular" height={size} width={size} />} />
      </Card>
      <Card sx={{ width: sizeCard }}>
        <CardHeader avatar={<Skeleton variant="rectangular" height={size} width={size} />} />
      </Card>
      <Card sx={{ width: sizeCard }}>
        <CardHeader avatar={<Skeleton variant="rectangular" height={size} width={size} />} />
      </Card>
    </Box>
  );
}
export default ThumbnailSkeleton;

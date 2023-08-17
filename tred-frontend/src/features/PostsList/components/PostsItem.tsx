import React from 'react';
import { Card, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { apiUrl } from '../../../constants';


interface Props {
  author: string;
  message: string;
  datetime: string;
  image: string | null;
}

const PostItem: React.FC<Props> = ({author, message, image, datetime}) => {
  const cardImage = apiUrl + '/' + image;
  const atDate = dayjs(datetime).format('DD-MM-YYYY {HH:mm}');
  return (
    <Card sx={{display: 'flex', margin: 5}}>
      {image ? <CardMedia
          component="img"
          alt={author}
          sx={{width: 151, maxHeight: 120}}
          image={cardImage}
        /> :
        null
      }
      <Grid sx={{textAlign: 'center', p: 2}}>
        <CardHeader title={message}/>
        <Typography>{atDate}</Typography>
      </Grid>
    </Card>
  );
};
export default PostItem;


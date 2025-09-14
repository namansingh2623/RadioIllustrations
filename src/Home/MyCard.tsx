import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';


interface MyCardProps {
    id: number;
    name: string;
    description: string;
    url: string; // <- string, not any,
    path: string;
}

export default function MyCard(props: MyCardProps) {
    const navigate = useNavigate();
    const { name, description, url, path } = props;
    return (
        <Card sx={{ maxWidth: 300, margin: 2 }}>
            <CardMedia
                component="img"
                alt={name}
                height="300"
                image={url}
            />
            <CardContent  sx={{justifyContent: 'center'}}>
                <Typography justifyContent={"center"} gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', justifyContent: 'center' }}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'center'}}>
                    <Button color="inherit" size="small" onClick={() => navigate(path)}>
                        Share
                    </Button>
            </CardActions>
        </Card>
    );
}
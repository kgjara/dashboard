import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import sunrise from '../assets/newSunrise.jpg'
import sunset from '../assets/newSunset.jpg';
import night from '../assets/newNight.jpg';

export default function Summary() {

    const [currentTime, setCurrentTime] = useState(new Date());
    const [image, setImage] = useState(sunrise);

    useEffect(() => {
        // Update the time every second
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const hours = currentTime.getHours();
        if (hours >= 6 && hours < 18) {
            setImage(sunrise);
        } else if (hours >= 18 && hours < 20) {
            setImage(sunset);
        } else {
            setImage(night);
        }
    }, [currentTime]);

    const formatTime = date => {
        return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const formatDate = date => {
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    return (
        <Card sx={{ width: '100%' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="Tiempo del día"
                />
                <CardContent>
                    <Typography gutterBottom component="h2" variant="h6" color="primary">
                        {currentTime.getHours() >= 6 && currentTime.getHours() < 18 ? 'Amanecer' : currentTime.getHours() >= 18 && currentTime.getHours() < 20 ? 'Atardecer' : 'Noche'}
                    </Typography>
                    <Typography component="p" variant="h4">
                        {formatTime(currentTime)}
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        {formatDate(currentTime)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
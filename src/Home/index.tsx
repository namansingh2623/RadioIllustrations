import React from 'react';
import {Grid, Paper, Stack} from '@mui/material';
import MyImageList from '../Components/MyImageList';
import publications from '../assets/publications.webp';
import radioillustrations from '../assets/radioIllustrations.webp';
import shortVideo from '../assets/shortvideo.webp';
import infoGraphics from '../assets/infographics.webp';
import HomeBg from '../assets/HomeBg.webp';
import MyCard from './MyCard';
import {Box} from "@mui/system";
import Profile from '../assets/profile.jpg'
import img1 from '../assets/1.jpeg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpeg';
import img4 from '../assets/4.jpeg';
import img5 from '../assets/5.jpeg';
import img6 from '../assets/6.jpeg';
import Typography from "@mui/material/Typography";


const imageList = [
    {id: 1, img: img1},
    {id: 2, img: img2},
    {id: 3, img: img3},
    {id: 4, img: img4},
    {id: 5, img: img5},
    {id: 6, img: img6},
]
const Home = () => {
    const itemData = [
        { id: 1, img: publications,       title: 'Publications' , description: 'A set of clean, monochrome infographics.' , path: '/publications'},
        { id: 2, img: radioillustrations, title: 'Radio Illustrations', description: 'A set of clean, monochrome infographics.', path: '/radioillustrations' },
        { id: 3, img: shortVideo,         title: 'Short Videos', description: 'A set of clean, monochrome infographics.' , path: '/shortvideo'},
        { id: 4, img: infoGraphics,       title: 'InfoGraphics', description: 'A set of clean, monochrome infographics.', path: '/infographics'}
    ];

    return (
        <Grid container spacing={8} >
            <Grid size={{lg: 12, md: 8, sm: 12}}>
                <img src={HomeBg} alt="Home background" style={{ width: '100%', height: 400, objectFit: 'cover', display: 'block' }} />
            </Grid>

            <Grid size={{lg: 12, md: 8, sm: 12}}>
                <Stack spacing={2} direction="row" justifyContent="space-around">
                    {itemData.map((item) => (
                        <MyCard id={item.id} name={item.title} description={item.description} url={item.img} path={item.path}/>
                    ))}
                </Stack>

            </Grid>
            <Grid size={{lg: 12, md: 8, sm: 12}}>
                <Paper elevation={3}>


                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex:"center"
                    }}
                >
                    <Box  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={Profile} height={500} alt="Profile" width={500}/>
                    </Box>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 , textAlign: 'center'}}>
                        Welcome to my radiology corner — a space where complex concepts meet clarity through illustrations, infographics, short videos, and blogs. Whether you’re a student or a professional, you’ll find visual learning tools designed to make radiology easier and more engaging.
                    </Typography>

                </Stack>
                </Paper>

            </Grid>
            <Grid size={{lg: 12, md: 8, sm: 12}}>
                <MyImageList itemData={imageList} />
            </Grid>

        </Grid>
    );
};

export default Home;
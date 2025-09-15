import React from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import profile from "../../assets/profile.jpg";

const About = () => {
    return (
        <div>
            <Grid container spacing={2}       justifyContent="center"
                  alignItems="center"
                  sx={{ minHeight: '100vh', textAlign: 'center', px: 4 }} >
                <Grid size={12}>
                    <Typography variant="h1" gutterBottom sx={{ display: 'block' }}>Dr. Shubham Arora</Typography>
                </Grid>
                <Grid size={{lg:6, md:6, sm:12}}>
                    <img src={profile} alt="Shubham Arora" style={{ width: '100%', height: 600, objectFit: 'cover', display: 'block' }} />
                </Grid>
                <Grid size={{lg:6, md:6, sm:12}}>
                    <Typography variant="body1" justifyContent={"center"} textAlign={"center"}>
                        I am Dr. Shubham Arora, a postgraduate resident in Radiology with an avid passion for academics and medical illustration. Over the past eight years, I have been dedicated to creating high-impact visual content that simplifies the complex worlds of radiology and anatomy. My illustrations aim to bridge the gap between intricate medical concepts and intuitive understanding, making learning more accessible and enjoyable for students, educators, and healthcare professionals alike. This website is a reflection of my mission—to transform the way radiology and anatomy are learned and taught. Through meticulously crafted illustrations, I hope to provide a visual learning platform that supports academic growth, aids in clinical practice, and inspires a deeper appreciation of medical imaging. Whether you’re a student revising core concepts or a clinician seeking visual aids for teaching, you’ll find resources here designed to clarify, educate, and engage
                    </Typography>
            </Grid>
            </Grid>


        </div>
    );
};

export default About;
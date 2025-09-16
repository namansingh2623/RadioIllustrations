import * as React from 'react';
import {useEffect, useState} from "react";
import {InfoGraphicsResponse} from "../../Services/types";
import {getInfoGraphics} from "../../Services/ApiCalls";
import {Box, Button, Card, CardContent, CardMedia, Grid, TablePagination, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router";


const InfoGraphics = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [data, setData] = useState<InfoGraphicsResponse | null>(null);
    const [loading, setLoading] = useState(true);


    const getPageData= ()=>{
        getInfoGraphics(currentPage,pageSize).then(
            (response)=>{
                console.log(response);
                setLoading(false);
                setData(response);
            }).catch((err)=>{
                console.log(err);
                setLoading(false);
            }
        )
    }

    const renderNumberOfAlbumsCreatedToday = (data: InfoGraphicsResponse | null)=>{
        console.log(data?.albums);
        const idAndCreatedArray = data?.albums.map(album => ({
            id: album.id,
            createdAt: new Date(album.createdAt),
        })) ?? [];
        let currentDate = new Date();
        console.log(currentDate);
        for(let i= 0 ; i< idAndCreatedArray?.length; i++){
            if (idAndCreatedArray[i].createdAt < currentDate){
                console.log(data?.albums[i].id);
            }
        }
    }
    useEffect(() => {
       getPageData();
    },[]);


    return (
        <div>
            {loading?<Typography>Loading...</Typography> : null}

            <Grid container spacing={2}  >
            { data?.albums.map((album, index)=>{
                return(
                    <Grid size={{lg:4,xs:12, md:4}} key={album.id} display="flex">
                        <Card sx={{ borderRadius: 3, width: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                image={album.coverImage}
                                alt={album.title}
                                sx={{ height: 300, objectFit: 'cover' }}
                                loading="lazy"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {album.title}
                                </Typography>
                                {album.description && (
                                    <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.8 }}>
                                        {album.description}
                                    </Typography>
                                )}
                            </CardContent>
                            <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'center' }}>
                                <Button variant="outlined" component={RouterLink} to={`/Album/${album.id}`}>
                                    More images
                                </Button>
                            </Box>
                        </Card>

                    </Grid>
                )
            })}
            </Grid>

            <TablePagination
                component="div"
                count={100}
                page={currentPage}
                onPageChange={()=>getPageData()}
                rowsPerPage={2}
                onRowsPerPageChange={()=>{}}
            />
            <Button
                color={"primary"}
                sx={{
                    color: 'primary.contrastText',
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.light' },
                }}
                onClick={()=>renderNumberOfAlbumsCreatedToday(data)}
            >
                Click Me
            </Button>
        </div>
    );
};

export default InfoGraphics;
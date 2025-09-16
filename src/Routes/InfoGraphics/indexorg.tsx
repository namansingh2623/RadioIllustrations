// src/Routes/InfoGraphics/index.tsx
import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import {
    Container, Grid, Card, CardMedia, CardContent, Typography, Box, Button, Pagination
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type Album = {
    id: number;
    title: string;
    coverImage: string;
    category: string;
    description?: string;
};

const BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:3307';

export default function InfoGraphics() {
    // ✅ hooks are now INSIDE the component
    const [page, setPage] = useState(1);
    const pageSize = 8;

    const [data, setData] = useState<{ totalItems: number; albums: Album[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${BASE_URL}/albums/all/?page=${page}&pageSize=${pageSize}`);
                if (!res.ok) throw new Error(`Failed: ${res.status}`);
                const json = await res.json();
                if (!cancelled) setData(json);
            } catch (e: any) {
                if (!cancelled) setError(e?.message || 'Failed to load');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [page]);

    const radioInfo = useMemo(() => {
        return (data?.albums ?? []).filter(a => a.category === 'RadioInfo');
    }, [data]);

    const totalPages = Math.max(1, Math.ceil((data?.totalItems ?? 0) / pageSize));

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
            <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 700, color: '#03999a' }}>
                Radiology Info-Graphics
            </Typography>

            {loading && <Typography align="center">Loading…</Typography>}
            {error && <Typography color="error" align="center">{error}</Typography>}

            {!loading && !error && (
                <>
                    <Grid container spacing={4} justifyContent="center">
                        {radioInfo.length === 0 ? (
                            <Grid  size={12}>
                                <Typography align="center" sx={{ opacity: 0.8 }}>
                                    No albums found in “RadioInfo”.
                                </Typography>
                            </Grid>
                        ) : (
                            radioInfo.map(album => (
                                <Grid size={{xs:12, md:4}} key={album.id} display="flex">
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
                            ))
                        )}
                    </Grid>

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Pagination count={totalPages} page={page} onChange={(_, p) => setPage(p)} shape="rounded" />
                    </Box>
                </>
            )}
        </Container>
    );
}
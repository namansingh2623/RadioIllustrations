// src/pages/RadiologyInfoGraphics.tsx
import * as React from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Pagination,
    Skeleton,
    Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type Album = {
    id: number;
    title: string;
    coverImage: string;
    category: string;
    description?: string;
};

interface Props {
    requestUrl: string;      // e.g. 'https://api.example.com'
    token?: string;          // optional auth token for Authorization header
    pageSize?: number;       // default 8
}

export default function RadiologyInfoGraphics({
                                                  requestUrl,
                                                  token,
                                                  pageSize = 8,
                                              }: Props) {
    const [page, setPage] = React.useState(1);
    const [totalItems, setTotalItems] = React.useState(0);
    const [albums, setAlbums] = React.useState<Album[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    React.useEffect(() => {
        let cancelled = false;
        const fetchAlbums = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(
                    `${requestUrl}/albums/all/?page=${page}&pageSize=${pageSize}`,
                    token ? { headers: { Authorization: token } } : undefined
                );
                if (cancelled) return;
                setTotalItems(res.data?.totalItems ?? 0);
                setAlbums(res.data?.albums ?? []);
            } catch (e: any) {
                if (!cancelled) setError(e?.message || 'Failed to load albums');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchAlbums();
        return () => {
            cancelled = true;
        };
    }, [requestUrl, token, page, pageSize]);

    const filteredAlb = React.useMemo(
        () => albums.filter(a => a.category === 'RadioInfo'),
        [albums]
    );

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
            {/* Responsive heading (xl→h1 … xs→h5) */}
            <Typography
                component="h1"
                sx={{
                    fontWeight: 800,
                    color: '#03999a',
                    textAlign: 'center',
                    mb: { xs: 2, md: 4 },
                    fontSize: {
                        xs: '1.25rem',   // ~h5
                        sm: '1.5rem',    // ~h4
                        md: '1.75rem',   // ~h3
                        lg: '2.125rem',  // ~h2
                        xl: '3rem',      // ~h1
                    },
                }}
            >
                Radiology Info-Graphics
            </Typography>

            {/* Grid of albums */}
            <Grid container spacing={4} justifyContent="center">
                {loading &&
                    Array.from({ length: pageSize }).map((_, i) => (
                        <Grid size={{xs:12, sm:12, md:4, lg:4}} key={`sk-${i}`}>
                            <Card sx={{ borderRadius: 3 }}>
                                <Skeleton variant="rectangular" height={300} />
                                <Box sx={{ p: 2 }}>
                                    <Skeleton width="60%" />
                                    <Skeleton width="40%" />
                                </Box>
                            </Card>
                        </Grid>
                    ))}

                {!loading && error && (
                    <Grid size={12}>
                        <Typography color="error" align="center">
                            {error}
                        </Typography>
                    </Grid>
                )}

                {!loading && !error && filteredAlb.length === 0 && (
                    <Grid size={12}>
                        <Typography align="center" sx={{ opacity: 0.8 }}>
                            No albums found in “RadioInfo”.
                        </Typography>
                    </Grid>
                )}

                {!loading &&
                    !error &&
                    filteredAlb.map(album => (
                        <Grid size={{xs:12, sm:12, md:4, lg:4}}  key={album.id} display="flex">
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                                elevation={1}
                            >
                                <CardActionArea component={RouterLink} to={`/Album/${album.id}`}>
                                    <CardMedia
                                        component="img"
                                        image={album.coverImage}
                                        alt={album.title}
                                        sx={{ height: 300, objectFit: 'cover' }}
                                        loading="lazy"
                                    />
                                </CardActionArea>
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
                                    <Button
                                        variant="outlined"
                                        component={RouterLink}
                                        to={`/Album/${album.id}`}
                                    >
                                        More images
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

            {/* Pagination */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, p) => setPage(p)}
                    color="primary"
                    shape="rounded"
                />
            </Box>
        </Container>
    );
}
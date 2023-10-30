import { useAppDispatch } from '../utils/dispatch.ts';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import { useEffect, useState } from 'react';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { getPosts } from '../../domain/posts/use-cases/post.actions.ts';
import { PostGatewayInterface } from '../../domain/posts/port/post-gateway-interface.ts';
import { Alert, AlertTitle, Box, Button, CircularProgress, Container, Grid, Stack } from '@mui/material';
import PostCard from '../components/PostCard.tsx';
import { Post } from '../../domain/posts/models/post.model.ts';
import CardWrapper from '../components/CardWrapper.tsx';
import { resetError } from '../../domain/posts/use-cases/post.slice.ts';

function Feed() {
    const length = 2;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const posts = useSelector((state: RootState) => state.postReducer.data);
    const error = useSelector((state: RootState) => state.postReducer.error);
    const loading = useSelector((state: RootState) => state.postReducer.loading);

    const [start, setStart] = useState<number>(0);
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    useEffect(() => {
        dispatch(
            getPosts({
                params: {
                    gatewayInterface: dependencyContainer.get<PostGatewayInterface>('PostGateway'),
                    navigate: navigate,
                },
                start,
                length,
            }),
        );
        return () => {
            dispatch(resetError());
        };
    }, [dispatch, start, length, navigate]);

    useEffect(() => {
        window.scrollTo(0, scrollPosition);
    }, [posts, scrollPosition]);

    let content;

    if (posts.length > 0) {
        content = (
            <Stack spacing={2}>
                {posts.map((onePost: Post) => (
                    <CardWrapper key={onePost.id}>
                        <PostCard onePost={onePost} />
                    </CardWrapper>
                ))}
            </Stack>
        );
    } else if (error) {
        content = (
            <Alert severity="error">
                <AlertTitle>Erreur !</AlertTitle>
                Erreur inattendue — <strong>Réessayez ultérieurement !</strong>
            </Alert>
        );
    } else {
        content = <Alert severity="info">Le flux est vide !</Alert>;
    }

    return (
        <Container maxWidth="md">
            <Grid container direction="column">
                <Box flex="1" display="flex" flexDirection="column">
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        content
                    )}
                </Box>

                <Box display="flex" justifyContent="center" mt={4} mb={4}>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: 'primary.main' }}
                        onClick={() => {
                            setScrollPosition(window.scrollY);
                            setStart(start + length);
                        }}
                    >
                        Voir plus
                    </Button>
                </Box>
            </Grid>
        </Container>
    );
}

export default Feed;
import { useAppDispatch } from '../utils/dispatch.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import { useEffect } from 'react';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { getPost } from '../../domain/posts/use-cases/post.actions.ts';
import { PostGatewayInterface } from '../../domain/posts/port/post-gateway-interface.ts';
import { Alert, AlertTitle, Box, CircularProgress, Container, Grid, IconButton, Stack } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import CardWrapper from '../components/CardWrapper.tsx';
import { resetError } from '../../domain/posts/use-cases/post.slice.ts';
import PostCardDetails from '../components/PostCardDetails.tsx';

function PostDetails() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const post = useSelector((state: RootState) => state.postsReducer.postDetails);
    const error = useSelector((state: RootState) => state.postsReducer.error);
    const loading = useSelector((state: RootState) => state.postsReducer.loading);
    const { id } = useParams();
    const postId = id ? parseInt(id.split('-')[0] || '') : null;

    useEffect(() => {
        if (!postId) return;
        dispatch(
            getPost({
                params: {
                    gatewayInterface: dependencyContainer.get<PostGatewayInterface>('PostGateway'),
                    navigate: navigate,
                },
                postId,
            }),
        );
        return () => {
            dispatch(resetError());
        };
    }, [dispatch, postId, navigate]);

    let content;

    if (post) {
        content = (
            <Stack spacing={2} sx={{ flexDirection: 'row' }}>
                <Box style={{ marginRight: '25px' }}>
                    <IconButton
                        aria-label="share"
                        onClick={() => {
                            return navigate('/flux/');
                        }}
                    >
                        <ArrowBackRoundedIcon sx={{ scale: '1.8' }} />
                    </IconButton>
                </Box>

                <CardWrapper>
                    <PostCardDetails post={post} />
                </CardWrapper>
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
            </Grid>
        </Container>
    );
}

export default PostDetails;

import { useAppDispatch } from '../utils/dispatch.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import { useEffect } from 'react';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { getPost } from '../../domain/posts/use-cases/post.actions.ts';
import { PostGatewayInterface } from '../../domain/posts/port/post-gateway-interface.ts';
import { Alert, AlertTitle, Box, CircularProgress, Container, Grid, Stack } from '@mui/material';
import CardWrapper from '../components/CardWrapper.tsx';
import { resetError } from '../../domain/posts/use-cases/post.slice.ts';
import PostCardDetails from '../components/PostCardDetails.tsx';

function PostDetails() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const post = useSelector((state: RootState) => state.postReducer.data);
    const error = useSelector((state: RootState) => state.postReducer.error);
    const loading = useSelector((state: RootState) => state.postReducer.loading);
    const { id } = useParams();
    const postId = parseInt(id!);

    useEffect(() => {
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

    if (post[0]) {
        content = (
            <Stack spacing={2}>
                <CardWrapper>
                    <PostCardDetails onePost={post[0]} />
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

import { useAppDispatch } from '../utils/dispatch.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import { useEffect } from 'react';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { getPost } from '../../domain/posts/use-cases/post.actions.ts';
import { PostGatewayInterface } from '../../domain/posts/port/post-gateway-interface.ts';
import { Alert, AlertTitle, Box, CircularProgress, Container } from '@mui/material';
import { resetError } from '../../domain/posts/use-cases/post.slice.ts';
import PostDetailsContent from '../modules/PostDetailsContent.tsx';
import CopyToClipboardWrapper from '../modules/CopyToClipboardWrapper.tsx';

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
            <CopyToClipboardWrapper>
                <PostDetailsContent post={post} />
            </CopyToClipboardWrapper>
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
        <Container maxWidth="xl">
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                content
            )}
        </Container>
    );
}

export default PostDetails;

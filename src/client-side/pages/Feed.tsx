import { useAppDispatch } from '../utils/dispatch.ts';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import { useEffect, useState } from 'react';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { getMorePosts, getPosts } from '../../domain/posts/use-cases/post.actions.ts';
import { PostGatewayInterface } from '../../domain/posts/port/post-gateway-interface.ts';
import {Alert, AlertTitle, Box, Button, CircularProgress, Container, Stack, useTheme} from '@mui/material';
import PostCard from '../modules/PostCard.tsx';
import { Post } from '../../domain/posts/models/post.model.ts';
import CopyToClipboardWrapper from '../modules/CopyToClipboardWrapper.tsx';
import { resetError } from '../../domain/posts/use-cases/post.slice.ts';
import {buttonStyle} from "../style/buttonStyle.ts";

function Feed() {
    const length = 10;
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const posts = useSelector((state: RootState) => state.postsReducer.data);
    const error = useSelector((state: RootState) => state.postsReducer.error);
    const loading = useSelector((state: RootState) => state.postsReducer.loading);

    const [start, setStart] = useState<number>(0);
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    const handleGetMorePosts = () => {
        const newStart = start + length;
        setScrollPosition(window.scrollY);
        setStart(newStart);
        dispatch(
            getMorePosts({
                params: {
                    gatewayInterface: dependencyContainer.get<PostGatewayInterface>('PostGateway'),
                    navigate: navigate,
                },
                start: newStart,
                length,
            }),
        );
    };

    useEffect(() => {
        dispatch(
            getPosts({
                params: {
                    gatewayInterface: dependencyContainer.get<PostGatewayInterface>('PostGateway'),
                    navigate: navigate,
                },
                length,
            }),
        );
        return () => {
            dispatch(resetError());
        };
    }, [dispatch, length, navigate]);

    useEffect(() => {
        window.scrollTo(0, scrollPosition);
    }, [posts, scrollPosition]);

    let content;

    if (posts.length > 0) {
        content = (
            <Stack spacing={5}>
                {posts.map((onePost: Post) => (
                    <CopyToClipboardWrapper key={onePost.id}>
                        <PostCard post={onePost}/>
                    </CopyToClipboardWrapper>
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
                        sx={buttonStyle(theme)}
                        onClick={() => {
                            handleGetMorePosts();
                        }}
                    >
                        See more
                    </Button>
                </Box>
        </Container>
    );
}

export default Feed;

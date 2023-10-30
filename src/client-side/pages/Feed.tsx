import {useAppDispatch} from "../utils/dispatch.ts";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../domain/store.ts";
import {useEffect, useState} from "react";
import dependencyContainer from "../../_dependencyContainer/dependencyContainer.ts";
import {getPosts} from "../../domain/posts/use-cases/post.actions.ts";
import {PostGatewayInterface} from "../../domain/posts/port/post-gateway-interface.ts";
import {resetError} from "../../domain/tips/use-cases/tips.slice.ts";
import {Alert, AlertTitle, Box, Button, CircularProgress, Container, Grid, Stack} from "@mui/material";
import PostCard from "../components/PostCard.tsx";
import {Post} from "../../domain/posts/models/post.model.ts";
import CardWrapper from "../components/CardWrapper.tsx";

function Feed() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const posts = useSelector((state: RootState) => state.postReducer.data);
    console.log(posts)
    const totalReceived = useSelector((state: RootState) => state.postReducer.totalReceived);
    const error = useSelector((state: RootState) => state.postReducer.error);
    const loading = useSelector((state: RootState) => state.postReducer.loading);

    const [startGetPosts, setStartGetPosts] = useState<number>(0);
    const [numberOfGetPosts, setNumberOfGetPosts] = useState<number>(2);


    useEffect(() => {
        dispatch(
            getPosts({
                params: {
                    gatewayInterface: dependencyContainer.get<PostGatewayInterface>('PostGateway'),
                    navigate: navigate,
                },
                start: startGetPosts,
                length: numberOfGetPosts,
            }),
        );
        return () => {
            dispatch(resetError());
        };
    }, [dispatch, startGetPosts, numberOfGetPosts, navigate]);

    let content;

    if (posts.length > 0) {
        console.log(posts)
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

    return <Container maxWidth="md">
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
                    sx={{ bgcolor: "primary.main" }}
                    onClick={() => {
                        setStartGetPosts(startGetPosts + numberOfGetPosts);
                    }}
                >Voir plus</Button>
            </Box>
        </Grid>

    </Container>;
}

export default Feed;
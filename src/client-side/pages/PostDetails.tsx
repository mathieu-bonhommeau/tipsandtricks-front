import { useAppDispatch } from '../utils/dispatch.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import { useEffect } from 'react';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { getPost } from '../../domain/posts/use-cases/post.actions.ts';
import { PostGatewayInterface } from '../../domain/posts/port/post-gateway-interface.ts';
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import CardWrapper from '../components/CardWrapper.tsx';
import { resetError } from '../../domain/posts/use-cases/post.slice.ts';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function PostDetails(postCardProps: PostCardProps) {
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

    // useEffect(() => post);

    let content;

    console.log(post);

    if (post[0]) {
        content = (
            <Stack spacing={2}>
                <CardWrapper key={post[0].id}>
                    <Card raised elevation={3} sx={{ maxWidth: 1000, bgcolor: 'primary.paper', p: 4, pb: 0 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography variant="h5" sx={{ px: 2 }} component="div">
                                {post[0].title}
                            </Typography>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ marginRight: 20 }}>
                                    <Chip label="tag 1" style={{ marginRight: '25px' }} />
                                    <Chip label="tag 2" style={{ marginRight: '25px' }} />
                                    <Chip label="tag 3" style={{ marginRight: '25px' }} />
                                </div>

                                <div>
                                    <IconButton aria-label="share">
                                        <AddCircleIcon sx={{ scale: '1.8' }} />
                                    </IconButton>
                                </div>
                            </div>
                        </Box>

                        <CardHeader avatar={<Avatar sx={{ width: 24, height: 24 }} />} title={post[0].username} />
                        <CardContent>
                            <p
                                style={{
                                    margin: '15px 0',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '3',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {post[0].message}
                            </p>
                            <Box sx={{ p: 2, border: '1px solid grey', bgcolor: 'primary.light' }}>
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <TextField
                                            sx={{ bgcolor: 'primary.contrastText' }}
                                            variant="outlined"
                                            fullWidth
                                            value={
                                                post[0].command.length > 37
                                                    ? `${post[0].command.substring(0, 34)}...`
                                                    : post[0].command
                                            }
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {postCardProps.textcopied ? (
                                                            <Alert variant="filled" severity="success">
                                                                Copié !
                                                            </Alert>
                                                        ) : postCardProps.failCopied ? (
                                                            <Alert severity="error">Echec de la copie !</Alert>
                                                        ) : (
                                                            <IconButton
                                                                onClick={() =>
                                                                    postCardProps.handlecopy!(post[0].command)
                                                                }
                                                            >
                                                                <ContentCopyIcon />
                                                            </IconButton>
                                                        )}
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                    <p
                                        style={{
                                            margin: '15px',
                                            display: '-webkit-box',
                                            WebkitLineClamp: '3',
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {post[0].description}
                                    </p>
                                </>
                            </Box>

                            <Box sx={{ py: 2, display: 'flex' }}>
                                <div style={{ marginRight: '20px' }}>
                                    <IconButton aria-label="share">
                                        <ThumbDownIcon sx={{ scale: '1.3', color: '#ffc663' }} />
                                    </IconButton>

                                    <span>3</span>
                                </div>

                                <div>
                                    <IconButton aria-label="share">
                                        <ThumbUpIcon sx={{ scale: '1.3', color: '#ffc663' }} />
                                    </IconButton>

                                    <span>10</span>
                                </div>
                            </Box>
                        </CardContent>
                    </Card>
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

type PostCardProps = {
    handlecopy?: (command: string) => void;
    textcopied?: boolean;
    failCopied?: boolean;
};

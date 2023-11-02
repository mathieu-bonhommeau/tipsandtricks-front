import { Avatar, Box, Card, CardContent, CardHeader, Chip, IconButton, Modal, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Post } from '../../domain/posts/models/post.model.ts';
import { TipsContent } from './TipsContent.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { saveTips } from '../../domain/posts/use-cases/post.actions.ts';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { PostGatewayInterface } from '../../domain/posts/port/post-gateway-interface.ts';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { RootState } from '../../domain/store.ts';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { theme } from '../theme.ts';
import { addReaction, getReactionForLoggedUser } from '../../domain/reactions/uses_case/reaction.actions.ts';
import ReactionGatewayInterface from '../../domain/reactions/port/reaction-gateway-interface.ts';
import { ReactionType } from '../../domain/reactions/models/reaction.ts';

function PostCard(postCardProps: PostCardProps) {
    const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
    const reactions = useSelector((state: RootState) => state.reactionReducer.reactions);
    const user = useSelector((state: RootState) => state.authentication.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSaveTips = async (post: Post) => {
        await dispatch(
            saveTips({
                params: {
                    gatewayInterface: dependencyContainer.get<PostGatewayInterface>('PostGateway'),
                    navigate: navigate,
                },
                post,
            }),
        );
    };

    const handleReaction = (reactionType: ReactionType) => {
        dispatch(
            addReaction({
                params: {
                    gatewayInterface: dependencyContainer.get<ReactionGatewayInterface>('ReactionGateway'),
                    navigate: navigate,
                },
                postId: postCardProps.onePost.id,
                reactionType: reactionType,
            }),
        );
    };

    useEffect(() => {
        if (!user) return;
        dispatch(
            getReactionForLoggedUser({
                params: {
                    gatewayInterface: dependencyContainer.get<ReactionGatewayInterface>('ReactionGateway'),
                    navigate: navigate,
                },
                postId: postCardProps.onePost.id,
            }),
        );
    }, [user, dispatch, navigate, postCardProps.onePost.id]);

    const confirmSaveTipsModal = (post: Post) => (
        <Modal
            open={confirmModalOpen}
            onClose={() => setConfirmModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Voulez vous vraiment enregistrer ce tips ?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {post.title}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }} />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={() => setConfirmModalOpen(false)}>Annuler</button>
                    <button onClick={() => handleSaveTips(post)}>Enregistrer</button>
                </Box>
            </Box>
        </Modal>
    );

    const likeIcon = () => {
        const postReaction = reactions[postCardProps.onePost.id];
        if (user && postReaction?.postReaction === 'like') return <ThumbUpIcon />;
        return <ThumbUpOutlinedIcon />;
    };

    const dislikeIcon = () => {
        const postReaction = reactions[postCardProps.onePost.id];
        if (user && postReaction?.postReaction === 'dislike') return <ThumbDownIcon />;
        return <ThumbDownAltOutlinedIcon />;
    };

    return (
        <>
            <Card raised elevation={3} sx={{ maxWidth: 1000, bgcolor: 'primary.paper' }}>
                <CardHeader
                    avatar={<Avatar sx={{ width: 24, height: 24 }} />}
                    title={postCardProps.onePost.username}
                    action={
                        <>
                            <IconButton aria-label="share" onClick={() => setConfirmModalOpen(true)} disabled={!user}>
                                <AddCircleIcon />
                            </IconButton>
                        </>
                    }
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {postCardProps.onePost.title}
                    </Typography>
                    <p
                        style={{
                            margin: '15px 0',
                            display: '-webkit-box',
                            WebkitLineClamp: '3',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {postCardProps.onePost.message}
                    </p>
                    <Box sx={{ p: 2, border: '1px solid grey', bgcolor: 'primary.light' }}>
                        <TipsContent
                            tipsDetails={{
                                command: postCardProps.onePost.command,
                                description: postCardProps.onePost.description,
                                tags: postCardProps.onePost.tags,
                            }}
                            {...postCardProps}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ pt: 3 }}>
                            <Chip label="tag 1" style={{ marginRight: '5px' }} />
                            <Chip label="tag 2" style={{ marginRight: '5px' }} />
                            <Chip label="tag 3" style={{ marginRight: '5px' }} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                gap: 3,
                                color: theme.palette.primary.main,
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <IconButton
                                    aria-label="share"
                                    onClick={() => handleReaction(ReactionType.like)}
                                    disabled={!user}
                                    sx={{ color: 'inherit' }}
                                >
                                    {likeIcon()}
                                </IconButton>
                                <Typography variant="body2" component="div">
                                    {user
                                        ? reactions[postCardProps.onePost.id]?.likes
                                        : postCardProps.onePost.reactions.like}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <IconButton
                                    aria-label="share"
                                    onClick={() => handleReaction(ReactionType.dislike)}
                                    disabled={!user}
                                    sx={{ color: 'inherit' }}
                                >
                                    {dislikeIcon()}
                                </IconButton>
                                <Typography variant="body2" component="div">
                                    {user
                                        ? reactions[postCardProps.onePost.id]?.dislikes
                                        : postCardProps.onePost.reactions.dislike}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            {confirmSaveTipsModal(postCardProps.onePost)}
        </>
    );
}

export default PostCard;

type PostCardProps = {
    onePost: Post;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

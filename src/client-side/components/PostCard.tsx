import {Avatar, Box, Card, CardContent, CardHeader, Chip, IconButton, Typography} from '@mui/material';
import { Post } from '../../domain/posts/models/post.model.ts';
import { TipsContent } from './TipsContent.tsx';
import { useDispatch, useSelector } from 'react-redux';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { RootState } from '../../domain/store.ts';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { theme } from '../theme.ts';
import { addReaction, getReactionForLoggedUser } from '../../domain/reactions/uses_case/reaction.actions.ts';
import ReactionGatewayInterface from '../../domain/reactions/port/reaction-gateway-interface.ts';
import { ReactionType } from '../../domain/reactions/models/reaction.ts';
import ConfirmSaveTipsModal from './ConfirmSaveTipsModal.tsx';

type PostCardProps = {
    onePost: Post;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

function PostCard(postCardProps: PostCardProps) {
    const reactions = useSelector((state: RootState) => state.reactionReducer.reactions);
    const user = useSelector((state: RootState) => state.authentication.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                    action={<ConfirmSaveTipsModal post={postCardProps.onePost} />}
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
        </>
    );
}

export default PostCard;
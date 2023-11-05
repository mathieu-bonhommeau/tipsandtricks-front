import { Box, IconButton, Typography } from '@mui/material';
import { theme } from '../theme.ts';
import { ReactionType } from '../../domain/reactions/models/reaction.ts';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import { addReaction, getReactionForLoggedUser } from '../../domain/reactions/uses_case/reaction.actions.ts';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import ReactionGatewayInterface from '../../domain/reactions/port/reaction-gateway-interface.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Post } from '../../domain/posts/models/post.model.ts';

type ReactionsProps = {
    post: Post;
};

const Reactions = ({ post }: ReactionsProps) => {
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
                postId: post.id,
                reactionType: reactionType,
            }),
        );
    };

    const likeIcon = () => {
        const postReaction = reactions[post.id];
        if (user && postReaction?.postReaction === 'like') return <ThumbUpIcon />;
        return <ThumbUpOutlinedIcon />;
    };

    const dislikeIcon = () => {
        const postReaction = reactions[post.id];
        if (user && postReaction?.postReaction === 'dislike') return <ThumbDownIcon />;
        return <ThumbDownAltOutlinedIcon />;
    };

    useEffect(() => {
        if (!user) return;
        dispatch(
            getReactionForLoggedUser({
                params: {
                    gatewayInterface: dependencyContainer.get<ReactionGatewayInterface>('ReactionGateway'),
                    navigate: navigate,
                },
                postId: post.id,
            }),
        );
    }, [user, dispatch, navigate, post.id]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 3,
                color: '#fff',
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
                    {user ? reactions[post.id]?.likes : post.reactions.like}
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
                    {user ? reactions[post.id]?.dislikes : post.reactions.dislike}
                </Typography>
            </Box>
        </Box>
    );
};

export default Reactions;

import {Avatar, Box, Card, CardContent, CardHeader, Chip, IconButton, Typography, useTheme} from '@mui/material';
import { Post } from '../../domain/posts/models/post.model.ts';
import { TipsContent } from './TipsContent.tsx';
import ConfirmSaveTipsModal from './ConfirmSaveTipsModal.tsx';
import Reactions from './Reactions.tsx';
import { useNavigate } from 'react-router-dom';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {formatDateWithTime} from "../../domain/core/utils/format.ts";
import {iconArrowStyle} from "../style/buttonStyle.ts";
import {tagStyle} from "../style/tagStyle.ts";

type PostCardProps = {
    post: Post;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

function PostCard({ post, ...props }: PostCardProps) {
    const theme = useTheme()
    const navigate = useNavigate();
    const { username, title, message } = post;

    return (
        <Card raised elevation={3} id={`post-${post.id}`} sx={{
            maxWidth: 1000,
            borderRadius: '10px',
            px: 2,
            py: 1
        }}>
            <CardHeader
                avatar={<Avatar sx={{width: 32, height: 32,}}/>}
                title={username}
                subheader={formatDateWithTime(post.published_at, 'en')}
                action={<ConfirmSaveTipsModal post={post} />}
                sx={{
                    borderBottom: '1px solid',
                    borderColor: theme.palette.primary.light,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    '& .MuiCardHeader-content .MuiCardHeader-subheader': {
                        fontSize: '0.8rem',
                    },
            }}/>
            <CardContent>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        '&:hover .icon-post-title': {
                            transform: 'scale(1.1)',
                            color: theme.palette.text.primary,
                        }
                    }}
                    onClick={() => {
                        return navigate('/flux/' + post.id + '-' + post.slug);
                    }}
                >
                    {title}
                    <IconButton aria-label="share">
                        <ArrowRightAltIcon className="icon-post-title" sx={iconArrowStyle(theme)}/>
                    </IconButton>
                </Typography>
                <Typography
                    sx={{
                        my: '10px',
                        display: '-webkit-box',
                        WebkitLineClamp: '3',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {message}
                </Typography>
                <Box sx={{
                    margin: '10px 0',
                    p: 2,
                    background: theme.palette.secondary.main,
                    boxShadow: '15px 15px 30px #000',
                    borderRadius: '10px',
                }}>
                    <TipsContent
                        tipsDetails={{
                            title: post.title,
                            command: post.command,
                            description: post.description,
                            tags: post.tags,
                        }}
                        {...props}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                    <Box>
                        <Chip label="tag 1" style={tagStyle('tag 1')}/>
                        <Chip label="tag 2" style={tagStyle('tag 2')} />
                        <Chip label="tag 3" style={tagStyle('tag 3')} />
                    </Box>
                    <Reactions post={post} />
                </Box>
            </CardContent>
        </Card>
    );
}

export default PostCard;

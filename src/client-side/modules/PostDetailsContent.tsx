import {
    Avatar,
    Typography,
    Box,
    Chip,
    useTheme
} from '@mui/material';
import { Post } from '../../domain/posts/models/post.model.ts';
import ConfirmSaveTipsModal from './ConfirmSaveTipsModal.tsx';
import Reactions from './Reactions.tsx';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {iconArrowStyle} from "../style/buttonStyle.ts";
import {tagStyle} from "../style/tagStyle.ts";
import {formatDateWithTime} from "../../domain/core/utils/format.ts";
import {TipsContent} from "./TipsContent.tsx";
import { HashLink } from 'react-router-hash-link';

type PostCardProps = {
    post: Post;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

function PostDetailsContent({ post, ...props }: PostCardProps) {
    const theme = useTheme()
    const { username, title, message } = post;
    return (
        <>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} sx={{
                width: '100%',
                borderRadius: '10px',
                backgroundColor: theme.palette.background.paper,
                p: 2
            }}>
                <Box gridColumn="span 6">
                    <Box>
                        <HashLink to={'/flux#post-' + post.id}>
                            <ArrowRightAltIcon sx={{
                                ...iconArrowStyle(theme),
                                transform: 'scale(1) rotate(180deg)',
                                '&:hover': {
                                    transform: 'rotate(180deg) scale(1.1)',
                                    color: theme.palette.text.primary,
                                }
                            }} />
                        </HashLink>
                    </Box>
                </Box>
                <Box gridColumn="span 6">
                    <Typography variant="h3" sx={{ px: 2, display: 'flex', justifyContent: 'flex-end' }} component="div">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Chip label="tag 1" style={tagStyle('tag 1')}/>
                            <Chip label="tag 2" style={tagStyle('tag 2')} />
                            <Chip label="tag 3" style={tagStyle('tag 3')} />
                        </div>
                    </Typography>
                </Box>
                <Box gridColumn="span 1" />
                <Box gridColumn="span 10" display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} >
                    <Box gridColumn="span 12" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '1px solid',
                        paddingBottom: '15px',
                        borderColor: theme.palette.primary.light,
                    }}>
                        <Avatar
                            alt={username}
                            sx={{ width: 36, height: 36 }}
                        />
                        <Box>
                            <Typography sx={{ px: 2 }} component="div">{username}</Typography>
                            <Typography sx={{ px: 2, color: theme.palette.secondary.light, fontSize: '0.8rem'}} component="div">{formatDateWithTime(post.published_at, 'en')}</Typography>
                        </Box>
                    </Box>

                    <Box gridColumn="span 10" >
                        <Typography variant="h4" component="div">
                            {title}
                        </Typography>
                    </Box>
                    <Box gridColumn="span 2" sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <div>
                            <ConfirmSaveTipsModal post={post} />
                        </div>
                    </Box>
                    <Box gridColumn="span 12" >
                        <Typography
                            style={{
                                margin: '15px 0 30px 0',
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
                                fullContent={true}
                                tipsDetails={{
                                    title: post.title,
                                    command: post.command,
                                    description: post.description,
                                    tags: post.tags,
                                }}
                                {...props}
                            />
                        </Box>
                        <Box sx={{
                            height: '20px'
                        }} />
                        <Reactions post={post} />
                    </Box>
                </Box>
                <Box gridColumn="span 1" />
            </Box>
        </>
    );
}

export default PostDetailsContent;

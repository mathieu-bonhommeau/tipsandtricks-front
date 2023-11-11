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
import {iconArrowBackStyle} from "../style/buttonStyle.ts";
import {tagStyle} from "../style/tagStyle.ts";
import {formatDateWithTime} from "../../domain/core/utils/format.ts";
import {TipsContent} from "./TipsContent.tsx";
import { HashLink } from 'react-router-hash-link';
import {commandStyle} from "../style/tipsStyle.ts";
import {postCardMessageStyle, postDateStyle, postDetailsAvatarStyle, postDetailsBoxStyle} from "../style/postStyle.ts";

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
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} sx={postDetailsBoxStyle(theme)}>
                <Box gridColumn={{ xs: 'span 2', md: 'span 6' }}>
                    <Box>
                        <HashLink to={'/flux#post-' + post.id}>
                            <ArrowRightAltIcon sx={iconArrowBackStyle(theme)} />
                        </HashLink>
                    </Box>
                </Box>
                <Box gridColumn={{ xs: 'span 10', md: 'span 6' }}>
                    <Box sx={{ px: { xs: 2, md: 0 }, display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{
                            display: 'flex',
                            gap: '10px',
                            flexWrap: 'wrap',
                            paddingTop: { xs: 2, md: 0 },
                        }}>
                            <Chip label="tag 1" style={tagStyle('tag 1')} />
                            <Chip label="tag 2" style={tagStyle('tag 2')} />
                            <Chip label="tag 3" style={tagStyle('tag 3')} />
                        </Box>
                    </Box>
                </Box>
                <Box gridColumn={{ xs: 'span 12', md: 'span 1' }} />
                <Box gridColumn={{ xs: 'span 12', md: 'span 10' }} display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                    <Box gridColumn={{ xs: 'span 12', md: 'span 12' }} sx={postDetailsAvatarStyle(theme)}>
                        <Avatar
                            alt={username}
                            sx={{ width: 36, height: 36 }}
                        />
                        <Box>
                            <Typography sx={{ px: { xs: 2, md: 0 } }} component="div">{username}</Typography>
                            <Typography sx={{ px: { xs: 2, md: 0 }, ...postDateStyle(theme) }} component="div">
                                {formatDateWithTime(post.published_at, 'en')}
                            </Typography>
                        </Box>
                    </Box>

                    <Box gridColumn={{ xs: 'span 10'}}>
                        <Typography variant="h4" component="div">
                            {title}
                        </Typography>
                    </Box>
                    <Box gridColumn={{ xs: 'span 2' }} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <div>
                            <ConfirmSaveTipsModal post={post} />
                        </div>
                    </Box>
                    <Box gridColumn={{ xs: 'span 12', md: 'span 12' }}>
                        <Typography sx={{ ...postCardMessageStyle(), margin: '15px 0 30px 0' }}>
                            {message}
                        </Typography>
                        <Box sx={commandStyle(theme)}>
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
                <Box gridColumn={{ xs: 'span 12', md: 'span 1' }} />
            </Box>
        </>
            );
}

export default PostDetailsContent;

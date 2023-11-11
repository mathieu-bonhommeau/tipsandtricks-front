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
import {commandStyle} from "../style/tipsStyle.ts";
import {
    postCardHeaderStyle,
    postCardMessageStyle,
    postCardStyle,
    postCardTitleStyle
} from "../style/postStyle.ts";
import {flexBetweenCenter} from "../style/globalStyle.ts";

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
        <Card raised elevation={3} id={`post-${post.id}`} sx={postCardStyle()}>
            <CardHeader
                avatar={<Avatar sx={{width: 32, height: 32,}}/>}
                title={username}
                subheader={formatDateWithTime(post.published_at, 'en')}
                action={<ConfirmSaveTipsModal post={post} />}
                sx={postCardHeaderStyle(theme)}/>
            <CardContent>
                <Typography
                    variant="h5"
                    component="div"
                    sx={postCardTitleStyle(theme)}
                    onClick={() => {
                        return navigate('/flux/' + post.id + '-' + post.slug);
                    }}
                >
                    {title}
                    <IconButton aria-label="share">
                        <ArrowRightAltIcon className="icon-post-title" sx={iconArrowStyle(theme)}/>
                    </IconButton>
                </Typography>
                <Typography sx={postCardMessageStyle()}>
                    {message}
                </Typography>
                <Box sx={commandStyle(theme)}>
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

                <Box sx={{ ...flexBetweenCenter(), marginTop: '20px' }}>
                    <Box sx={{
                        display: 'flex',
                        gap: '10px',
                        flexWrap: 'wrap',
                        paddingTop: {xs: 2, md: 0},
                    }}>
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

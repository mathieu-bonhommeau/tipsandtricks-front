import { Avatar, Box, Card, CardContent, CardHeader, Chip, IconButton, Typography } from '@mui/material';
import { Post } from '../../domain/posts/models/post.model.ts';
import { TipsContent } from './TipsContent.tsx';
import ConfirmSaveTipsModal from './ConfirmSaveTipsModal.tsx';
import Reactions from './Reactions.tsx';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';

type PostCardProps = {
    post: Post;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

function PostCard({ post, ...props }: PostCardProps) {
    const navigate = useNavigate();
    const { username, title, message } = post;

    return (
        <Card raised elevation={3} sx={{ maxWidth: 1000, bgcolor: 'primary.paper' }}>
            <CardHeader
                avatar={<Avatar sx={{ width: 24, height: 24 }} />}
                title={username}
                action={<ConfirmSaveTipsModal post={post} />}
            />
            <CardContent>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        return navigate('/flux/' + post.id + '-' + post.slug);
                    }}
                >
                    {title}
                    <IconButton aria-label="share">
                        <OpenInNewIcon />
                    </IconButton>
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
                    {message}
                </p>
                <Box sx={{ p: 2, border: '1px solid grey', bgcolor: 'primary.light' }}>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ pt: 3 }}>
                        <Chip label="tag 1" style={{ marginRight: '5px' }} />
                        <Chip label="tag 2" style={{ marginRight: '5px' }} />
                        <Chip label="tag 3" style={{ marginRight: '5px' }} />
                    </Box>
                    <Reactions post={post} />
                </Box>
            </CardContent>
        </Card>
    );
}

export default PostCard;

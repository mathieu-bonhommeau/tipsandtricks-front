import { Card, CardContent, CardHeader, IconButton, Avatar, Typography, Box, Chip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Post } from '../../domain/posts/models/post.model.ts';
import { PostContent } from './PostContent.tsx';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function PostCard(postCardProps: PostCardProps) {
    return (
        <Card raised elevation={3} sx={{ maxWidth: 1000, bgcolor: 'primary.paper', p: 4, pb: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ px: 2 }} component="div">
                    {postCardProps.onePost.title}
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

            <CardHeader avatar={<Avatar sx={{ width: 24, height: 24 }} />} title={postCardProps.onePost.username} />
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
                    {postCardProps.onePost.message}
                </p>
                <Box sx={{ p: 2, border: '1px solid grey', bgcolor: 'primary.light' }}>
                    <PostContent
                        postDetails={{
                            command: postCardProps.onePost.command,
                            description: postCardProps.onePost.description,
                            tags: postCardProps.onePost.tags,
                        }}
                        {...postCardProps}
                    />
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
    );
}

export default PostCard;

type PostCardProps = {
    onePost: Post;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

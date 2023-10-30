import { Card, CardContent, CardHeader, IconButton, Avatar, Typography, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Post } from '../../domain/posts/models/post.model.ts';
import { TipsContent } from './TipsContent.tsx';

function PostCard(postCardProps: PostCardProps) {
    return (
        <Card raised elevation={3} sx={{ maxWidth: 1000, bgcolor: 'primary.paper' }}>
            <CardHeader
                avatar={<Avatar sx={{ width: 24, height: 24 }} />}
                title={postCardProps.onePost.username}
                action={
                    <>
                        <IconButton aria-label="share">
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

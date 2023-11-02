import { Avatar, Box, Card, CardContent, CardHeader, Chip, Typography } from '@mui/material';
import { Post } from '../../domain/posts/models/post.model.ts';
import { TipsContent } from './TipsContent.tsx';
import ConfirmSaveTipsModal from './ConfirmSaveTipsModal.tsx';
import Reactions from './Reactions.tsx';

type PostCardProps = {
    onePost: Post;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

function PostCard(postCardProps: PostCardProps) {
    return (
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
                    <Reactions post={postCardProps.onePost} />
                </Box>
            </CardContent>
        </Card>
    );
}

export default PostCard;

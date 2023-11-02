import { Card, CardContent, CardHeader, Avatar, Typography, Box, Chip } from '@mui/material';
import { Post } from '../../domain/posts/models/post.model.ts';
import { PostContent } from './PostContent.tsx';
import ConfirmSaveTipsModal from './ConfirmSaveTipsModal.tsx';
import Reactions from './Reactions.tsx';

type PostCardProps = {
    post: Post;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

function PostCardDetails({ post, ...props }: PostCardProps) {
    const { username, title, message } = post;
    return (
        <>
            <Card raised elevation={3} sx={{ maxWidth: 1000, bgcolor: 'primary.paper', p: 4, pb: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography variant="h5" sx={{ px: 2 }} component="div">
                        {title}
                    </Typography>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ marginRight: 20 }}>
                            <Chip label="tag 1" style={{ marginRight: '25px' }} />
                            <Chip label="tag 2" style={{ marginRight: '25px' }} />
                            <Chip label="tag 3" style={{ marginRight: '25px' }} />
                        </div>
                        <div>
                            <ConfirmSaveTipsModal post={post} />
                        </div>
                    </div>
                </Box>

                <CardHeader avatar={<Avatar sx={{ width: 24, height: 24 }} />} title={username} />
                <CardContent>
                    <Typography
                        style={{
                            margin: '15px 0',
                            display: '-webkit-box',
                            WebkitLineClamp: '3',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {message}
                    </Typography>
                    <Box sx={{ p: 2, border: '1px solid grey', bgcolor: 'primary.light' }}>
                        <PostContent
                            postDetails={{
                                command: post.command,
                                description: post.description,
                                tags: post.tags,
                            }}
                            {...props}
                        />
                    </Box>

                    <Reactions post={post} />
                </CardContent>
            </Card>
        </>
    );
}

export default PostCardDetails;

import { Alert, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tag } from '../../domain/tags/models/tag.model.ts';

const textFieldStyle = {
    bgcolor: 'primary.contrastText',
    '& input': {
        fontFamily: 'Roboto mono, sans-serif',
    },
};

export function PostContent(postContentProps: PostContentProps) {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    sx={textFieldStyle}
                    variant="outlined"
                    fullWidth
                    value={
                        postContentProps.postDetails.command.length > 37
                            ? `${postContentProps.postDetails.command.substring(0, 34)}...`
                            : postContentProps.postDetails.command
                    }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {postContentProps.textCopied ? (
                                    <Alert variant="filled" severity="success">
                                        Copié !
                                    </Alert>
                                ) : postContentProps.failCopied ? (
                                    <Alert severity="error">Echec de la copie !</Alert>
                                ) : (
                                    <IconButton
                                        onClick={() =>
                                            postContentProps.handleCopy!(postContentProps.postDetails.command)
                                        }
                                    >
                                        <ContentCopyIcon />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <Typography
                style={{
                    margin: '15px',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
            >
                {postContentProps.postDetails.description}
            </Typography>
        </>
    );
}

type PostContentProps = {
    postDetails: {
        command: string;
        description: string;
        tags: Tag[];
    };
    textCopied?: boolean;
    failCopied?: boolean;
    handleCopy?: (command: string) => void;
};

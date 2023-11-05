import { Alert, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tag } from '../../domain/tags/models/tag.model.ts';

type TipsContentProps = {
    tipsDetails: {
        title: string;
        command: string;
        description: string;
        tags: Tag[];
    };
    textCopied?: boolean;
    failCopied?: boolean;
    handleCopy?: (command: string) => void;
};

const textFieldStyle = {
    bgcolor: 'primary.contrastText',
    '& input': {
        fontFamily: 'Roboto mono, sans-serif',
    },
};

export function TipsContent({ tipsDetails, textCopied, failCopied, handleCopy }: TipsContentProps) {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    sx={textFieldStyle}
                    variant="outlined"
                    fullWidth
                    value={
                        tipsDetails.command.length > 37
                            ? `${tipsDetails.command.substring(0, 34)}...`
                            : tipsDetails.command
                    }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {textCopied ? (
                                    <Alert variant="filled" severity="success">
                                        Copié !
                                    </Alert>
                                ) : failCopied ? (
                                    <Alert severity="error">Echec de la copie !</Alert>
                                ) : (
                                    <IconButton onClick={() => handleCopy!(tipsDetails.command)}>
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
                {tipsDetails.description}
            </Typography>
        </>
    );
}

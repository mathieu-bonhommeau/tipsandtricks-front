import { Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tag } from '../../domain/tags/models/tag.model.ts';

type TipsContentProps = {
    tipsDetails: {
        command: string;
        description: string;
        tags: Tag[];
    };
    textCopied?: boolean;
    failCopied?: boolean;
    handleCopy?: (command: string) => void;
};

export function TipsContent({ tipsDetails, textCopied, failCopied, handleCopy }: TipsContentProps) {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    sx={{ bgcolor: 'primary.contrastText' }}
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
            <p
                style={{
                    margin: '15px',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
            >
                {tipsDetails.description}
            </p>
        </>
    );
}

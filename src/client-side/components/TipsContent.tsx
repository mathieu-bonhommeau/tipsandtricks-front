import { Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tag } from '../../domain/tags/models/tag.model.ts';

export function TipsContent(tipsContentProps: TipsContentProps) {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    sx={{ bgcolor: 'primary.contrastText' }}
                    variant="outlined"
                    fullWidth
                    value={
                        tipsContentProps.tipsDetails.command.length > 37
                            ? `${tipsContentProps.tipsDetails.command.substring(0, 34)}...`
                            : tipsContentProps.tipsDetails.command
                    }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {tipsContentProps.textCopied ? (
                                    <Alert variant="filled" severity="success">
                                        Copié !
                                    </Alert>
                                ) : tipsContentProps.failCopied ? (
                                    <Alert severity="error">Echec de la copie !</Alert>
                                ) : (
                                    <IconButton
                                        onClick={() =>
                                            tipsContentProps.handleCopy!(tipsContentProps.tipsDetails.command)
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
            <p
                style={{
                    margin: '15px',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
            >
                {tipsContentProps.tipsDetails.description}
            </p>
        </>
    );
}

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

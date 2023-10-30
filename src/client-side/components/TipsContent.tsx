import {Alert, Chip, IconButton, InputAdornment, TextField} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Tag} from "../../domain/tags/models/tag.model.ts";

export function TipsContent(tipsContentProps: TipsContentProps) {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField sx={{bgcolor: "primary.contrastText"}}
                    variant="outlined"
                    fullWidth
                    value={tipsContentProps.tipsDetails.command.length > 37 ? `${tipsContentProps.tipsDetails.command.substring(0, 34)}...` : tipsContentProps.tipsDetails.command}
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
                                    <IconButton onClick={() => tipsContentProps.handleCopy!(tipsContentProps.tipsDetails.command)}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Chip label="tag 1" style={{ marginRight: '5px' }} />
                    <Chip label="tag 2" style={{ marginRight: '5px' }} />
                    <Chip label="tag 3" style={{ marginRight: '5px' }} />
                </div>
                <div>
                    <IconButton aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </>
    )
}

type TipsContentProps = {
    tipsDetails: {
        command: string,
        description: string,
        tags: Tag[]
    },
    textCopied?: boolean,
    failCopied?: boolean,
    handleCopy?: (command: string) => void,
}
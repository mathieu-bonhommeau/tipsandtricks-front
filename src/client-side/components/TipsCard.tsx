import { Card, CardContent, CardHeader, IconButton, TextField, Chip, InputAdornment, Alert } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tips } from "../../domain/tips/models/tips.model";
import { handleCopyToClipboard } from "../utils/copyToClipBoard";
import { useState } from "react";

function TipsCard({ oneTips }: TipsCardProps) {

    const [textCopied, setTextCopied] = useState(false);
    const [failCopied, setFailCopied] = useState(false);


    const handleCopy = async (command: string) => {
        const success = await handleCopyToClipboard(command);
        if (success) {
            setTextCopied(true);
            setTimeout(() => {
                setTextCopied(false);
            }, 3000);
        } else {
            setFailCopied(true);
            setTimeout(() => {
                setFailCopied(false);
            }, 3000);
        }
    };



    return (
        <Card raised elevation={3} sx={{ maxWidth: 500 }}>
            <CardHeader
                title={oneTips.title}
                action={
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                }
            />
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={oneTips.command.length > 37 ? `${oneTips.command.substring(0, 34)}...` : oneTips.command}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {
                                        textCopied ? (
                                            <Alert variant="filled" severity="success" >Copié !</Alert>
                                        ) : failCopied ? (
                                            <Alert severity="error">Echec de la copie !</Alert>
                                        ) :

                                            (
                                                <IconButton onClick={() => handleCopy(oneTips.command)}>
                                                    <ContentCopyIcon />
                                                </IconButton>

                                            )



                                    }

                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <p style={{
                    margin: '15px',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }} >
                    {oneTips.description}
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
            </CardContent>
        </Card>
    );
}

export default TipsCard;

type TipsCardProps = {
    oneTips: Tips;
};
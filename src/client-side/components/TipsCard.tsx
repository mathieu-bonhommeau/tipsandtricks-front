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
        <Card style={{ maxWidth: '500px', margin: '10px auto' }}>
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
                        value={oneTips.command}
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
                <p style={{ margin: '15px' }} >{oneTips.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>

                        {
                            oneTips.tags.map((tag) =>

                                <Chip label={tag.label} key={tag.id} style={{ marginRight: '5px' }} />

                            )
                        }


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
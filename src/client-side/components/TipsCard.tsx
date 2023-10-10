import { Card, CardContent, CardHeader, IconButton, TextField, Chip, InputAdornment } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tips } from "../../domain/tips/models/tips.model";

function TipsCard({ oneTips }: TipsCardProps) {


    // Fonction pour copier le texte dans le presse-papiers
    const handleCopyToClipboard = () => {
        const textCopy = oneTips.command;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textCopy).then(
                function () {
                    console.log("Texte copié avec succès !");
                },
                function (err) {
                    console.error("Impossible de copier le texte : ", err);
                }
            );
        } else {

            const textarea = document.createElement("textarea");
            textarea.value = textCopy;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                console.log("Texte copié avec succès !");
            } catch (err) {
                console.error("Impossible de copier le texte", err);
            }
            document.body.removeChild(textarea);
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
                                    <IconButton onClick={handleCopyToClipboard}>
                                        <ContentCopyIcon />
                                    </IconButton>
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
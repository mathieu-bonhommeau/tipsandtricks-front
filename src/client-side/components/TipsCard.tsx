import {Card, CardContent, CardHeader, IconButton, Box} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { Tips } from '../../domain/tips/models/tips.model';
import {TipsContent} from "./TipsContent.tsx";

function TipsCard(tipsCardProps: TipsCardProps) {
    return (
        <Card raised elevation={3} sx={{ maxWidth: 500 }}>
            <CardHeader
                title={tipsCardProps.oneTips.title}
                action={
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                }
            />
            <CardContent>
                <Box sx={{ p: 2, border: '1px solid grey', bgcolor: "primary.light" }}>
                    <TipsContent tipsDetails={{
                        command: tipsCardProps.oneTips.command,
                        description: tipsCardProps.oneTips.description,
                        tags: tipsCardProps.oneTips.tags
                    }} {...tipsCardProps} />
                </Box>
            </CardContent>
        </Card>
    );
}

export default TipsCard;

type TipsCardProps = {
    oneTips: Tips;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};
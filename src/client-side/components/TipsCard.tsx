import { Card, CardContent, CardHeader, IconButton, Chip, Box } from '@mui/material';
import { Tips } from '../../domain/tips/models/tips.model';
import { TipsContent } from './TipsContent.tsx';
import EditIcon from '@mui/icons-material/Edit';
import ShareTipsModal from './ShareTipsModal.tsx';
import ConfirmDeleteTipsModal from './ConfirmDeleteTipsModal.tsx';

type TipsCardProps = {
    oneTips: Tips;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

function TipsCard(tipsCardProps: TipsCardProps) {
    const tipsContent = () => {
        return (
            <Box sx={{ p: 2, border: '1px solid grey', bgcolor: 'primary.light' }}>
                <TipsContent
                    tipsDetails={{
                        command: tipsCardProps.oneTips.command,
                        description: tipsCardProps.oneTips.description,
                        tags: tipsCardProps.oneTips.tags,
                    }}
                    {...tipsCardProps}
                />
            </Box>
        );
    };

    return (
        <>
            <Card raised elevation={3} sx={{ maxWidth: 500 }}>
                <CardHeader title={tipsCardProps.oneTips.title} action={<ShareTipsModal {...tipsCardProps} />} />
                <CardContent>
                    {tipsContent()}
                    <Box sx={{ pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Chip label="tag 1" style={{ marginRight: '5px' }} />
                            <Chip label="tag 2" style={{ marginRight: '5px' }} />
                            <Chip label="tag 3" style={{ marginRight: '5px' }} />
                        </div>
                        <div>
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <ConfirmDeleteTipsModal tipsId={tipsCardProps.oneTips.id} />
                        </div>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default TipsCard;

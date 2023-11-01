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

function TipsCard({ oneTips, ...props }: TipsCardProps) {
    const { id, title, command, description, tags } = oneTips;

    return (
        <>
            <Card raised elevation={3} sx={{ maxWidth: 500 }}>
                <CardHeader title={title} action={<ShareTipsModal oneTips={oneTips} {...props} />} />
                <CardContent>
                    <Box sx={{ p: 2, border: '1px solid grey', bgcolor: 'primary.light' }}>
                        <TipsContent
                            tipsDetails={{
                                command: command,
                                description: description,
                                tags: tags,
                            }}
                            {...props}
                        />
                    </Box>
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
                            <ConfirmDeleteTipsModal tipsId={id} />
                        </div>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default TipsCard;


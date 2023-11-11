import {Card, CardContent, CardHeader, IconButton, Chip, Box, useTheme} from '@mui/material';
import { Tips } from '../../domain/tips/models/tips.model';
import { TipsContent } from './TipsContent.tsx';
import EditIcon from '@mui/icons-material/Edit';
import ShareTipsModal from './ShareTipsModal.tsx';
import ConfirmDeleteTipsModal from './ConfirmDeleteTipsModal.tsx';
import {useState} from 'react';
import {formatDateWithTime} from "../../domain/core/utils/format.ts";
import {tagStyle} from "../style/tagStyle.ts";
import {iconStyle} from "../style/buttonStyle.ts";
import {commandStyle} from "../style/tipsStyle.ts";
import TipsModal from "./TipsModal.tsx";

type TipsCardProps = {
    oneTips: Tips;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

function TipsCard({ oneTips, ...props }: TipsCardProps) {
    const theme = useTheme()
    const { title, command, description, tags } = oneTips;

    const [openEditModal, setOpenEditModal] = useState(false);

    return (
        <>
            <Card raised elevation={3} sx={{ maxWidth: 500, borderRadius: '10px' }}>
                <CardHeader
                    title={title}
                    subheader={formatDateWithTime(oneTips.published_at, 'en')}
                    action={<ShareTipsModal oneTips={oneTips} {...props} />}
                    sx={{
                        paddingBottom: '0',
                        '& .MuiCardHeader-content .MuiCardHeader-subheader': {
                            fontSize: '0.8rem',
                        },
                    }}
                />
                <CardContent>
                    <Box sx={commandStyle(theme)}>
                        <TipsContent
                            tipsDetails={{
                                title: title,
                                command: command,
                                description: description,
                                tags: tags,
                            }}
                            nbDescriptionLines={1}
                            {...props}
                        />
                    </Box>
                    <Box sx={{ pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Chip label="tag 1" style={tagStyle('tag 1')}/>
                            <Chip label="tag 2" style={tagStyle('tag 2')} />
                            <Chip label="tag 3" style={tagStyle('tag 3')} />
                        </div>
                        <div>
                            <IconButton aria-label="edit" onClick={() => setOpenEditModal(true)}>
                                <EditIcon sx={iconStyle(theme)}/>
                            </IconButton>
                            <ConfirmDeleteTipsModal tips={oneTips} />
                        </div>
                    </Box>
                    <TipsModal open={openEditModal} tipsToEdit={oneTips} handleClose={() => setOpenEditModal(false)} />
                </CardContent>
            </Card>
        </>
    );
}

export default TipsCard;

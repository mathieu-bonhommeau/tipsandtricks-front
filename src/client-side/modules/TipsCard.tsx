import {Card, CardContent, CardHeader, IconButton, Chip, Box, useTheme} from '@mui/material';
import { Tips } from '../../domain/tips/models/tips.model';
import { TipsContent } from './TipsContent.tsx';
import EditIcon from '@mui/icons-material/Edit';
import ShareTipsModal from './ShareTipsModal.tsx';
import ConfirmDeleteTipsModal from './ConfirmDeleteTipsModal.tsx';
import React from 'react';
import {formatDateWithTime} from "../../domain/core/utils/format.ts";
import {tagStyle} from "../style/tagStyle.ts";
import {iconStyle} from "../style/buttonStyle.ts";

type TipsCardProps = {
    oneTips: Tips;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
    setSelectedTips: React.Dispatch<React.SetStateAction<Tips | undefined>>;
    handleOpenModal: () => void;
};

function TipsCard({ oneTips, ...props }: TipsCardProps) {
    const theme = useTheme()
    const { id, title, command, description, tags } = oneTips;
    const handleEdit = () => {
        props.setSelectedTips(oneTips);
        props.handleOpenModal();
    };

    return (
        <>
            <Card raised elevation={3} sx={{ maxWidth: 500, borderRadius: '10px' }}>
                <CardHeader
                    title={title}
                    subheader={formatDateWithTime(oneTips.published_at, 'en')}
                    action={<ShareTipsModal oneTips={oneTips} {...props} />}
                    sx={{
                        '& .MuiCardHeader-content .MuiCardHeader-subheader': {
                            fontSize: '0.8rem',
                        },
                    }}
                />
                <CardContent>
                    <Box sx={{
                        p: 2,
                        background: theme.palette.secondary.main,
                        boxShadow: '10px 10px 15px #000',
                        borderRadius: '10px',
                    }}>
                        <TipsContent
                            tipsDetails={{
                                title: title,
                                command: command,
                                description: description,
                                tags: tags,
                            }}
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
                            <IconButton aria-label="edit" onClick={handleEdit}>
                                <EditIcon sx={iconStyle(theme)}/>
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

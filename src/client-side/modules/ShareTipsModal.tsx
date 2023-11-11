import {Box, Button, Chip, IconButton, Modal, Typography, useTheme} from '@mui/material';
import { shareTip } from '../../domain/tips/use-cases/tips.actions.ts';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface.ts';
import { useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../utils/dispatch.ts';
import { useNavigate } from 'react-router-dom';
import { TipsContent } from './TipsContent.tsx';
import { Tips } from '../../domain/tips/models/tips.model.ts';
import {buttonStyle, iconStyle} from "../style/buttonStyle.ts";
import {TitleTextField} from './components/TitleTextField.tsx';
import {boxInModalStyle, boxStyle, formInModalStyle} from "../style/modalStyle.ts";
import {tagStyle} from "../style/tagStyle.ts";
import TextField from "@mui/material/TextField";
import {textOutlineFieldStyle} from "../style/textFieldStyle.ts";
import {flexBetweenCenter} from "../style/globalStyle.ts";
import {commandStyle} from "../style/tipsStyle.ts";

type ShareTipsModalProps = {
    oneTips: Tips;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

const ShareTipsModal = ({ oneTips }: ShareTipsModalProps) => {
    const theme = useTheme()
    const { title: tipsTitle, command, description, tags } = oneTips;

    const [openShareModal, setOpenShareModal] = useState(false);
    const [postTitle, setTitle] = useState(tipsTitle);
    const [message, setMessage] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleOpenShareModal = () => setOpenShareModal(true);
    const handleCloseShareModal = () => setOpenShareModal(false);
    const onShareTipsHandler = async () => {
        await dispatch(
            shareTip({
                params: {
                    gatewayInterface: dependencyContainer.get<TipsGatewayInterface>('TipsGateway'),
                    navigate: navigate,
                },
                tipsToShare: {
                    ...oneTips,
                    title: postTitle,
                    message: message,
                },
            }),
        );
    };

    return (
        <>
            <IconButton aria-label="share" onClick={handleOpenShareModal}>
                <ShareIcon sx={iconStyle(theme)}/>
            </IconButton>

            <Modal
                sx={boxStyle(theme)}
                open={openShareModal}
                onClose={handleCloseShareModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxInModalStyle()}>
                    <Box sx={{ ...flexBetweenCenter(), marginBottom: '20px'}}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Share a tips
                        </Typography>
                        <IconButton aria-label="close" onClick={handleCloseShareModal}>
                            <CloseIcon sx={iconStyle(theme)}/>
                        </IconButton>
                    </Box>
                    <form
                        onSubmit={onShareTipsHandler}
                    >
                        <Box sx={formInModalStyle()}>
                            <TitleTextField
                                label="Tips title"
                                isRequired={true}
                                title={postTitle}
                                setTitle={setTitle}
                            />
                            <TextField
                                sx={textOutlineFieldStyle(theme)}
                                label="Your message ..."
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <Box sx={{...commandStyle(theme), margin: '10px 0'}}>
                                <TipsContent
                                    tipsDetails={{
                                        title: postTitle,
                                        command: command,
                                        description: description,
                                        tags: tags,
                                    }}
                                    disableCopy={true}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                gap: '10px',
                                flexWrap: 'wrap',
                                py: {xs: 2, md: 2},
                                width: '100%'
                            }}>
                                <Chip label="tag 1" style={tagStyle('tag 1')}/>
                                <Chip label="tag 2" style={tagStyle('tag 2')} />
                                <Chip label="tag 3" style={tagStyle('tag 3')} />
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                style={{
                                    ...buttonStyle(theme),
                                    width: '100%'
                                }}
                                color="primary"
                            >
                                Share your tips
                            </Button>
                        </Box>

                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default ShareTipsModal;


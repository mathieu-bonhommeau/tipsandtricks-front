import {Box, Button, Chip, IconButton, Modal, Typography, useTheme} from '@mui/material';
import { shareTip } from '../../domain/tips/use-cases/tips.actions.ts';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface.ts';
import { useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import { useAppDispatch } from '../utils/dispatch.ts';
import { useNavigate } from 'react-router-dom';
import { TipsContent } from './TipsContent.tsx';
import { Tips } from '../../domain/tips/models/tips.model.ts';
import {buttonStyle, iconStyle} from "../style/buttonStyle.ts";
import {TitleTextField} from './components/TitleTextField.tsx';
import {boxInModalStyle, boxStyle} from "../style/modalStyle.ts";
import {tagStyle} from "../style/tagStyle.ts";
import TextField from "@mui/material/TextField";
import {textOutlineFieldStyle} from "../style/textFieldStyle.ts";

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
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                        marginBottom: '1rem',
                    }}>
                        Share a tips
                    </Typography>
                    <form
                        onSubmit={onShareTipsHandler}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            flex: '1',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TitleTextField
                            label="Titre du tips"
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
                        <Box sx={{
                            width: '100%',
                            margin: '10px 0',
                            p: 2,
                            background: theme.palette.secondary.main,
                            boxShadow: '15px 15px 30px #000',
                            borderRadius: '10px',
                        }}>
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
                        <Box sx={{ width: '100%' }}>
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
                            Partager votre tips
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default ShareTipsModal;

/*const boxStyle = {
    width: '80vw',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mx: 'auto',
    my: '20vh',
    borderRadius: 2,
};*/

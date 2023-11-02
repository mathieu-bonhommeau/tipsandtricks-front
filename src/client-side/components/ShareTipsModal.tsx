import { Box, Button, Chip, IconButton, Modal, TextareaAutosize, TextField, Typography } from '@mui/material';
import { shareTip } from '../../domain/tips/use-cases/tips.actions.ts';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface.ts';
import { useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import { useAppDispatch } from '../utils/dispatch.ts';
import { useNavigate } from 'react-router-dom';
import { TipsContent } from './TipsContent.tsx';
import { Tips } from '../../domain/tips/models/tips.model.ts';

type ShareTipsModalProps = {
    oneTips: Tips;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

const ShareTipsModal = ({ oneTips, ...props }: ShareTipsModalProps) => {
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
                <ShareIcon />
            </IconButton>

            <Modal
                open={openShareModal}
                onClose={handleCloseShareModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <Typography id="modal-modal-title" sx={{ m: 2 }} variant="h6" component="h2">
                        Partager un tips
                    </Typography>
                    <form
                        onSubmit={onShareTipsHandler}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            alignItems: 'center',
                            margin: '20px 0',
                        }}
                    >
                        <TextField
                            label="Titre du tips"
                            variant="outlined"
                            type="text"
                            required
                            value={postTitle}
                            sx={{ width: '100%' }}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <TextareaAutosize
                            style={{ width: '100%', padding: '5px', margin: '5px' }}
                            maxRows={4}
                            aria-label="mAjouter un message pour partager votre tips"
                            placeholder="Votre message..."
                            onChange={(event) => setMessage(event.target.value)}
                        />
                        <Box sx={{ p: 2, border: '1px solid grey', bgcolor: 'primary.light' }}>
                            <TipsContent
                                tipsDetails={{
                                    title: postTitle,
                                    command: command,
                                    description: description,
                                    tags: tags,
                                }}
                                {...props}
                            />
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Chip label="tag 1" style={{ marginRight: '5px' }} />
                            <Chip label="tag 2" style={{ marginRight: '5px' }} />
                            <Chip label="tag 3" style={{ marginRight: '5px' }} />
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ width: '100%', alignItems: 'right' }}
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

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper', // Change to whatever color you want
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

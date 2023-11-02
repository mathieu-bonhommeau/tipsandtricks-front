import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Chip,
    Modal,
    Box,
    Typography,
    Button,
    TextField,
    TextareaAutosize,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { Tips } from '../../domain/tips/models/tips.model';
import { TipsContent } from './TipsContent.tsx';
import { deleteTip, shareTip } from '../../domain/tips/use-cases/tips.actions.ts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useAppDispatch } from '../utils/dispatch.ts';
import { useNavigate } from 'react-router-dom';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface.ts';

function TipsCard(tipsCardProps: TipsCardProps) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openShareModal, setOpenShareModal] = useState(false);
    const [title, setTitle] = useState(tipsCardProps.oneTips.title);
    const [message, setMessage] = useState('');
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleOpenShareModal = () => setOpenShareModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const handleCloseShareModal = () => setOpenShareModal(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleDeleteTips = async (tipsId: number) => {
        await dispatch(
            deleteTip({
                params: {
                    gatewayInterface: dependencyContainer.get<TipsGatewayInterface>('TipsGateway'),
                    navigate: navigate,
                },
                tipsId: tipsId,
            }),
        );
        handleCloseDeleteModal();
    };

    const onShareTipsHandler = async () => {
        await dispatch(
            shareTip({
                params: {
                    gatewayInterface: dependencyContainer.get<TipsGatewayInterface>('TipsGateway'),
                    navigate: navigate,
                },
                tipsToShare: {
                    ...tipsCardProps.oneTips,
                    title: title,
                    message: message,
                },
            }),
        );
    };

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

    const shareTipsModalContent = () => {
        return (
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
                            value={title}
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
                        {tipsContent()}
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
        );
    };

    return (
        <>
            <Card raised elevation={3} sx={{ maxWidth: 500 }}>
                <CardHeader
                    title={tipsCardProps.oneTips.title}
                    action={
                        <IconButton aria-label="share" onClick={handleOpenShareModal}>
                            <ShareIcon />
                        </IconButton>
                    }
                />
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
                            <IconButton aria-label="delete" onClick={handleOpenDeleteModal}>
                                <DeleteIcon />
                            </IconButton>

                            <Modal
                                open={openDeleteModal}
                                onClose={handleCloseDeleteModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={boxStyle}>
                                    <Typography id="modal-modal-title" sx={{ m: 2 }} variant="h6" component="h2">
                                        Supprimer un tips
                                    </Typography>

                                    <Typography id="modal-modal-description" sx={{ m: 3 }}>
                                        Êtes-vous sûr de supprimer ce tips ?
                                    </Typography>

                                    <div style={{ textAlign: 'center' }}>
                                        <Button onClick={handleCloseDeleteModal}>Annuler</Button>
                                        <Button onClick={() => handleDeleteTips(tipsCardProps.oneTips.id)}>Ok</Button>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    </Box>
                </CardContent>
            </Card>
            {shareTipsModalContent()}
        </>
    );
}

export default TipsCard;

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

type TipsCardProps = {
    oneTips: Tips;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

import { Card, CardContent, CardHeader, IconButton, Chip, Modal, Box, Typography, Button } from '@mui/material';
import { Tips } from '../../domain/tips/models/tips.model';
import { TipsContent } from './TipsContent.tsx';
import { deleteTip } from '../../domain/tips/use-cases/tips.actions.ts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useAppDispatch } from '../utils/dispatch.ts';
import { useNavigate } from 'react-router-dom';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface.ts';
import ShareTipsModal from './ShareTipsModal.tsx';

type TipsCardProps = {
    oneTips: Tips;
    handleCopy?: (command: string) => void;
    textCopied?: boolean;
    failCopied?: boolean;
};

function TipsCard(tipsCardProps: TipsCardProps) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
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

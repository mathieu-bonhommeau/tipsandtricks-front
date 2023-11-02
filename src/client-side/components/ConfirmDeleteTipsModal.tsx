import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTip } from '../../domain/tips/use-cases/tips.actions.ts';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface.ts';
import { useState } from 'react';
import { useAppDispatch } from '../utils/dispatch.ts';
import { useNavigate } from 'react-router-dom';

type ConfirmDeleteTipsModalProps = {
    tipsId: number;
};

const ConfirmDeleteTipsModal = ({ tipsId }: ConfirmDeleteTipsModalProps) => {
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

    return (
        <>
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
                        Êtes-vous sûr de vouloir supprimer ce tips ?
                    </Typography>

                    <div style={{ textAlign: 'center' }}>
                        <Button onClick={handleCloseDeleteModal}>Annuler</Button>
                        <Button onClick={() => handleDeleteTips(tipsId)}>Ok</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ConfirmDeleteTipsModal;

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

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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Supprimer un tips
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ my: 3 }}>
                        Êtes-vous sûr de vouloir supprimer ce tips ?
                    </Typography>

                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Button variant="contained" onClick={handleCloseDeleteModal}>
                            Annuler
                        </Button>
                        <Button variant="contained" onClick={() => handleDeleteTips(tipsId)}>
                            Ok
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ConfirmDeleteTipsModal;

const boxStyle = {
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
    textAlign: 'center',
};

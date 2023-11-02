import { Post } from '../../domain/posts/models/post.model.ts';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { saveTips } from '../../domain/posts/use-cases/post.actions.ts';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { PostGatewayInterface } from '../../domain/posts/port/post-gateway-interface.ts';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../domain/store.ts';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ConfirmSaveTipsModalProps {
    post: Post;
}

const ConfirmSaveTipsModal = ({ post }: ConfirmSaveTipsModalProps) => {
    const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);

    const user = useSelector((state: RootState) => state.authentication.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSaveTips = async (post: Post) => {
        await dispatch(
            saveTips({
                params: {
                    gatewayInterface: dependencyContainer.get<PostGatewayInterface>('PostGateway'),
                    navigate: navigate,
                },
                post,
            }),
        );
    };

    return (
        <>
            <IconButton aria-label="share" onClick={() => setConfirmModalOpen(true)} disabled={!user}>
                <AddCircleIcon />
            </IconButton>
            <Modal
                open={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Voulez vous vraiment enregistrer ce tips ?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {post.title}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }} />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={() => setConfirmModalOpen(false)}>Annuler</button>
                        <button onClick={() => handleSaveTips(post)}>Enregistrer</button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ConfirmSaveTipsModal;

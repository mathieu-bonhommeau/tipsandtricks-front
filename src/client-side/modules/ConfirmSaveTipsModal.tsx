import { Post } from '../../domain/posts/models/post.model.ts';
import {Box, Button, IconButton, Modal, Typography, useTheme} from '@mui/material';
import { saveTips } from '../../domain/posts/use-cases/post.actions.ts';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { PostGatewayInterface } from '../../domain/posts/port/post-gateway-interface.ts';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../domain/store.ts';
import {constants} from "../../_config/constants/constants.ts";
import {useState} from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {buttonStyle, littleButtonStyle} from "../style/buttonStyle.ts";

type ConfirmSaveTipsModalProps = {
    post: Post;
};

const ConfirmSaveTipsModal = ({ post }: ConfirmSaveTipsModalProps) => {
    const theme = useTheme()
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

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
            <Button
                type="submit"
                variant="contained"
                disabled={!user}
                sx={littleButtonStyle(theme)}
                onClick={() => setConfirmModalOpen(true)}
                >
                +ADD
            </Button>
            <Modal
                open={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {constants.copyTipsToTipsBoard}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mb: 2 }}>
                        {post.title}
                    </Typography>
                    <Box style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Button variant="contained" sx={littleButtonStyle(theme)} onClick={() => setConfirmModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained" sx={littleButtonStyle(theme)} onClick={() => handleSaveTips(post)}>
                            Add to Tips Board
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ConfirmSaveTipsModal;

const styleModal = {
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

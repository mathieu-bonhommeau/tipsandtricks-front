import {IconButton, useTheme} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTip } from '../../domain/tips/use-cases/tips.actions.ts';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface.ts';
import { useState } from 'react';
import { useAppDispatch } from '../utils/dispatch.ts';
import { useNavigate } from 'react-router-dom';
import {iconStyle} from "../style/buttonStyle.ts";
import ConfirmModal from "./components/ConfirmModal.tsx";
import {Tips} from "../../domain/tips/models/tips.model.ts";

type ConfirmDeleteTipsModalProps = {
    tips: Tips;
};

const ConfirmDeleteTipsModal = ({ tips }: ConfirmDeleteTipsModalProps) => {
    const theme = useTheme()
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
                <DeleteIcon sx={iconStyle(theme)}/>
            </IconButton>

            <ConfirmModal
                question="Delete this tips ?"
                confirmButtonLabel="Delete"
                dataToDisplay={tips.title}
                action={() => handleDeleteTips(tips.id)}
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
            />
        </>
    );
};

export default ConfirmDeleteTipsModal;


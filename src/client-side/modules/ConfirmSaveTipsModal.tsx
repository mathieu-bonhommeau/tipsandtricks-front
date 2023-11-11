import { Post } from '../../domain/posts/models/post.model.ts';
import {Button, useTheme} from '@mui/material';
import { saveTips } from '../../domain/posts/use-cases/post.actions.ts';
import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { PostGatewayInterface } from '../../domain/posts/port/post-gateway-interface.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../domain/store.ts';
import {constants} from "../../_config/constants/constants.ts";
import {littleButtonStyle} from "../style/buttonStyle.ts";
import {useState} from "react";
import ConfirmModal from "./components/ConfirmModal.tsx";

type ConfirmSaveTipsModalProps = {
    post: Post;
};

const ConfirmSaveTipsModal = ({ post }: ConfirmSaveTipsModalProps) => {
    const theme = useTheme()

    const user = useSelector((state: RootState) => state.authentication.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

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
            <ConfirmModal
                question={constants.copyTipsToTipsBoard}
                confirmButtonLabel="Save"
                dataToDisplay={post.title}
                action={() => handleSaveTips(post)}
                open={confirmModalOpen}
                setOpen={setConfirmModalOpen}
            />
        </>
    );
};

export default ConfirmSaveTipsModal;


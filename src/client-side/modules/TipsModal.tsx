import { FC, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../utils/dispatch.ts';
import { createTips, updateTips } from '../../domain/tips/use-cases/tips.actions.ts';
import dependencyContainer from '../../_config/dependencies/dependencies.ts';
import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface.ts';
import { Tips } from '../../domain/tips/models/tips.model.ts';
import {boxInModalStyle, boxStyle} from "../style/modalStyle.ts";
import {Typography, useTheme} from "@mui/material";

interface Props {
    open: boolean;
    handleClose: () => void;
    tipsToEdit?: Tips;
    setSelectedTips: React.Dispatch<React.SetStateAction<Tips | undefined>>;
}
const TipsModal: FC<Props> = ({ open, handleClose, tipsToEdit, setSelectedTips }) => {
    const theme = useTheme()
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>('');
    const [command, setCommand] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [titleError, setTitleError] = useState<string | null>(null);
    const [commandError, setCommandError] = useState<string | null>(null);


    useEffect(() => {
        if (tipsToEdit) {
            setTitle(tipsToEdit.title || '');
            setCommand(tipsToEdit.command || '');
            setDescription(tipsToEdit.description || '');
        }
    }, [tipsToEdit]);

    const onCloseModal = () => {
        setTitle('');
        setCommand('');
        setDescription('');
        setSelectedTips(undefined);
        handleClose();
    }

    console.log(tipsToEdit);

    const handleSubmit = () => {
        setTitleError(null);
        setCommandError(null);

        if (title === '') {
            setTitleError('Le titre est obligatoire.');
        }

        if (command === '') {
            setCommandError('La commande est obligatoire.');
        }

        if (title != '' && command != '') {
            const tipsData = {
                title: title,
                command: command,
                description: description,
            };
            if (tipsToEdit) {
                const updatedTips = {
                    id: tipsToEdit.id,
                    title: title,
                    command: command,
                    description: description,
                };
                dispatch(
                    updateTips({
                        params: { gatewayInterface: dependencyContainer.get<TipsGatewayInterface>('TipsGateway') },
                        tips: updatedTips,
                    }),
                );
            } else {
                dispatch(
                    createTips({
                        params: { gatewayInterface: dependencyContainer.get<TipsGatewayInterface>('TipsGateway') },
                        tips: tipsData,
                    }),
                );
            }

            setTitle('');
            setCommand('');
            setDescription('');
            handleClose();
        }
    };

    const body = (
        <Box
            sx={boxInModalStyle()}
        >
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                marginBottom: '1rem',
            }}>
                {tipsToEdit ? 'Update a Tips' : 'Add a Tips'}
            </Typography>
            <TextField
                label="Titre du Tips"
                variant="outlined"
                required
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!titleError}
                helperText={titleError}
            />
            <TextField
                label="Commande"
                variant="outlined"
                required
                fullWidth
                multiline
                rows={4}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                error={!!commandError}
                helperText={commandError}
            />
            <TextField
                label="Description (optionel)"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={handleSubmit} variant="contained" color="primary">
                Ajouter / Modifier
            </Button>
        </Box>
    );

    return (
        <Modal
            sx={boxStyle(theme)}
            open={open}
            onClose={onCloseModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    );
};

export default TipsModal;

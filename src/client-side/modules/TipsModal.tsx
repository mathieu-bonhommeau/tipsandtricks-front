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
import { boxInModalStyle, boxStyle } from '../style/modalStyle.ts';
import { IconButton, Typography, useTheme } from '@mui/material';
import { buttonStyle, iconStyle } from '../style/buttonStyle.ts';
import CloseIcon from '@mui/icons-material/Close';
import { flexBetweenCenter } from '../style/globalStyle.ts';
import { constants } from '../../_config/constants/constants.ts';
import { textOutlineFieldStyle, titleFieldStyle } from '../style/textFieldStyle.ts';

interface Props {
    open: boolean;
    handleClose: () => void;
    tipsToEdit?: Tips;
}
const TipsModal: FC<Props> = ({ open, handleClose, tipsToEdit }) => {
    const theme = useTheme();
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
        handleClose();
    };

    console.log(tipsToEdit);

    const handleSubmit = () => {
        setTitleError(null);
        setCommandError(null);

        if (title === '') {
            setTitleError(constants.modalTitleRequired);
        }

        if (command === '') {
            setCommandError(constants.modalCommandRequired);
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
        <Box sx={boxInModalStyle()}>
            <Box sx={{ ...flexBetweenCenter() }}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                        marginBottom: '1rem',
                    }}
                >
                    {tipsToEdit ? 'Update a Tips' : 'Add a Tips'}
                </Typography>
                <IconButton aria-label="close" onClick={handleClose}>
                    <CloseIcon sx={iconStyle(theme)} />
                </IconButton>
            </Box>
            <TextField
                label="Tips title"
                variant="outlined"
                required
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!titleError}
                helperText={titleError}
                sx={titleFieldStyle(theme)}
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
                sx={textOutlineFieldStyle(theme)}
            />
            <TextField
                label="Description (optionel)"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={textOutlineFieldStyle(theme)}
            />
            <Button onClick={handleSubmit} variant="contained" sx={buttonStyle(theme)}>
                {tipsToEdit ? 'Update' : 'Add'}
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

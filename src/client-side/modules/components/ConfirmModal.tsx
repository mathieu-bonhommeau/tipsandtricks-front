import { Box, Button, Modal, Typography, useTheme } from '@mui/material';
import { littleButtonStyle } from '../../style/buttonStyle.ts';

type ConfirmModalProps = {
    question: string;
    confirmButtonLabel: string;
    dataToDisplay: string;
    action: () => void;
    open: boolean;
    setOpen: (boolean: boolean) => void;
};

export const ConfirmModal = ({
    question,
    confirmButtonLabel,
    dataToDisplay,
    action,
    open,
    setOpen,
}: ConfirmModalProps) => {
    const theme = useTheme();

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {question}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mb: 2 }}>
                        {dataToDisplay}
                    </Typography>
                    <Box style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                        <Button variant="contained" sx={littleButtonStyle(theme)} onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained" sx={littleButtonStyle(theme)} onClick={() => action()}>
                            {confirmButtonLabel}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ConfirmModal;

const styleModal = {
    width: '80vw',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: { xs: 3, md: 4 },
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mx: 'auto',
    my: '20vh',
    borderRadius: 2,
};

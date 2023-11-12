import { Alert, Snackbar } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

export type SnackBarComponentProps = {
    message: string;
    type: 'success' | 'warning' | 'error' | 'info';
    openSnackbar: boolean;
    setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
};

export function SnackBarComponent({ message, type, openSnackbar, setOpenSnackbar }: SnackBarComponentProps) {
    const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    return (
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

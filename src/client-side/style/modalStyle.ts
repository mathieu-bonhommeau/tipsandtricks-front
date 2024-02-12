import { Theme } from '@mui/material';
import { flexBetweenCenter } from './globalStyle.ts';

export const boxStyle = (theme: Theme) => ({
    width: { xs: '90vw', md: '50vw' },
    maxWidth: '800px',
    height: { xs: 'auto', md: '600px' },
    background: theme.palette.primary.light,
    boxShadow: 24,
    py: 2,
    px: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 2,
    mx: 'auto',
    my: { xs: '15vh', sm: '10vh' },
    borderRadius: 2,
});

export const boxInModalStyle = () => ({
    my: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

export const formInModalStyle = () => ({
    ...flexBetweenCenter(),
    height: '100%',
    flexDirection: 'column',
    gap: '10px',
    flex: '1',
});

import { Box, Button, Typography, useTheme } from '@mui/material';
import { buttonStyle } from '../../style/buttonStyle.ts';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { FormType } from '../../pages/Home.tsx';
import { routes } from '../../router/router.tsx';
import { Link } from 'react-router-dom';

export type ButtonAuthFormProps = {
    formType: FormType;
};

export function ButtonAuthForm({ formType }: ButtonAuthFormProps) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                width: '100%',
                gap: { xs: 2, md: 0 },
                justifyContent: 'space-between',
            }}
        >
            <Button type="submit" variant="contained" sx={buttonStyle(theme)}>
                {formType === 'login' && 'Join us !'}
                {formType === 'register' && 'Log in !'}
            </Button>
            <Box sx={{ color: { xs: theme.palette.primary.main, md: theme.palette.secondary.light } }}>
                <Typography component="p">
                    {formType === 'login' && 'You already have an account ?'}
                    {formType === 'register' && "You haven't an account ?"}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, cursor: 'pointer' }}>
                    <Link
                        to={formType === 'register' ? routes.homepage : routes[formType]}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        <Box
                            sx={{
                                color: 'inherit',
                                textDecoration: 'none',
                                textAlign: 'right',
                                position: 'relative',
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                                '&:hover': {
                                    color: theme.palette.text.primary,
                                },
                                '&:hover .login-line': {
                                    transform: 'scaleX(1.5)',
                                    background: theme.palette.text.primary,
                                },
                            }}
                        >
                            {formType === 'login' && 'Log in !'}
                            {formType === 'register' && 'Join us !'}
                            <ArrowRightAltIcon />
                            <Box
                                className="login-line"
                                sx={{
                                    width: '100%',
                                    borderBottom: '1px solid',
                                    textAlign: 'right',
                                    transformOrigin: 'right',
                                    transform: 'scaleX(0)',
                                    transition: 'transform 0.2s ease-in-out',
                                    position: 'absolute',
                                    bottom: -5,
                                }}
                            />
                        </Box>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

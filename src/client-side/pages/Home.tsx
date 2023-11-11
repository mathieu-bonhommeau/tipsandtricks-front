import {Container, Paper, Typography, useTheme} from '@mui/material';
import Box from "@mui/material/Box";
import {constants} from "../../_config/constants/constants.ts";
import Register from "../modules/Register.tsx";
import {WriteAnimation} from "../modules/animations/WriteAnimation.tsx";
import {BlinkAnimation} from "../modules/animations/BlinkAnimation.tsx";
import Login from "../modules/Login.tsx";
import {useLocation} from "react-router-dom";

export type FormType = 'register' | 'login'
export type HomeProps = {
    formType: FormType,
}

function Home({formType}: HomeProps) {
    const theme = useTheme()
    const location = useLocation();
    return (
        <Container maxWidth="xl" sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            justifyContent: 'center',
            flex: 1,
            p: {xs: 0, sm: 2},
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: {xs: 'column', md: 'row'},
                justifyContent: {xs: 'flex-start', md: 'space-around'},
                gap: {xs: 8, md: 0},
                my: 3,
            }}>
                <Box sx={{
                    width: {xs: '100%', md: '45%'},
                    px: {xs: 2, md: 0},
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}>
                    <Typography variant="h1" sx={{
                        fontSize: {xs: '32px', sm: '36px', md: '48px'},
                        height: '20%'
                    }}>
                        {constants.appName}
                    </Typography>
                    <Box sx={{
                        fontSize: "24px",
                        height: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <Box sx={{fontSize: '24px'}}>
                            <WriteAnimation textToWrite={constants.catchPhrasePrimary} delay={3000} speed={80} reload={location.state?.reload && true}/>
                        </Box>
                        <Box sx={{fontSize: '24px'}}>
                            <WriteAnimation textToWrite={constants.catchPhraseSecondary}  delay={6500} speed={80} reload={location.state?.reload && true}/>
                        </Box>
                        <Box sx={{fontSize: '48px', fontWeight: 'bold', my: 2}}>
                            <BlinkAnimation delay={14500} reload={location.state?.reload && true}/>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    width: {xs: '100%', md: '45%'},
                    flexDirection: 'column',
                    gap: 3,
                    justifyContent: 'center',
                    '&:hover .form-title-line': {
                        transform: 'scaleX(1)',
                    }
                }}>
                    <Box>
                        {formType == 'register' && <Typography variant="h1" sx={{
                            marginBottom: {xs: '10px', md: '20px'},
                            px: {xs: 2, md: 0},
                            fontSize: {xs: '24px', md: '32px'}
                        }}>Join the community !</Typography>}
                        {formType == 'login' && <Typography variant="h1" sx={{
                            marginBottom: {xs: '10px', md: '20px'},
                            px: {xs: 2, md: 0},
                            fontSize: {xs: '24px', md: '32px'}
                        }}>Log in !</Typography>}
                        <Box className="form-title-line" sx={{
                            width: '20%',
                            borderBottom: '1px solid',
                            transformOrigin: 'left',
                            transform: 'scaleX(0)',
                            transition: 'transform 0.2s ease-in-out',
                            position: 'absolute',
                        }}/>
                    </Box>
                    <Paper sx={{
                        background: theme.palette.background.paper,
                        boxShadow: '30px 30px 100px #000',
                        borderRadius: '10px',
                        borderColor: theme.palette.primary.light,
                    }}>
                        {formType === 'register' && <Register />}
                        {formType === 'login' && <Login />}
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
}

export default Home;


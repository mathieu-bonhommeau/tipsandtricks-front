import {Container, Paper, Typography, useTheme} from '@mui/material';
import Box from "@mui/material/Box";
import {constants} from "../../_config/constants/constants.ts";
import Register from "../modules/Register.tsx";
import {WriteAnimation} from "../modules/animations/WriteAnimation.tsx";
import {BlinkAnimation} from "../modules/animations/BlinkAnimation.tsx";
import {ReactElement, useEffect, useState} from "react";
import Login from "../modules/Login.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../domain/store.ts";

export type FormType = 'register' | 'login'
export type HomeProps = {
    formType: FormType
}

function Home({formType}: HomeProps) {
    const theme = useTheme()
    const [displayForm, setDisplayForm] = useState<FormType>('register')
    const user = useSelector((state: RootState) => state.registration.user);

    useEffect(() => {
        setDisplayForm(formType)
        user && setDisplayForm('login')
    }, [user]);

    return (
        <Container maxWidth="xl" sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            justifyContent: 'center',
            flex: 1
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                my: 5,
            }}>
                <Box sx={{
                    width: '45%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}>
                    <Typography variant="h1" sx={{
                        fontSize: "48px",
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
                        <Typography variant="div" sx={{fontSize: '24px'}}>
                            <WriteAnimation textToWrite={constants.catchPhrasePrimary} delay={3000} speed={80}/>
                        </Typography>
                        <Typography variant="div" sx={{fontSize: '24px'}}>
                            <WriteAnimation textToWrite={constants.catchPhraseSecondary}  delay={6500} speed={80}/>
                        </Typography>
                        <Typography variant="div" sx={{fontSize: '48px', fontWeight: 'bold', my: 2}}>
                            <BlinkAnimation delay={14500}/>
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    width: '45%',
                    flexDirection: 'column',
                    gap: 3,
                    justifyContent: 'center',
                    '&:hover .form-title-line': {
                        transform: 'scaleX(1)',
                    }
                }}>
                    <Box>
                        {displayForm == 'register' && <Typography variant="h1" sx={{marginBottom: '20px',}}>Join the community !</Typography>}
                        {displayForm == 'login' && <Typography variant="h1" sx={{marginBottom: '20px',}}>Log in !</Typography>}
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
                        {displayForm === 'register' && <Register setDisplayForm={setDisplayForm}/>}
                        {displayForm === 'login' && <Login setDisplayForm={setDisplayForm}/>}
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
}

export default Home;


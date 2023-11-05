import {Box, Button, Typography, useTheme} from "@mui/material";
import {buttonStyle} from "../../style/buttonStyle.ts";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {Dispatch, SetStateAction} from "react";
import {FormType} from "../../pages/Home.tsx";

export type ButtonAuthFormProps = {
    setDisplayForm: Dispatch<SetStateAction<FormType>>,
    formType: FormType
}

export function ButtonAuthForm({setDisplayForm, formType}: ButtonAuthFormProps) {
    const theme = useTheme()
    return (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Button
                type="submit"
                variant="contained"
                sx={buttonStyle(theme)}
            >
                {formType === 'login' && "Log in !"}
                {formType === 'register' && "Join us !"}
            </Button>
            <Box sx={{ color: theme.palette.primary.light }}>
                <Typography component="p">
                    {formType === 'login' && "You already have an account ?"}
                    {formType === 'register' && "You haven't an account ?"}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', cursor: 'pointer'}}>
                    <Box onClick={() => setDisplayForm(formType)} sx={{
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
                            background: theme.palette.text.primary
                        }
                    }}>
                        {formType === "login" && "Log in !"}
                        {formType === "register" && "Join us !"}
                        <ArrowRightAltIcon />
                        <Box className="login-line" sx={{
                            width: '100%',
                            borderBottom: '1px solid',
                            textAlign: 'right',
                            transformOrigin: 'right',
                            transform: 'scaleX(0)',
                            transition: 'transform 0.2s ease-in-out',
                            position: 'absolute',
                            bottom: -5,
                        }}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
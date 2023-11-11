import {Theme} from "@mui/material";
import {flexBetweenCenter} from "./globalStyle.ts";

export const boxStyle = (theme: Theme) => ({
    width: '50vw',
    minWidth: '400px',
    maxWidth: '800px',
    height: '600px',
    background: theme.palette.primary.light,
    boxShadow: 24,
    py: 2,
    px:4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 2,
    mx: 'auto',
    my: '10vh',
    borderRadius: 2,
});

export const boxInModalStyle = () => ({
    my: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
})

export const formInModalStyle = () => ({
    ...flexBetweenCenter(),
    height: '100%',
    flexDirection: 'column',
    gap: '10px',
    flex: '1'
})
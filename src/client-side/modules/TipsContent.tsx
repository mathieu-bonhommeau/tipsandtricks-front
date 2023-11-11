import {Box, IconButton, Typography, useTheme} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tag } from '../../domain/tags/models/tag.model.ts';
import {
    copyCommandResultStyle,
    textTipsFieldStyle
} from "../style/textFieldStyle.ts";
import {RootState} from "../../domain/store.ts";
import {useSelector} from "react-redux";

type TipsContentProps = {
    tipsDetails: {
        title: string;
        command: string;
        description: string;
        tags: Tag[];
    };
    textCopied?: boolean;
    failCopied?: boolean;
    handleCopy?: (command: string) => void;
    fullContent?: boolean;
    disableCopy?: boolean;
    nbDescriptionLines?: number;
};

export function TipsContent({ tipsDetails, textCopied, failCopied, handleCopy, fullContent = false, disableCopy = false, nbDescriptionLines = 3 }: TipsContentProps) {
    const theme = useTheme()
    const username = useSelector((state: RootState) => state.authentication.user)?.username || 'johnDoe';

    const copy = () => {
        if (textCopied) {
           return <span style={{...copyCommandResultStyle(theme), alignSelf: 'flex-start',}}>{textCopied && 'Copy !'}</span>
        }
        if (failCopied) {
            return <span style={{...copyCommandResultStyle(theme, true), alignSelf: 'flex-start',}}>{failCopied && 'Failed to copy !'}</span>
        }
        return (<IconButton onClick={() => handleCopy!(tipsDetails.command)} sx={{
            alignSelf: 'flex-start',
            '$:hover': {
                background: 'none',
                color: theme.palette.text.primary,
            }
        }}>
            {!disableCopy && <ContentCopyIcon/>}
        </IconButton>)
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Box sx={{...textTipsFieldStyle(theme), display: {xs: 'none', md: 'flex'}}}>
                    <Typography component="div" sx={commandStyle(fullContent)}>
                    <span style={{
                        width: '10%',
                        color: '#16B90C',
                        marginRight: '5px'
                    }}>{`${username}@tips&tricks: ~$ `}</span> {tipsDetails.command}
                    </Typography>
                    {copy()}
                </Box>
                <Box sx={{...textTipsFieldStyle(theme), display: {xs: 'flex', md: 'none'}}}>
                    <Typography component="div" sx={commandStyle(fullContent)}>
                    <span style={{
                        width: '10%',
                        color: '#16B90C',
                        marginRight: '5px'
                    }}>$</span> {tipsDetails.command}
                    </Typography>
                    {copy()}
                </Box>
            </Box>
            <Typography
                sx={descriptionStyle(fullContent, nbDescriptionLines)}
            >
                {tipsDetails.description}
            </Typography>
        </>
    );
}

const commandStyle = (fullContent: boolean) => {
    const style = {
        width: '90%',
    }
    if (fullContent) {
        return style
    }
    return {
        ...style,
        overflow: 'hidden',
        'white-space': 'nowrap',
        'text-overflow': 'ellipsis',
    }
}

const descriptionStyle = (fullContent: boolean, nbLines: number = 3) => {
    const style = {
        marginTop: '15px',
        maxWidth: '90%',
    }
    if (fullContent) {
        return style
    }
    return {
        ...style,
        display: '-webkit-box',
        WebkitLineClamp: nbLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    }
}
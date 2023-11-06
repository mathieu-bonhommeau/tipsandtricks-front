import {Link} from "react-router-dom";
import Box from "@mui/material/Box";

export type MenuItemProps = {
    label: string,
    path: string,
}

export function MenuItemComponent({label, path}: MenuItemProps) {
    return (
        <Box sx={{
            padding: '10px 20px',
            position: 'relative',
            display: 'inline-block',
            '&:hover .MuiBox-root': {
                transform: 'scaleX(1)',
            }
        }}>
            <Link to={path} style={{
                textDecoration: 'none',
                color: 'inherit',
            }} state={{ reload: false }}>
                {label}
                <Box sx={{
                    paddingTop: '5px',
                    borderBottom: '1px solid',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.2s ease-in-out',
                }}/>
            </Link>
        </Box>
    )
}
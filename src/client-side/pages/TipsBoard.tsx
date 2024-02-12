import TipsCard from '../modules/TipsCard.tsx';
import { useAppDispatch } from '../utils/dispatch.ts';
import { useSelector } from 'react-redux';
import { getTips } from '../../domain/tips/use-cases/tips.actions.ts';
import { useEffect, useState } from 'react';
import { RootState } from '../../domain/store.ts';
import dependencyContainer from '../../_config/dependencies/dependencies.ts';
import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface.ts';
import {
    Alert,
    AlertTitle,
    Box,
    CircularProgress,
    Container,
    Grid,
    Pagination,
    Typography,
    useTheme,
    Button,
} from '@mui/material';
import { Tips } from '../../domain/tips/models/tips.model.ts';
import { useNavigate } from 'react-router-dom';
import { resetError } from '../../domain/tips/use-cases/tips.slice.ts';
import AddIcon from '@mui/icons-material/Add';
import TipsModal from '../modules/TipsModal.tsx';
import CopyToClipboardWrapper from '../modules/CopyToClipboardWrapper.tsx';
import { littleButtonStyle } from '../style/buttonStyle.ts';
import { flexBetweenCenter } from '../style/globalStyle.ts';

function TipsBoard() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const lengthPerPage = 14;

    const tips = useSelector((state: RootState) => state.tipsReducer.data);
    const totalTips = useSelector((state: RootState) => state.tipsReducer.totalTips);
    const error = useSelector((state: RootState) => state.tipsReducer.error);
    const loading = useSelector((state: RootState) => state.tipsReducer.loading);

    useEffect(() => {
        dispatch(
            getTips({
                params: {
                    gatewayInterface: dependencyContainer.get<TipsGatewayInterface>('TipsGateway'),
                },
                page: currentPage,
                length: lengthPerPage,
            }),
        );
        return () => {
            dispatch(resetError());
        };
    }, [dispatch, currentPage, lengthPerPage, navigate]);

    let content;

    if (tips.length > 0) {
        content = (
            <Grid container spacing={4} alignItems="stretch">
                {tips.map((oneTips: Tips) => (
                    <Grid item xs={12} md={6} xl={4} key={oneTips.id}>
                        <CopyToClipboardWrapper>
                            <TipsCard oneTips={oneTips} />
                        </CopyToClipboardWrapper>
                    </Grid>
                ))}
            </Grid>
        );
    } else if (error) {
        content = (
            <Alert severity="error">
                <AlertTitle>Erreur !</AlertTitle>
                Unknown error — <strong>Retry later !</strong>
            </Alert>
        );
    } else {
        content = <Alert severity="info">No tips in your Tips board !</Alert>;
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ ...flexBetweenCenter(), my: 3 }}>
                <Box>
                    <Typography variant={'h1'}>My Tips Board</Typography>
                    <Typography sx={{ color: theme.palette.primary.light, my: 1 }}>
                        {totalTips} tips in your Tips Bank
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Button sx={littleButtonStyle(theme)} onClick={() => setOpenCreateModal(true)}>
                        <AddIcon sx={{ fontSize: '2rem' }} />
                    </Button>
                    <TipsModal open={openCreateModal} handleClose={() => setOpenCreateModal(false)} />
                </Box>
            </Box>

            <Box flex="1" display="flex" flexDirection="column">
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    content
                )}
            </Box>

            {totalTips > lengthPerPage && (
                <Box display="flex" justifyContent="center" mt={4} mb={4}>
                    <Pagination
                        shape="rounded"
                        count={Math.ceil(totalTips / lengthPerPage)}
                        page={currentPage}
                        onChange={(_, value) => setCurrentPage(value)}
                    />
                </Box>
            )}
        </Container>
    );
}

export default TipsBoard;

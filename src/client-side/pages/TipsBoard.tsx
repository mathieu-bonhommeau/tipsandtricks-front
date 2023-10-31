import TipsCard from '../components/TipsCard.tsx';
import { useAppDispatch } from '../utils/dispatch.ts';
import { useSelector } from 'react-redux';
import { getTips } from '../../domain/tips/use-cases/tips.actions.ts';
import { useEffect, useState } from 'react';
import { RootState } from '../../domain/store.ts';
import dependencyContainer from '../../_config/dependencies/dependencies.ts';
import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface.ts';
import { Alert, AlertTitle, Box, CircularProgress, Container, Grid, Pagination, Fab } from '@mui/material';
import { Tips } from '../../domain/tips/models/tips.model.ts';
import { useNavigate } from 'react-router-dom';
import CardWrapper from '../components/CardWrapper.tsx';
import { resetError } from '../../domain/tips/use-cases/tips.slice.ts';
import AddIcon from '@mui/icons-material/Add';
import TipsModal from '../components/TipsModal.tsx';

function TipsBoard() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [openModale, setOpenModale] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const lengthPerPage = 14;

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleOpenModal = () => {
        setOpenModale(true);
    };

    const handleCloseModal = () => {
        setOpenModale(false);
    };

    const tips = useSelector((state: RootState) => state.tipsReducer.data);
    const totalTips = useSelector((state: RootState) => state.tipsReducer.totalTips);
    const error = useSelector((state: RootState) => state.tipsReducer.error);
    const loading = useSelector((state: RootState) => state.tipsReducer.loading);


    useEffect(() => {
        dispatch(
            getTips({
                params: {
                    gatewayInterface: dependencyContainer.get<TipsGatewayInterface>('TipsGateway')
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
                    <Grid item xs={12} sm={6} key={oneTips.id}>
                        <CardWrapper>
                            <TipsCard oneTips={oneTips} />
                        </CardWrapper>
                    </Grid>
                ))}
            </Grid>
        );
    } else if (error) {
        content = (
            <Alert severity="error">
                <AlertTitle>Erreur !</AlertTitle>
                Erreur inattendue — <strong>Réessayez ultérieurement !</strong>
            </Alert>
        );
    } else {
        content = <Alert severity="info">Aucun Tips dans votre Tips Board !</Alert>;
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Fab color="primary" aria-label="add" onClick={handleOpenModal}>
                    <AddIcon />
                </Fab>
            </Box>

            <Grid container direction="column">
                <Box flex="1" display="flex" flexDirection="column">
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        content
                    )}
                </Box>
                <TipsModal open={openModale} handleClose={handleCloseModal} />
                {totalTips > lengthPerPage && (
                    <Box display="flex" justifyContent="center" mt={4} mb={4}>
                        <Pagination
                            shape="rounded"
                            count={Math.ceil(totalTips / lengthPerPage)}
                            page={currentPage}
                            onChange={handleChange}
                        />
                    </Box>
                )}
            </Grid>
        </Container>
    );
}

export default TipsBoard;

import TipsCard from "../components/TipsCard";
import { useAppDispatch } from '../utils/dispatch.ts';
import { useSelector } from 'react-redux';
import { getTips, resetError } from "../../domain/tips/use-cases/tips.actions.ts";
import { useEffect, useState } from "react";
import { RootState } from '../../domain/store.ts';
import dependencyContainer from "../../_config/dependencies/dependencies.ts";
import { TipsGatewayInterface } from "../../domain/tips/port/tips-gateway.interface.ts";
import { Alert, AlertTitle, Box, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import { Tips } from "../../domain/tips/models/tips.model.ts";



function TipsCollection() {
    const dispatch = useAppDispatch();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lengthPerPage, _setLengthPerPage] = useState<number>(14);

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);

    };

    const tips = useSelector((state: RootState) => state.tipsReducer.data);
    const totalTips = useSelector((state: RootState) => state.tipsReducer.totalTips);
    const error = useSelector((state: RootState) => state.tipsReducer.error);
    const loading = useSelector((state: RootState) => state.tipsReducer.loading);


    useEffect(() => {
        dispatch(getTips({
            tipsGatewayInterface: dependencyContainer.get<TipsGatewayInterface>('TipsGateway'),
            page: currentPage,
            length: lengthPerPage
        }));
        return () => {
            dispatch(resetError());
        };
    }, [dispatch, currentPage, lengthPerPage]);



    let content;

    if (tips.length > 0) {
        content = (
            <Grid container spacing={4} alignItems="stretch">
                {tips.map((oneTips: Tips) => (
                    <Grid item xs={12} sm={6} key={oneTips.id}>
                        <TipsCard oneTips={oneTips} />
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
            <Grid container direction="column" style={{ minHeight: '100vh' }}>
                <Box flex="1" display="flex" flexDirection="column" justifyContent="center">
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
                            onChange={handleChange}
                        />
                    </Box>
                )}
            </Grid>
        </Container>
    );
}

export default TipsCollection;

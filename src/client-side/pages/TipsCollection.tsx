import TipsCard from "../components/TipsCard";
import { useAppDispatch } from '../utils/dispatch.ts';
import { useSelector } from 'react-redux';
import { getTips } from "../../domain/tips/use-cases/tips.actions.ts";
import { useEffect } from "react";
import { RootState } from '../../domain/store.ts';
import dependencyContainer from "../../_config/dependencies/dependencies.ts";
import { TipsGatewayInterface } from "../../domain/tips/port/tips-gateway.interface.ts";
import { Container, Grid } from "@mui/material";
import { Tips } from "../../domain/tips/models/tips.model.ts";


function TipsCollection() {
    const dispatch = useAppDispatch();

    const tips = useSelector((state: RootState) => state.tipsReducer.tips);
    const error = useSelector((state: RootState) => state.tipsReducer.error);


    useEffect(() => {
        dispatch(getTips({ tipsGatewayInterface: dependencyContainer.get<TipsGatewayInterface>('TipsGateway') }));
    }, [dispatch]);


    console.log(tips);


    return (
        <>
            <Container maxWidth="md">
                <Grid container spacing={4} justifyContent="center">
                    {
                        tips.length > 0 &&
                        tips.map((oneTips: Tips) =>
                            <Grid item xs={12} sm={6} key={oneTips.id}>
                                <TipsCard oneTips={oneTips} />
                            </Grid>
                        )
                    }

                </Grid>
            </Container>
        </>

    );
}

export default TipsCollection;

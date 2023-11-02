import { AppDispatch } from '../../store.ts';
import { refreshToken } from '../../user/use-cases/authentication.actions.ts';
import { NavigateFunction } from 'react-router-dom';
import { UnauthorizedError } from '../models/errors/globalError.ts';
import GatewayInterface from '../port/gatewayInterface.ts';
import { routes } from '../../../client-side/router/router.tsx';
import { UserGatewayInterface } from '../../user/port/user-gateway.interface.ts';
import dependencyContainer from '../../../_dependencyContainer/dependencyContainer.ts';
import { deconnectUser } from '../../user/use-cases/authentication.slice.ts';

export type Params = {
    gatewayInterface: GatewayInterface;
    navigate?: NavigateFunction;
};

export const handleErrors = async (asyncFunction: () => unknown, params: Params, dispatch: AppDispatch) => {
    try {
        return await asyncFunction();
    } catch (error: unknown) {
        console.log('error', error);
        if (error instanceof UnauthorizedError) {
            try {
                await dispatch(
                    refreshToken({ gatewayInterface: dependencyContainer.get<UserGatewayInterface>('UserGateway') }),
                );
                return await asyncFunction();
            } catch (error: unknown) {
                if (error instanceof UnauthorizedError && params.navigate) {
                    dispatch(deconnectUser());
                    params.navigate(routes.login);
                    return;
                }
                throw new UnauthorizedError();
            }
        }
        throw error;
    }
};

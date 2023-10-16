import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIErrorMessages, User } from '../models/user.model.ts';
import { UserGatewayInterface } from '../port/user-gateway.interface.ts';
import { LoginUserInput } from '../models/authentication.model.ts';
import { NavigateFunction } from 'react-router-dom';
import {AxiosError} from "axios";
import {AppDispatch} from "../../store.ts";

export type UserParams = {
    userGatewayInterface: UserGatewayInterface;
    userInput?: LoginUserInput;
    navigate?: NavigateFunction;
};

/*type logoutUserParams = {
    userGatewayInterface: UserGatewayInterface;
    navigate: NavigateFunction;
};

type userGatewayParam = {
    userGatewayInterface: UserGatewayInterface;
}*/

/*type GenericFunction = (...args: any[]) => any;

type ProtectAsyncThunkWrapper<F extends GenericFunction> = (
    ...args: Parameters<F>
) => ReturnType<F>;

export function protectAsyncThunkWrapper<F extends GenericFunction>(
    func: F
): ProtectAsyncThunkWrapper<F> {
    return (...arg: Parameters<F>) => {
        try {
            return func(...arg)
        } catch (error: unknown) {
            const errorAxios = error as AxiosError
            if (errorAxios.status === 401) {
                await userGatewayInterface.logoutUser();
            }
            console.log(error)
        }
    }
}*/

export const checkUserAuthentification = async (
    asyncFunction: () => any,
    userParams: UserParams,
    dispatch: AppDispatch
) => {
    //console.log('test');
    try {
        //console.log('ok');
        //throw new Error('ca pete la !')
        return await asyncFunction();
    } catch (error) {
        const errorAxios = error as AxiosError;
        //if (errorAxios.response?.status === 401) {
            dispatch(refreshToken({ ...userParams }));
            console.log('refresh...');
            await asyncFunction()

        //}
    }
};

/*export const checkUserAuthentification = async (
    asyncFunction: () => any,
    userParams: UserParams,
    dispatch: AppDispatch
) => {
        return await asyncFunction()
            .catch((error: unknown) => {
                //const errorAxios = error as AxiosError;
                //if (errorAxios.response?.status === 401) {
                dispatch(refreshToken({ ...userParams }));
            }).then(res => {
                await asyncFunction()
            })
    } catch (error) {




        console.log('refresh...');
        //}
    }
};*/


export const loginUser = createAsyncThunk(
    'authentication/loginUser',
    async ({ userGatewayInterface, userInput, navigate }: UserParams): Promise<User | null> => {
        try {
            const result = await userGatewayInterface.loginUser(userInput!);
            navigate!('/flux');
            return result;
        } catch (error: unknown) {
            if (error) {
                throw error;
            }
            return null;
        }
    },
);

export const logoutUser = createAsyncThunk(
    'authentication/logoutUser',
    async (userParams: UserParams, { dispatch }) => {
        await checkUserAuthentification(
            async () => {
                await userParams.userGatewayInterface.logoutUser();
                console.log('logout');
                userParams.navigate!('/');
            },
            userParams,
            dispatch
        );
    }
);

/*export const logoutUser = createAsyncThunk(
    'authentication/logoutUser',
    async ({ userGatewayInterface, navigate }: logoutUserParams): Promise<void> => {
        try {
            await userGatewayInterface.logoutUser();
            navigate('/');
        } catch (error: unknown) {
            if (error) {
                throw error;
            }
        }
    },
);*/

export const reconnectUser = createAsyncThunk(
    'authentication/reconnectUser',
    async ({ userGatewayInterface }: UserParams): Promise<User | null> => {
        try {
            const user = await userGatewayInterface.reconnectUser();
            console.log(user);
            if (!user) {
                console.log('TODO : deal with user');
                return null;
            }
            return user;
        } catch {
            throw new Error(APIErrorMessages.RECONNECT_UNKNOWN_ERROR);
        }
    },
);

export const refreshToken = createAsyncThunk(
    'authentication/refreshToken',
    async ({ userGatewayInterface }: UserParams): Promise<User | null> => {
        await userGatewayInterface.refreshToken();
        return null;
    },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserInput, UserInterface } from '../port/user.interface.ts';

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async ({ userInterface, userInput }: { userInterface: UserInterface; userInput: UserInput }): Promise<string> => {
        try {
            return await userInterface.registerUser(userInput);
        } catch (error: unknown) {
            if (error && typeof error === 'string') {
                throw new Error(error);
            }
            return 'Internal error';
        }
    },
);

import { useDispatch } from 'react-redux';
import { store } from '../../domain/store.ts';

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

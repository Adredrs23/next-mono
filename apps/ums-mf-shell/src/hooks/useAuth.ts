import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { AuthState } from '../types/auth';

export const useAuth = (): AuthState => {
	return useSelector((state: RootState) => state.auth);
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

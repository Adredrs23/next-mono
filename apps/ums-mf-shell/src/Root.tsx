import { useKcAuth } from './hooks/useKcAuth';

export const Root = () => {
	const isLogin = useKcAuth();
	return isLogin ? 'Authenticated' : 'unauthenticated';
};

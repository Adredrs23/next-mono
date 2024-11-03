import { Link, Navigate } from 'react-router-dom';
import { useKcAuth } from './hooks/useKcAuth';
import { keycloak } from './utils/keycloakConfig';

export const Root = () => {
	const isLogin = useKcAuth();
	return isLogin ? (
		<>
			'Authenticated'
			<Link to='/posts'>Posts</Link>
			<button onClick={() => keycloak.logout()}>Logout</button>
		</>
	) : (
		'unauthenticated'
	);
};

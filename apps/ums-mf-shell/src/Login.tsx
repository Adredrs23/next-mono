import { FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAuth } from './hooks/useAuth';
import { loginError, loginStart, loginSuccess } from './redux/authSlice';
import { keycloak } from './utils/keycloakConfig';
import { UserProfile } from './types/auth';

const Login: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { isAuthenticated } = useAuth();

	// const from =
	// 	(location.state as { from: { pathname: string } })?.from?.pathname ||
	// 	'/posts';

	// useEffect(() => {
	// 	if (isAuthenticated) {
	// 		navigate(from, { replace: true });
	// 	}
	// }, [isAuthenticated, navigate, from]);

	const handleLogin = async (): Promise<void> => {
		dispatch(loginStart());
		try {
			const authenticated = await keycloak.init({
				// onLoad: 'login-required',
				// checkLoginIframe: false,
				// pkceMethod: 'S256',
			});

			await keycloak.login({
				// redirectUri: 'http://localhost:3005/posts',
			});

			if (authenticated) {
				const profile = await keycloak.loadUserProfile();
				const userProfile: UserProfile = {
					id: profile.id || '',
					username: profile.username || '',
					email: profile.email,
					firstName: profile.firstName,
					lastName: profile.lastName,
					token: keycloak.token || '',
					roles: keycloak.realmAccess?.roles || [],
				};
				console.log(keycloak, keycloak.token);
				dispatch(loginSuccess(userProfile));
				// navigate(from, { replace: true });
			}
		} catch (error) {
			alert(error);
			dispatch(
				loginError(error instanceof Error ? error.message : 'An error occurred')
			);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50'>
			<div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Sign in to your account
					</h2>
				</div>
				<button
					onClick={handleLogin}
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
				>
					Sign in with Keycloak
				</button>
			</div>
		</div>
	);
};

export default Login;

import { FC, ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAuth } from './hooks/useAuth';
import axios from 'axios';
import { loginStart, loginSuccess, logout } from './redux/authSlice';

interface ProtectedRouteProps {
	children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth();
	const location = useLocation();
	const dispatch = useAppDispatch();

	// const checkUserSession = () => async () => {
	// 	console.log('checkUserSession');

	// 	try {
	// 		const response = await axios.get('http://localhost:8000/auth/profile', {
	// 			withCredentials: true, // Ensures cookies are sent in cross-origin requests
	// 		});
	// 		dispatch(loginSuccess(response.data)); // Set the user data in Redux state
	// 	} catch (error) {
	// 		const response = await axios.post(
	// 			'http://localhost:8000/auth/logout',
	// 			{},
	// 			{
	// 				withCredentials: true, // Ensures cookies are sent in cross-origin requests
	// 			}
	// 		);
	// 		dispatch(logout()); // If validation fails, log out the user
	// 	}
	// };

	useEffect(() => {
		console.log('useEffect', isAuthenticated);
		// if state is not authenticated, but cookie is set, then refresh and check if token is valid
		if (!isAuthenticated) {
			try {
				dispatch(loginStart());
				axios
					.post(
						'http://localhost:8000/auth/refresh-token',
						{},
						{
							withCredentials: true, // Ensures cookies are sent in cross-origin requests
						}
					)
					.then((response) => {
						console.log('response', response);

						axios
							.get('http://localhost:8000/auth/profile', {
								withCredentials: true, // Ensures cookies are sent in cross-origin requests
							})
							.then((response) => {
								console.log('response', response);
								dispatch(loginSuccess(response.data));
							});
					})
					.catch((error) => {
						if (error.response.status === 401) {
							console.log('asdsds', error);
							dispatch(logout());
							window.location.href = '/';
						}
					});
			} catch (error) {
				axios
					.post(
						'http://localhost:8000/auth/logout',
						{},
						{
							withCredentials: true, // Ensures cookies are sent in cross-origin requests
						}
					)
					.then((response) => {
						dispatch(logout());
						return <Navigate to='/' state={{ from: location }} replace />;
					});
			}
		}
	}, [isAuthenticated]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	// if (!isAuthenticated) {
	// 	console.log('not authenticated');
	// 	// return <div>Unauth...</div>;

	// 	// return <Navigate to='/' state={{ from: location }} replace />;
	// }

	return <>{children}</>;
};

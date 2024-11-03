import { FC, useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAppDispatch, useAuth } from './hooks/useAuth';
import {
	loginError,
	loginStart,
	loginSuccess,
	logout,
} from './redux/authSlice';
// import { keycloak } from './utils/keycloakConfig';
// import { UserProfile } from './types/auth';
import axios from 'axios';

const Login: FC = () => {
	const dispatch = useAppDispatch();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (): Promise<void> => {
		dispatch(loginStart());

		try {
			const response = await axios.post(
				'http://localhost:8000/auth/login', // Replace with your backend login endpoint
				{
					username, // The payload contains the username and password
					password,
				},
				{
					withCredentials: true, // Ensures cookies are sent in cross-origin requests
				}
			);

			if (
				response.status === 200 &&
				response.data.message === 'Logged in successfully'
			) {
				const response = await axios.get('http://localhost:8000/auth/profile', {
					withCredentials: true, // Ensures cookies are sent in cross-origin requests
				});

				console.log('User Profile:', response.data);
				dispatch(loginSuccess(response.data));
				return response.data;
			}

			if (response.status === 401) {
				dispatch(loginError('Invalid username or password'));
				return;
			}

			console.log('Login successful:', response.data);
			// Handle post-login actions, such as redirecting the user or updating the UI state
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.error(
					'Error logging in:',
					error.response?.data || error.message
				);
			}
			// Handle login errors (e.g., invalid credentials)
		}
	};

	const handleLogout = async () => {
		await axios.post(
			'http://localhost:8000/auth/logout',
			{},
			{
				withCredentials: true, // Ensures cookies are sent in cross-origin requests
			}
		);
		dispatch(logout());
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50'>
			<div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Sign in to your account
					</h2>
				</div>

				<div className='mt-8'>
					<label
						htmlFor='username'
						className='block text-sm font-medium text-gray-700'
					>
						Username
					</label>
					<input
						type='text'
						name='username'
						id='username'
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
						placeholder='Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div className='mt-6'>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-700'
					>
						Password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						onClick={handleLogin}
						className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
					>
						Sign in with Keycloak
					</button>
				</div>
			</div>

			<Link to='/posts'>Posts</Link>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default Login;

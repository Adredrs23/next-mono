// KeycloakProvider.js
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
	loginStart,
	loginSuccess,
	loginError,
	logout,
} from '../redux/authSlice';
import { keycloak } from '../utils/keycloakConfig';

export const KeycloakProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const dispatch = useDispatch();
	const isRun = useRef(false);

	useEffect(() => {
		if (isRun.current) {
			return;
		}
		isRun.current = true;

		dispatch(loginStart()); // Signal that login is starting

		keycloak
			.init({
				onLoad: 'check-sso', // Check SSO without redirecting if not authenticated
				silentCheckSsoRedirectUri:
					window.location.origin + '/silent-check-sso.html',
				pkceMethod: 'S256', // Optional for added security
			})
			.then((authenticated: any) => {
				if (authenticated) {
					// Fetch the full user profile from Keycloak
					keycloak
						.loadUserProfile()
						.then((profile: any) => {
							// Dispatch the login success action with the full user profile
							dispatch(loginSuccess(profile));
							console.log('User profile loaded:', profile);
						})
						.catch((error: any) => {
							console.error('Failed to load user profile:', error);
							dispatch(loginError('Failed to load user profile'));
						});

					// Set up token refresh logic
					setInterval(() => {
						keycloak
							.updateToken(30)
							.then((refreshed: any) => {
								if (refreshed) {
									console.log('Token refreshed');
									// Optionally, reload the user profile after a token refresh
									keycloak
										.loadUserProfile()
										.then((updatedProfile: any) => {
											dispatch(loginSuccess(updatedProfile));
										})
										.catch(() => {
											console.warn('Failed to refresh user profile');
										});
								}
							})
							.catch(() => {
								console.warn('Failed to refresh token');
								keycloak.logout();
							});
					}, 60000); // Refresh token every minute
				} else {
					console.log('User is not authenticated');
					dispatch(loginError('User not authenticated'));
				}
			})
			.catch((error: any) => {
				console.error('Keycloak initialization error:', error);
				dispatch(loginError('Keycloak initialization failed'));
			});

		// Handle logout
		keycloak.onAuthLogout = () => {
			console.log('User logged out');
			dispatch(logout());
		};
	}, [dispatch]);

	return children;
};

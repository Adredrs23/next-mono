import { useEffect, useRef, useState } from 'react';
import { keycloak } from '../utils/keycloakConfig';
import { UserProfile } from '../types/auth';
import { useAppDispatch } from './useAuth';
import { loginSuccess } from '../redux/authSlice';

export const useKcAuth = () => {
	const isRun = useRef(false);
	const [isLogin, setIsLogin] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isRun.current) {
			return;
		}
		isRun.current = true;

		keycloak
			.init({
				onLoad: 'login-required',
				// onLoad: 'check-sso', // Check SSO without redirecting if not authenticated
				// silentCheckSsoRedirectUri:
				// 	window.location.origin + '/silent-check-sso.html',
				// // pkceMethod: 'S256', // Optional for added security
				// // checkLoginIframe: false,
			})
			.then((res: any) => {
				setIsLogin(true);
				console.log(keycloak);
				if (!keycloak.authenticated) {
					console.log('user is unauthenticated..!');
					keycloak.login();
				}
				keycloak
					.loadUserProfile()
					.then((profile: any) => {
						const userProfile: UserProfile = {
							id: profile.id || '',
							username: profile.username || '',
							email: profile.email,
							firstName: profile.firstName,
							lastName: profile.lastName,
							token: keycloak.token || '',
							roles: keycloak.realmAccess?.roles || [],
						};
						console.log(keycloak, profile);
						dispatch(loginSuccess(userProfile));
					})
					.catch((error: any) => {
						console.log(error);
					});
			})
			.catch((error: any) => {
				console.log(error);
			});

		// return () => {
		//     isRun.current = false;
		// };
	}, []);

	return { isLogin };
};

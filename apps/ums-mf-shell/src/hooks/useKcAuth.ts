import { useEffect, useRef, useState } from 'react';
import { initKeycloak, keycloak } from '../utils/keycloakConfig';
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

		const handleLogin = () => {
			console.log('handleLogin');
			setIsLogin(true);
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
		};

		initKeycloak(handleLogin);
	}, []);

	return { isLogin };
};

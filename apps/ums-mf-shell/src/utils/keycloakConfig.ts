import Keycloak from 'keycloak-js';

const keycloakConfig = {
	url: 'http://localhost:8080',
	realm: 'mfe-realm',
	clientId: 'mfe-client',
	// credentials: {
	// 	secret: 'PxZFoc4SLLjRK1tB8VDI2M5PQ9IeA9kG',
	// },
};

export const keycloak = new Keycloak(keycloakConfig);

export const initKeycloak = (onAuthenticatedCallback: () => void) => {
	keycloak
		.init({
			onLoad: 'login-required',
			// onLoad: 'check-sso',
			// silentCheckSsoRedirectUri:
			// 	window.location.origin + '/silent-check-sso.html',
			// pkceMethod: 'S256',
		})
		.then((authenticated: boolean) => {
			if (!authenticated) {
				console.log('user is not authenticated..!');
			}
			console.log('user is authenticated..!');
			onAuthenticatedCallback();
		})
		.catch(console.error);
};

// const doLogin = _kc.login;

// const doLogout = _kc.logout;

// const getToken = () => _kc.token;

// const getTokenParsed = () => _kc.tokenParsed;

// const isLoggedIn = () => !!_kc.token;

// const updateToken = (successCallback) =>
// 	_kc.updateToken(5).then(successCallback).catch(doLogin);

// const getUsername = () => _kc.tokenParsed?.preferred_username;

// const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

// const UserService = {
// 	initKeycloak,
// 	doLogin,
// 	doLogout,
// 	isLoggedIn,
// 	getToken,
// 	getTokenParsed,
// 	updateToken,
// 	getUsername,
// 	hasRole,
// };

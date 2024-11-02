export interface UserProfile {
	id: string;
	username: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	roles: string[];
	token: string;
}

export interface AuthState {
	isAuthenticated: boolean;
	user: UserProfile | null;
	error: string | null;
	isLoading: boolean;
}

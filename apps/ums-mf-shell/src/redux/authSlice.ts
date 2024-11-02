// authSlice.js or authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UserProfile } from '../types/auth';

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	error: null,
	isLoading: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginStart: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		loginSuccess: (state, action: PayloadAction<UserProfile>) => {
			state.isAuthenticated = true;
			state.user = action.payload;
			state.isLoading = false;
			state.error = null;
		},
		loginError: (state, action: PayloadAction<string>) => {
			state.isAuthenticated = false;
			state.user = null;
			state.isLoading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.error = null;
			state.isLoading = false;
		},
	},
});

export const { loginStart, loginSuccess, loginError, logout } =
	authSlice.actions;
export const authReducer = authSlice.reducer;

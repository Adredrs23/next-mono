import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';

export const store = configureStore({
	reducer: { auth: authReducer },
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware({
	// 		serializableCheck: {
	// 			// Ignore these action types
	// 			ignoredActions: ['auth/loginSuccess'],
	// 		},
	// 	}),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

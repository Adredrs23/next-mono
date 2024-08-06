// import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const appRouter = router({
	getUsers: publicProcedure.query(async () => {
		const response = await fetch('http://localhost:3000/api/users');

		if (!response.ok) {
			// This will activate the closest `error.js` Error Boundary
			throw new Error('Failed to fetch data');
		}

		const getUsersResponse = await response.json();
		return getUsersResponse.data;
	}),
});

// export type definition of API
export type AppRouter = typeof appRouter;

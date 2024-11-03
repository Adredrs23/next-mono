import React, { lazy } from 'react';
import { Images } from './Images';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const ProtectedRoute = lazy(() =>
	import('mfShell/ProtectedRoute').then((mod) => ({
		default: mod.ProtectedRoute,
	}))
);

const router = createBrowserRouter([
	{
		path: '/',
		element: <h1>Unprotected Page</h1>,
	},
	{
		path: '/images',
		element: (
			<div>
				<h1>Hello from Module Federation App from the child!!!</h1>
				<ProtectedRoute>
					<Images />
				</ProtectedRoute>
			</div>
		),
	},
]);
export const App: React.FC = () => <RouterProvider router={router} />;

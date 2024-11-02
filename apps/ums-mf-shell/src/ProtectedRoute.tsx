import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

interface ProtectedRouteProps {
	children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
	const x = useAuth();
	const location = useLocation();

	console.log('isAuthenticated', x);

	if (x.isLoading) {
		return <div>Loading...</div>;
	}

	if (!x.isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return <>{children}</>;
};

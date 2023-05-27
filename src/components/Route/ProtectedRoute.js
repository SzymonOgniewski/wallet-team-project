import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

export const ProtectedRoute = ({ component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = isLoggedIn && !isRefreshing;

  return shouldRedirect ? component : <Navigate to={redirectTo} />;
};

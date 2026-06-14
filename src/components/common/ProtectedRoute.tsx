import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import PageLoader from './PageLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

/**
 * ProtectedRoute - gates a route behind authentication (and, optionally, a role).
 *
 * - While the session is still resolving, renders the shared PageLoader so there
 *   is no flash of an empty page or a premature redirect.
 * - If no user is signed in, redirects to /login and preserves the attempted
 *   location in router state, so a future enhancement can return the user there
 *   after login.
 * - If allowedRoles is provided and the user's role is not included, redirects
 *   to / (ready for doctor-only dashboards). Omitting allowedRoles means
 *   "any authenticated user".
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <PageLoader />;

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && (!currentUser.role || !allowedRoles.includes(currentUser.role))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

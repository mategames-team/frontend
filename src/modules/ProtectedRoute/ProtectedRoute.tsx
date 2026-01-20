import { useAppSelector } from '@/store/hooks';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const { userId } = useParams();
  const location = useLocation();

  const isPublicProfile = location.pathname.startsWith('/profile/') && userId;

  if (!isAuthenticated && !isPublicProfile) {
    return <Navigate to='/?auth=login' replace />;
  }

  return <Outlet />;
};

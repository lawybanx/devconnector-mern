import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Spinner from '../layouts/Spinner';

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);

  if (isLoading) return <Spinner />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/login" />;
};

export default PrivateRoute;

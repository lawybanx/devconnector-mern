import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authActions';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              |
              <Link to="/dashboard" title="Dashboard">
                <i class="fas fa-user"></i>
                <span class="hide-sm"> Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                title="Logout"
                onClick={() => dispatch(logout())}
              >
                <i class="fas fa-sign-out-alt"></i>
                <span class="hide-sm">Logout</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteProfile } from '../../actions/profileActions';
import Spinner from '../layouts/Spinner';
import DashboardActions from './DashboardActions';
import Education from './Education';
import Experience from './Experience';

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    auth: { user },
    profile: { profile, loading },
  } = useSelector(state => ({
    auth: state.auth,
    profile: state.profile,
  }));
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience />
          <Education />

          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => dispatch(deleteProfile())}
            >
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="my-1">
            You do not have a profile yet, please setup your profile
          </p>
          <Link to="/create-profile" className="btn btn-primary">
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

export default Dashboard;

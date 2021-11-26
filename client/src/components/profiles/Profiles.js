import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';
import Spinner from '../layouts/Spinner';

const Profiles = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  const { profiles, loading } = useSelector(state => state.profile);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found</h4>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Profiles;

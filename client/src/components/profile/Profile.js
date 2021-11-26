import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProfileById } from '../../actions/profileActions';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfileById(id));
  }, []);

  const profile = useSelector(state => state.profile);

  return (
    <section className="container">
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>

      <div className="profile-grid my-1">
        <ProfileTop />
        <ProfileAbout />
        <ProfileExperience />
        <ProfileEducation />
        <ProfileGithub />
      </div>
    </section>
  );
};

export default Profile;

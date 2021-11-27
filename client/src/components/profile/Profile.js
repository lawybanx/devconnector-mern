import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProfileById } from '../../actions/profileActions';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import Spinner from '../layouts/Spinner';

const Profile = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfileById(id));
  }, []);

  const {
    auth,
    profile: { profile, loading },
  } = useSelector(state => ({
    auth: state.auth,
    profile: state.profile,
  }));

  return (
    <section className="container">
      {profile === null ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.isLoading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </>
              ) : (
                <>
                  <h4>No experience credentials</h4>
                </>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </>
              ) : (
                <>
                  <h4>No education credentials</h4>
                </>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;

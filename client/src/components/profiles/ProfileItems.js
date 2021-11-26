import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileItems = () => {
  const { profiles } = useSelector(state => state.profile);

  const items = profiles.map(profile => (
    <div key={profile._id} className="profile bg-light">
      <img className="round-img" src={profile.user.avatar} alt="" />
      <div>
        <h2>{profile.user.name}</h2>
        <p>{`${profile.status} at ${profile.company}`}</p>
        <p>{profile.location}</p>
        <Link to="/profile" className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {profile.skills.map(skill => (
          <li key={skill} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  ));

  return items;
};

export default ProfileItems;

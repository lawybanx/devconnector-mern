import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRepos } from '../../actions/profileActions';

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRepos(username));
  }, []);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      <div className="repo bg-white p-1 my-1">
        <div>
          <h4>
            <Link to="#" target="_blank" rel="noopener noreferrer">
              Repo One
            </Link>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            laborum!
          </p>
        </div>
        <div>
          <ul>
            <li className="badge badge-primary">Stars: 44</li>
            <li className="badge badge-dark">Watchers: 21</li>
            <li className="badge badge-light">Forks: 25</li>
          </ul>
        </div>
      </div>
      <div className="repo bg-white p-1 my-1">
        <div>
          <h4>
            <Link to="#" target="_blank" rel="noopener noreferrer">
              Repo Two
            </Link>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            laborum!
          </p>
        </div>
        <div>
          <ul>
            <li className="badge badge-primary">Stars: 44</li>
            <li className="badge badge-dark">Watchers: 21</li>
            <li className="badge badge-light">Forks: 25</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileGithub;

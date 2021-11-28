import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

const PostItem = ({
  post: { date, _id, user, text, name, avatar, likes, comments },
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {formatDate(date)}</p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          <span>4</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion <span className="comment-count">2</span>
        </Link>
        <button type="button" className="btn btn-danger">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default PostItem;

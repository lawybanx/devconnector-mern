import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../actions/postActions';

const CommentItem = ({
  comment: { user, avatar, name, text, date, _id },
  postId,
}) => {
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

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
      </div>
      {!auth.isLoading && auth.user._id === user && (
        <button
          onClick={() => dispatch(deleteComment(postId, _id))}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  );
};

export default CommentItem;

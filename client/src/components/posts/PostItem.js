import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { addLike, removeLike, deletePost } from '../../actions/postActions';

const PostItem = ({
  post: { date, _id, user, text, name, avatar, likes, comments },
  showActions
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
        {showActions && (
          <>
            <button
              onClick={e => dispatch(addLike(_id))}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up"></i>{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              type="button"
              onClick={e => dispatch(removeLike(_id))}
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.isLoading && auth.user._id === user && (
              <button
                onClick={() => dispatch(deletePost(_id))}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

export default PostItem;

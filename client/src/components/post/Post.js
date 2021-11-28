import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../../actions/postActions';
import Spinner from '../layouts/Spinner';

const Post = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, []);

  const { post } = useSelector(state => state.post);

  return (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      {post === null ? (
        <Spinner />
      ) : (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${post.user}`}>
              <img className="round-img" src={post.avatar} alt="" />
              <h4>{post.name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{post.text}</p>
          </div>
        </div>
      )}

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </section>
  );
};

export default Post;

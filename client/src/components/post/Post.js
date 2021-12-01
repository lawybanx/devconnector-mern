import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../../actions/postActions';
import Spinner from '../layouts/Spinner';
import PostItem from '../posts/PostItem';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

const Post = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, []);

  const { post, loading } = useSelector(state => state.post);

  return (
    <section className="container">
      {loading || post === null ? (
        <Spinner />
      ) : (
        <>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          
          <div className="comments">
            {post.comments.map(comment => (
              <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Post;

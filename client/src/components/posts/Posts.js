import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PostItem from './PostItem';
import PostForm from './PostForm';
import Spinner from '../layouts/Spinner';

const Posts = () => {
  const dispatch = useDispatch();

  const { posts, loading } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community!
          </p>
          <PostForm />
          <div className="posts">
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Posts;

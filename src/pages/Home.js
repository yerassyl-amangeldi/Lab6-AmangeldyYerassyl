import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/postsSlice';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PostCard = styled.div`
  background-color: #2E2F4D;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #6B48FF;
  transition: transform 0.2s;
  animation: ${fadeIn} 0.5s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
`;

const PostTitle = styled.h3`
  color: #FF5E78;
  margin: 0 0 0.5rem 0;
`;

const PostBody = styled.p`
  color: #F5F5F5;
`;

const LoadingText = styled.p`
  color: #6B48FF;
  font-style: italic;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: #2E2F4D;
  border-radius: 8px;
  border: 1px solid #6B48FF;
`;

const ErrorText = styled.p`
  color: #FF5E78;
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #6B48FF;
  color: #F5F5F5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #FF5E78;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchPosts());
  };

  if (loading) return <LoadingText>Загрузка...</LoadingText>;
  if (error) return (
    <ErrorContainer>
      <ErrorText>Ошибка: {error}</ErrorText>
      <RetryButton onClick={handleRetry}>Попробовать снова</RetryButton>
    </ErrorContainer>
  );

  return (
    <div>
      <h2>Посты</h2>
      {posts.map((post) => (
        <PostCard key={post.id}>
          <PostTitle>{post.title}</PostTitle>
          <PostBody>{post.body}</PostBody>
          <Link to={`/post/${post.id}`} style={{ color: '#6B48FF' }}>
            Посмотреть комментарии
          </Link>
        </PostCard>
      ))}
    </div>
  );
};

export default Home;
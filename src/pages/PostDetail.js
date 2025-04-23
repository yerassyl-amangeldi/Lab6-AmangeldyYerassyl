import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/postsSlice';
import { fetchComments, clearComments, deleteComment } from '../store/commentsSlice';
import CommentForm from '../components/CommentForm';
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

const PostContainer = styled.div`
  background-color: #2E2F4D;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #6B48FF;
`;

const PostTitle = styled.h2`
  color: #FF5E78;
  margin: 0 0 1rem 0;
`;

const PostBody = styled.p`
  color: #F5F5F5;
  margin-bottom: 1rem;
`;

const CommentsSection = styled.div`
  margin-top: 2rem;
`;

const CommentCard = styled.div`
  background-color: #1A1C3D;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #6B48FF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const CommentAuthor = styled.h4`
  color: #6B48FF;
  margin: 0 0 0.5rem 0;
`;

const CommentBody = styled.p`
  color: #F5F5F5;
`;

const DeleteButton = styled.button`
  padding: 0.3rem 0.6rem;
  background-color: #FF5E78;
  color: #F5F5F5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #6B48FF;
  }
`;

const LoadingText = styled.p`
  color: #6B48FF;
  font-style: italic;
`;

const ErrorText = styled.p`
  color: #FF5E78;
`;

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { posts, loading: postsLoading, error: postsError } = useSelector((state) => state.posts);
  const { comments, loading: commentsLoading, error: commentsError } = useSelector((state) => state.comments);

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
    dispatch(clearComments());
    dispatch(fetchComments(id));
  }, [dispatch, id, posts.length]);

  useEffect(() => {
    const foundPost = posts.find((p) => p.id === parseInt(id));
    setPost(foundPost);
  }, [posts, id]);

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  if (postsLoading || commentsLoading) return <LoadingText>Loading...</LoadingText>;
  if (postsError) return <ErrorText>Error loading post: {postsError}</ErrorText>;
  if (commentsError) return <ErrorText>Error loading comments: {commentsError}</ErrorText>;
  if (!post) return <ErrorText>Post not found</ErrorText>;

  return (
    <div>
      <PostContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostBody>{post.body}</PostBody>
      </PostContainer>
      <CommentsSection>
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.id}>
              <div>
                <CommentAuthor>{comment.email}</CommentAuthor>
                <CommentBody>{comment.body}</CommentBody>
              </div>
              <DeleteButton onClick={() => handleDelete(comment.id)}>Delete</DeleteButton>
            </CommentCard>
          ))
        )}
      </CommentsSection>
      <CommentForm postId={id} />
    </div>
  );
};

export default PostDetail;
import { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../store/commentsSlice';
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #6B48FF;
  background-color: #2E2F4D;
  color: #F5F5F5;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #6B48FF;
  background-color: #2E2F4D;
  color: #F5F5F5;
  resize: vertical;
`;

const Button = styled.button`
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

const ErrorText = styled.p`
  color: #FF5E78;
  margin: 0;
`;

const initialState = {
  username: '',
  commentText: '',
  errors: { username: '', commentText: '' },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload, errors: { ...state.errors, username: '' } };
    case 'SET_COMMENT_TEXT':
      return { ...state, commentText: action.payload, errors: { ...state.errors, commentText: '' } };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const CommentForm = ({ postId }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const reduxDispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!state.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!state.commentText.trim()) {
      errors.commentText = 'Comment text is required';
    }

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }

    const newComment = {
      postId: parseInt(postId),
      email: state.username, // JSONPlaceholder uses email as username
      body: state.commentText,
    };

    reduxDispatch(addComment(newComment));
    dispatch({ type: 'RESET' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Input
          type="text"
          placeholder="Username"
          value={state.username}
          onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })}
        />
        {state.errors.username && <ErrorText>{state.errors.username}</ErrorText>}
      </div>
      <div>
        <Textarea
          placeholder="Write your comment..."
          value={state.commentText}
          onChange={(e) => dispatch({ type: 'SET_COMMENT_TEXT', payload: e.target.value })}
          rows="4"
        />
        {state.errors.commentText && <ErrorText>{state.errors.commentText}</ErrorText>}
      </div>
      <Button type="submit">Submit Comment</Button>
    </Form>
  );
};

export default CommentForm;
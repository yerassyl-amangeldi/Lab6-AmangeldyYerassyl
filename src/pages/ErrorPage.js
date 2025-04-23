import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #2E2F4D;
  border-radius: 8px;
  border: 1px solid #6B48FF;
`;

const ErrorTitle = styled.h2`
  color: #FF5E78;
  font-family: 'Orbitron', sans-serif;
`;

const ErrorMessage = styled.p`
  color: #F5F5F5;
  margin: 1rem 0;
`;

const HomeLink = styled(Link)`
  color: #6B48FF;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: #FF5E78;
  }
`;

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <ErrorTitle>404 - Page Not Found</ErrorTitle>
      <ErrorMessage>Sorry, the page you're looking for doesn't exist.</ErrorMessage>
      <HomeLink to="/home">Go back to Home</HomeLink>
    </ErrorContainer>
  );
};

export default ErrorPage;
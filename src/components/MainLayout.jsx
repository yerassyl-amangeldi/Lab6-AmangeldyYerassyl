import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1A1C3D;
  color: #F5F5F5;
  font-family: 'Montserrat', sans-serif;
`;

const Header = styled.header`
  background-color: #2E2F4D;
  padding: 1rem;
  text-align: center;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  color: #FF5E78;
  border-bottom: 2px solid #6B48FF;
`;

const Navbar = styled.nav`
  background-color: #6B48FF;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;

  a {
    color: #F5F5F5;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      color: #FF5E78;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: #2E2F4D;
  padding: 1rem;
  border-right: 2px solid #6B48FF;
`;

const SidebarTitle = styled.h3`
  color: #FF5E78;
  margin-bottom: 1rem;
`;

const SidebarPost = styled.div`
  margin-bottom: 0.5rem;
  a {
    color: #6B48FF;
    text-decoration: none;
    &:hover {
      color: #FF5E78;
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
`;

const Footer = styled.footer`
  background-color: #2E2F4D;
  padding: 1rem;
  text-align: center;
  border-top: 2px solid #6B48FF;
  color: #F5F5F5;
`;

const MainLayout = () => {
  const { posts } = useSelector((state) => state.posts);
  const recentPosts = posts.slice(0, 5); // Get the first 5 posts

  return (
    <LayoutContainer>
      <Header>Comment System</Header>
      <Navbar>
        <Link to="/home">Home</Link>
        <Link to="/post/1">Sample Post</Link>
      </Navbar>
      <ContentWrapper>
        <Sidebar>
          <SidebarTitle>Recent Posts</SidebarTitle>
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <SidebarPost key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </SidebarPost>
            ))
          ) : (
            <p>No recent posts available.</p>
          )}
        </Sidebar>
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentWrapper>
      <Footer>© 2025 Comment System</Footer>
    </LayoutContainer>
  );
};

export default MainLayout;
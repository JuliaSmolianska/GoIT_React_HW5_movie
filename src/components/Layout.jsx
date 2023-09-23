import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { StyledLink } from './linkStyled';

const Layout = () => {
  return (
    <div>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/movies">Movies</StyledLink>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;

import { Outlet, Link } from 'react-router-dom';
import { Suspense } from 'react';
//import { StyledLink } from './linkStyled';
import css from './Layout.module.css';

const Layout = () => {
  return (
    <div>
      <div className={css.menuBox}>
        <Link to="/">
          <button className={css.menuButton}>Home</button>
        </Link>
        <Link to="/movies">
          <button className={css.menuButton}>Movies</button>
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;

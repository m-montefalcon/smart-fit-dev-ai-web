import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="app-layout">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

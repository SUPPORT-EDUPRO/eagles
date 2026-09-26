import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';

const Layout = () => (
  <div className="ye-site">
    <a className="ye-skip-link" href="#main-content">Skip to content</a>
    <Navbar />
    <main id="main-content" className="ye-main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;

import './layout.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import type { ReactNode } from 'react';


type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="overall-layout-container">
      <div className="header-containerlayout">
      <Header />
      </div>

      <main className='main-layout'>{children}</main>

      <div className="footer-container-layout">
      <Footer />
      </div>
      
      
      
    </div>
  );
}

export default Layout;

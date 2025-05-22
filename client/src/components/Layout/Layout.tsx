import './layout.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import type { ReactNode } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import useSidebarStore from '../../Store/sidebarstore';


type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const sidebarStatus = useSidebarStore((state)=>state.sideBar)
  return (
    <div className="overall-layout-container">
      {sidebarStatus && <div className="sidebar-container-here">
      <Sidebar/>
      </div>}
      <div className="content-all-layout">
        <Header/>
        <main className='main-layout'>{children}</main>
        <Footer/>
      </div>
    </div>
  );
}

export default Layout;

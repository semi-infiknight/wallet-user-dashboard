import React, { ReactNode } from 'react';

import LeftSideBar from '../components/LeftSideBar';
import AnimatedPageTransition from '../components/AnimatedPageTransition';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AnimatedPageTransition>
      <div className="flex h-full py-12 px-5">
        <LeftSideBar />
        <main className="h-full w-full xl:overflow-y-hidden overflow-y-scroll ">{children}</main>
      </div>
    </AnimatedPageTransition>
  );
};
export default Layout;

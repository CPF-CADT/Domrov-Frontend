import React, { ReactNode } from 'react';
import RecentClassesSidebar from './RecentClassesSidebar';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * MainLayout wraps the app with MainNavigation, RecentClassesSidebar, and the main content area.
 * - Reuses MainNavigation (existing)
 * - Integrates RecentClassesSidebar (new)
 * - Content area renders current page
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#0B1531]">
      <RecentClassesSidebar />
      <main className="flex-1 overflow-y-auto p-6 bg-[#101A36] rounded-lg shadow-lg mx-4 my-6">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;

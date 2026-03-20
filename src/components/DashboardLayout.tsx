import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Layout';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  greeting?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  greeting = true,
}) => {
  return (
    <div className="bg-gray-50 dark:bg-slate-950 h-dvh min-h-screen text-gray-900 dark:text-gray-100">
      <Sidebar />
      <Header title={title} greeting={greeting} />
      <main className="pt-20 pb-8 px-4 pl-22">
        {children}
      </main>
    </div>
  );
};

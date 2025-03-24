import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="justify-items-center items-center gap-16 grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 content-height">
      <main className="flex flex-col items-center sm:items-start gap-8 row-start-2 mx-auto w-full max-w-4xl">
        <div className="sm:text-left text-center">
          <h1 className="mb-4 font-bold text-4xl">{title}</h1>
          {description && <p className="text-gray-600 dark:text-gray-400">{description}</p>}
        </div>
        {children}
      </main>
    </div>
  );
} 
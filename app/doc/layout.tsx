'use client';
import LiveBlocksProvider from '@/components/LiveBlocksProvider';
import React from 'react';

function PageLayout({ children }: { children: React.ReactNode }) {
  return <LiveBlocksProvider children={children} />;
}

export default PageLayout;

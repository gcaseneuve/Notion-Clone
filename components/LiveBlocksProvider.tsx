'use client';

import React from 'react';
import { createContext } from 'react';
import { LiveblocksProvider } from '@liveblocks/react/suspense';

function LiveBlocksProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCK_PUBLIC_KEY) {
    throw new Error('Liveblocks API key is missing');
  }

  return (
    <LiveblocksProvider throttle={16} authEndpoint={'/auth-endpoint'}>
      {children}
    </LiveblocksProvider>
  );
}

export default LiveBlocksProvider;

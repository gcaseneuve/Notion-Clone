'use client';

import React, { useEffect, useState } from 'react';
import Document from '@/components/Document';

function DocumentPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      async function fetchParams() {
        const resolvedParams = await params; // Unwrap the Promise
        setId(resolvedParams.id); // Set the unwrapped `id` to the state
      }

      fetchParams();
    }
  }, [params]);

  if (!id) {
    // Render a loading state while the ID is being resolved
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}

export default DocumentPage;

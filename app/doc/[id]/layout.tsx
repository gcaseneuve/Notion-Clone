// import { auth } from '@clerk/nextjs/server';
import React from 'react';

function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  // const { userId, redirectToSignIn } = await auth();
  // if (!userId) {
  //   redirectToSignIn();
  // }

  return <div>{children}</div>;
}

export default DocLayout;

import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
// import { auth } from '@clerk/nextjs/server';
import { ArrowLeftCircle } from 'lucide-react';
import Image from 'next/image';

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    redirectToSignIn();
  }

  return (
    <main className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className="w-12 h-12" />
      <h1 className="font-bold">Get Starter with creating a New Document!</h1>
    </main>
  );
}

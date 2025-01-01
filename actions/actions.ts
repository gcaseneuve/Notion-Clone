"use server";

import { adminDb } from '@/firebase-admin';
import { auth } from '@clerk/nextjs/server';
import { create } from 'domain';
import { doc } from 'firebase/firestore';
import { redirect } from 'next/navigation';
import { title } from 'process';

export async function createNewDocument() {
    //auth().protect();
    const { sessionClaims } = await auth();

    // if(!userId){
    //     redirect('/sign-in');
    // }
  // Create a new document
  const docCOllectionRef = adminDb.collection('documents');
  const newDocRef  = await docCOllectionRef.add({ title: "New Document"});
  await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(newDocRef.id).set({
    userId: sessionClaims?.email,
    role: "owner",
    createdAt: new Date(),
    roomId: newDocRef.id

  });

  return {docId: newDocRef.id};
}
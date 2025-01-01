"use client";
import Reac, { useEffect, useState } from 'react'
import NewDocumentButton from './NewDocumentButton'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs';
import { collectionGroup, DocumentData, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import {useCollection} from 'react-firebase-hooks/firestore';
import SidebarOption from './SidebarOption';
  


interface RoomDocument extends DocumentData{

    userId: string;
    role: 'owner' | 'editor';
    createdAt: Date;
    roomId: string;
}

function Sidebar() {
    const { user } = useUser();
    
    const [groupedData, setGroupedData] = useState<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>({
      owner: [],
      editor: []
    });
    



    const [data, loading, error] = useCollection(
      user?.emailAddresses?.[0] && (
        query(
          collectionGroup(db, 'rooms'),
          where('userId', '==', user.emailAddresses[0]?.toString())
        )
      )
    );
    

    

    useEffect(() => {

      if (!data) return;

      const grouped = data.docs.reduce<
      {
        owner: RoomDocument[];
        editor: RoomDocument[];
      }>((acc, doc) => {
        const room = doc.data() as RoomDocument;
        if (room.role === 'owner') {
          acc.owner.push(
            {
              id: doc.id,
              ...room
            }
            
          );
        } else {
          acc.editor.push(
            {
              id: doc.id,
              ...room
            }
          );
        }
        return acc;
        
      },
      { owner: [], editor: [] }
      );
      setGroupedData(grouped);
      

    
    }, [data]);

    const menuOptions = (

        <>
        <NewDocumentButton />
        {/* My Documents */}

        <div className='flex py-4 flex-col space-y-4 md:max-w-36'>

          {groupedData.owner.length === 0 ? (
            <div>
              <h2 className='text-gray-500 font-semibold text-sm'>
                No Document found!
              </h2>
            </div>

          ) : (
            <>
              <h2 className='text-gray-500 font-semibold text-sm'>My Documents</h2>
              {
                groupedData.owner.map((doc) => (
                  <SidebarOption key={doc.id} id={doc.id}  href= {`/doc/${doc.id}`}/>
                ))
              }
            
            
            </>
            
          )}


        </div>
        {/* List ... */}
        {/* Shared with me ... */}
        {/* List ... */}
        
        
        </>
    );

  return (
    <div className='p-2 md:p-5 bg-gray-200 relative'>
        <div className='md:hidden'>
        <Sheet>
        <SheetTrigger>
            <MenuIcon size={24} />
        </SheetTrigger>
        <SheetContent side={'left'}>
            <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <div>
            {menuOptions}

            </div>
            </SheetHeader>
        </SheetContent>
        </Sheet>
        </div>
        

        
        <div className='hidden md:inline'>
            {menuOptions}
        </div>




        
    </div>
  )
}

export default Sidebar
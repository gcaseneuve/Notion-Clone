import React, { FormEvent, use, useEffect, useState, useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore';


function Document({id} :{
    id: string
}) {
  const [data, loading,error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState('') ;
  const [isUpdating, setIsUpdating] = useTransition();

  
  

  useEffect(() => {

    if(typeof window !== 'undefined'){
      if(data){
        setInput(data?.title);
  
      }
    } 
  
    
  }, [data]);




  const updateDocument = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {

      setIsUpdating(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input

        })
      });


    }

  }


  return (
    <div>

      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        <form className ="flex flex-1 space-x-2 " onSubmit={updateDocument}>
          {/* update the title */}
          <Input placeholder="Title" value={input} onChange={(e) => {setInput(e.target.value)}}/>
          <Button disabled={isUpdating}>{isUpdating ? "Updating..." : "Update"}</Button>

          
          {/* IF */}
          {/* isOwner && InviteUser, DeleteDocument*/}
        </form>
      </div>
      

      <div>


      </div>
      {/* <div>Document: {id}</div> */}


    </div>

    
    
  )
}

export default Document
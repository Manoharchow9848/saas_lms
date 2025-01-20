"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Notes() {

    const {courseId} = useParams();
    const [notes,setNotes] = useState([])
    const [stepCount,setStepCount] = useState(0);
    useEffect(()=>{
        GetNotes()
        console.log(courseId);
        
    },[])

    const GetNotes = async()=>{
        const result = await axios.post('/api/study-type',{
              courseId:courseId,
              studyType:'notes'
        })
        console.log(result.data);
        console.log(result.data.length);
        
        setNotes(result?.data)
        
    }

  return notes&& (
    <div >
      <div className='flex gap-5 items-center'>
      {stepCount>0 &&  <Button onClick={()=>setStepCount(stepCount-1)} variant="outline" size="sm">previous</Button>}
        
        {
            notes.map((item,index)=>(
            <div key={index} className={`w-full h-2 rounded-full
              ${index<stepCount?'bg-primary':'bg-gray-200'}

            `}>
                
                </div>
            ))}
            <Button onClick={()=>setStepCount(stepCount+1)} variant="outline" size="sm">Next</Button>

      </div>
      <div>
        <div  dangerouslySetInnerHTML={{__html:(notes[stepCount]?.notes)?.replace('```html',' ')}} />

        {notes?.length==stepCount && 
        <div className='flex items-center gap-10  flex-col justify-center'>
          <h2>End of notes</h2>
         <Link href={`/dashboard`} ><Button>Go to course page</Button></Link> 
        </div>
        }
      </div>
    </div>
  )
}

export default Notes

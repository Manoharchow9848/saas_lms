"use client"
import React, { useState } from 'react'
import SelectOption from './_components/SelectOption'
import { Button } from '@/components/ui/button';
import TopicInput from './_components/TopicInput';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"

function create() {
 
    const [step, setStep] = useState(0);
    const [formData,setFormData] = useState([]);
    const {user} = useUser();
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const handleUserInput =(fieldName,fieldValue)=>{
             setFormData(prev=>({
              ...prev,
              [fieldName]:fieldValue
             }))
             console.log(formData);
             
    }
    const GenerateCourseOutline=async()=>{
      const courseId=uuidv4();
      setLoading(true);
      const result = await axios.post('/api/generate-course-outline',{
        courseId:courseId,
        ...formData,
        createdBy:user?.primaryEmailAddress?.emailAddress
      });
      setLoading(false);
      toast("Course Generated Successfully, Pleash click Refresh");
      router.replace(`/dashboard`); 
      //Toast Notification
       
      console.log(result.data.result.resp);
    }
  return (
    <div className='flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20'>
      <h2 className='font-bold text-4xl text-blue-800'>Start Building Your Study Matrial</h2>
      <p className='text-gray-500 text-lg'>Fill all details to generate your study matrial for preparation</p> 
      <div className='mt-10'>
      {step==0?<SelectOption selectedStudyType={(value)=>handleUserInput('courseType',value)} />:
        <TopicInput setTopic={(value)=>handleUserInput('topic',value)} setDifiicultyLevel={(value)=>handleUserInput('difficultyLevel',value)} />}
      </div>
      <div className='flex justify-between w-full mt-32 '>
     {step!=0 ? <Button  onClick={()=>setStep(step-1)}  variant="outline">Previous</Button>:<Button disabled variant="outline">Previous</Button>}
       {step==0? <Button onClick={()=>setStep(step+1)}>Next</Button>:
       <Button onClick={GenerateCourseOutline} disabled={loading} >{loading?<Loader className='animate-spin' />:'Generate'}</Button>}
      </div>
    </div>
  )
}

export default create

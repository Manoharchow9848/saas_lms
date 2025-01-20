import { Button } from '@/components/ui/button'
import axios from 'axios'
import { RefreshCcw } from 'lucide-react';
import Image from 'next/image'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function MaterialCardItem({item,studyTypeContent}) {
  const {courseId} = useParams();
  const [course,setCourse] = useState([])
  const [loading,setLoading] = useState(false)
  const [studyTypeContent1,setStudyTypeContent1] = useState([]);
useEffect(()=>{
     GetStudyMaterial()
     console.log(courseId);
     
},[])

  const GetStudyMaterial=async()=>{
           
    const result = await axios.post('/api/study-type',{     
            courseId:courseId,
            studyType:'ALL'
    })
    console.log(result.data);
    
    
    setStudyTypeContent1(result.data)
    studyTypeContent=studyTypeContent1;
    
    
}

  const GenerateContent=async(typ)=>{
   setLoading(true)
    
     let chapters = ''
     const result1 = await axios.get(`/api/courses?courseId=${courseId}`);
     
     
     setCourse(result1.data.result);
     
      
     result1.data.result?.courseLayout?.courseList?.forEach((chapter)=>{
            chapters = chapter.chapterName+', '+chapters
     })
     console.log(chapters);
     console.log(typ);
     
    const result = await axios.post('/api/study-type-content',{
             courseId:courseId,
             type:typ,
             chapters:chapters
    })
    console.log(result);
    
    setLoading(false)
    GetStudyMaterial()
    window.location.reload();
    
     
  }
  return (
    <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center h-full w-full
       ${studyTypeContent?.[item.type]?.length==null && 'grayscale'}
    `}>
        {studyTypeContent?.[item.type]?.length==null ? <h2 className='p-1 px-2 bg-gray-500 text-white mb-2 rounded-full text-[10px]'>Generate</h2>
        :<h2 className='p-1 px-2 bg-green-500 text-white mb-2 rounded-full text-[10px]'>Ready</h2>}
      <Image src={item.icon} alt={item.name} width={50} height={50} />
      <h2 className='mt-3 font-medium'>{item.name}</h2>
      <p className='text-gray-400 text-sm text-center'>{item.desc}</p>

      {studyTypeContent?.[item.type]?.length==null?
      <Button className='mt-3 w-full' onClick={()=>GenerateContent(item.type)} variant={'outline'}  >{loading && <RefreshCcw className='animate-spin'  />}  Generate</Button>
      :<Button className='mt-3 w-full' variant={'outline'} >View</Button>}
    </div>
  )
}

export default MaterialCardItem

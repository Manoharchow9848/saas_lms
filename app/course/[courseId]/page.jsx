"use client"
import DashBoardHeader from '@/app/dashboard/_components/DashBoardHeader';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CourseCardHeader from './_component/CourseCardHeader';
import StudyMaterialSection from './_component/StudyMaterialSection';
import ChapterList from './_component/ChapterList';

function page() {
     const {courseId} = useParams();
     const [course,setCourse] = useState([]);
     useEffect(() => {
         GetCourse();
     },[]);
     const GetCourse=async()=>{
         const result = await axios.get(`/api/courses?courseId=${courseId}`);
         
        
         
        setCourse(result.data.result);
       
        
         
     }
  return (
    <div>
     
      <div className=''>
      {/*  Course Intro */}
       <CourseCardHeader course={course} />
       {/*  Study Material Options */}
     <StudyMaterialSection courseId={courseId} course={course} />

       {/*  Chapter list */}

       <ChapterList course={course} />
       </div>
      
    </div>
  )
}

export default page

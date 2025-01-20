import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import axios from 'axios';
import Link from 'next/link';







function StudyMaterialSection({courseId,course}) {
    const [studyTypeContent,setStudyTypeContent] = useState([]);
    const MaterialList=[
        {
            name:'Notes/Chapters',
            desc:'Read Notes to Understand the topic',
            icon:'/notes.jpg',
            path:'/notes',
            type:'notes'
        },
        {
            name:'Flashcard',
            desc:'Flashcard to Understand the topic',
            icon:'/flash.jpg',
            path:'/flashcard',
             type:'flashcard'
        },
        {
            name:'Quiz',
            desc:'Great way to test your knowledge',
            icon:'/quiz.jpg',
            path:'/quiz',
             type:'quiz'
        },
        {
            name:'Questions/Answer',
            desc:'Help to prepare for exams',
            icon:'/qa.jpg',
            path:'/qa',
             type:'qa'
        },
    ]
    
   

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
        
        
        setStudyTypeContent(result.data)
        
    }
    
    
    
    
   
  return (
    <div className='mt-5'>
       <h2 className='font-medium text-xl '>Study Material</h2> 
       <div className='grid grid-cols-2 md:grid-cols-4  gap-5 mt-3'>
        {
            MaterialList.map((item,index)=>(
            <div key={index} >
               
              <MaterialCardItem item={item} key={index}
                  studyTypeContent={studyTypeContent}
              />
           
            </div>
           ))}
       </div>
       



    </div>
  )
}

export default StudyMaterialSection

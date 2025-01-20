import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import React from 'react'

function CourseCardHeader({course}) {
  return (
    <div className='flex gap-5 items-center p-5 border shadow-md rounded'>
      <Image src={'/course.jpg'} width={100} height={100} alt={'course'}  />
      <div>
        <h2 className='font-bold text-2xl'>{course?.courseLayout?.courseName}</h2>
        <p className='font-serif mt-2'>{course?.courseLayout?.courseDescription}</p>
        <Progress className='mt-3' value={10} />

        <h2 className='mt-5 font-mono text-lg text-primary'>Total Chapters: {course?.courseLayout?.courseList?.length}</h2>
      </div>
    </div>
  )
}

export default CourseCardHeader

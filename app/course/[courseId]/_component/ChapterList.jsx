import React from 'react'

function ChapterList({course}) {
    const Chapters = course?.courseLayout?.courseList;
    
    
  return (
    <div className='mt-5'>
      <h2 className='font-medium text-xl'>Chapter List</h2>
     <div className='mt-3'>
        {
            Chapters?.map((chapter,index)=>(
            <div className='flec gap-5 it p-4 border shadow-md mb-2 rounded' key={index}>
                
                  <div>
                    <h2 className='font-medium text-lg'>📚 {chapter?.chapterName}</h2>
                    <p className='text-gray-500 text-sm'>{chapter?.summary}</p>
                  </div>

            </div>
        ))}
     </div>
    </div>
  )
}

export default ChapterList

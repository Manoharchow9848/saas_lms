"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function SelectOption({selectedStudyType}) {
    const Options = [
        {
            name:'Exam',
            icon:'/exam.png'
        },
        {
            name:'Job Interview',
            icon:'/job.jpg'
        },
        {
            name:'Practise',
            icon:'/practise.jpg'
        },
        {
            name:'Coding Prep',
            icon:'/coding.jpg'
        },
        {
            name:'Other',
            icon:'/other.jpg'
        },

    ]
    const [SelectOption, setSelectOption] = useState(null);

  return (
   <div>
    <h2 className='text-center mb-2 text-lg '>For Which You Want to Create Tour Personal Study Material</h2>
   <div className='grid grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-5 gap-5'>
    {Options.map((option,index) =>(
       <div key={index} className={`p-4 flex flex-col items-center justify-center 
      border rounded-xxl hover:border-b-slate-950  cursor-pointer ${SelectOption === option?.name ? 'border-b-slate-950' : ''}`}
          onClick={() => {setSelectOption(option.name); selectedStudyType(option.name)}}
          >
        <Image src={option.icon} alt={option.name} width={50} height={50} /><br/>
        <h2 className='text-sm'>{option.name}</h2>
       </div> 
    ))}
   </div>
    </div>
  )
}

export default SelectOption

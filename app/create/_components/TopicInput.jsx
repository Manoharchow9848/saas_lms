import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
function TopicInput({setTopic,setDifiicultyLevel}) {
  return (
    <div className='mt-10 w-full flex flex-col'>
      <h2 className='mt-5 mb-3'>Enter topic or paster the content for which you want to generate study material</h2>
      <Textarea placeholder='Start writing your topic to generate study material' className='mt-2 w-full'
      onChange={(event)=>setTopic(event.target.value)}
      />
      <h2 className='mt-5 mb-3'>Select the difficulty level</h2>
      <Select onValueChange={(value)=>setDifiicultyLevel(value)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select Level" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="easy">Easy</SelectItem>
    <SelectItem value="moderate">Moderate</SelectItem>
    <SelectItem value="hard">Hard</SelectItem>
  </SelectContent>
</Select>


    </div>
  )
}

export default TopicInput

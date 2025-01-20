import React from 'react'
import DashBoardHeader from '../dashboard/_components/DashBoardHeader'

function CourseViewLayout({children}) {
  return (
    <div>
         <DashBoardHeader />
        <div className='mx-10 md:mx-36  lg:px-60 mt-10'>
      {children}
      </div>
    </div>
  )
}

export default CourseViewLayout

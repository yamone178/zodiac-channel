import React from 'react'
import TopExpert from './TopExpert'
import { GoArrowRight } from 'react-icons/go'



const ExpertRecommend = () => {
  return (
    <div className="py-8 w-[280px] bg-white border  rounded-lg px-[30px] h-auto sticky top-[105px]">
       <div className="mb-5">
          <h2 className=''>Top Experts</h2>
       </div>

       <div className="">
          <TopExpert />
          <TopExpert />
          <TopExpert />
          <TopExpert />
       </div>

       <p className='flex items-center gap-3 mt-5'>View all suggestions 
          <GoArrowRight />
       </p>
    </div>
  )
}

export default ExpertRecommend

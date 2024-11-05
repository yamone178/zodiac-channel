import React from 'react'
import testImg from '../../../public/assets/images/test.jpg'
import { GoPlus } from "react-icons/go";

const TopExpert = () => {
  return (
    <div className="flex items-center gap-3 mt-5">
    <div className=" w-[50px] h-[50px] ">
        <img src={testImg} alt="" className='object-cover w-full h-full rounded-full' />
    </div>

    <div className="">
        <p className=' text-[16px] font-semibold'>Wai Yan Maung</p>
        <p className=' text-[14px] flex items-center gap-1 text-gray-600'>
            astrologer
        </p>

        <button className='flex items-center border hover:bg-main-900 hover:text-white gap-3 px-3 py-1 mt-2 text-[12px] rounded-md  border-main-bright text-main-bright'>Follow  <GoPlus />
        </button>
        
    </div>
    
</div>
  )
}

export default TopExpert

import React from 'react'
import { Link } from '@inertiajs/react';

const TopExpert = ({expert}) => {
  return (
    <div className="flex items-center gap-3 mt-5">
    <div className=" w-[50px] h-[50px] ">
        <img src={expert.profile_picture_url} alt="" className='object-cover w-full h-full rounded-full' />
    </div>

    <div className="">
        <p className=' text-[16px] font-semibold'>{expert.account.name}</p>
        <p className=' text-[14px] flex items-center gap-1 text-gray-600'>
            {expert.expertise}
        </p>

        <Link href={route('account.view', expert.account.id)} className='flex items-center border hover:bg-main-900 hover:text-white gap-3 px-3 py-1 mt-2 text-[12px] rounded-md  border-main-bright text-main-bright'>View Profile
        </Link>
        
    </div>
    
</div>
  )
}

export default TopExpert

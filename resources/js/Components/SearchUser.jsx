import React, { useEffect, useState } from 'react'
import profile from '../../../public/assets/images/profile-image.jpg'
import { Link } from '@inertiajs/react'
import { GoTrash } from 'react-icons/go'


const SearchUser = ({user}) => {

        const [pf, setPf] = useState()
    
     useEffect(()=>{
           
        const profilePicture =
        user.role === 'user'
          ? user.normal_user?.profile_picture ? user.normal_user?.profile_picture_url : profile
          : user.expert?.profile_picture ? user.expert?.profile_picture_url : profile
  
      setPf(profilePicture);
    
     }, [user])
  return (
    <div className='flex items-center gap-3 px-4 py-2 bg-white rounded-lg shadow-md '>
        

        <Link
        href={route('account.view', user.id)}
        className=" w-[40px] h-[40px] ">
            <img src={pf} className='object-cover w-full h-full rounded-full' alt="" />
        </Link>
            <Link
            href={route('account.view', user.id)}
            className='font-bold '>{user.name}</Link>     
     
     
       <div className=" ml-auto mr-[0px]">
            <Link
                    href={route('home')}
                    className='font-bold '>
                        <GoTrash className='text-main-bright text-bold'/>
                </Link>   
    
       </div>
    
</div>
  )
}

export default SearchUser

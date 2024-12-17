import React, { useEffect, useRef, useState } from 'react'
import testImg from '../../../public/assets/images/test.jpg'
import { TbZodiacLeo } from "react-icons/tb";
import { FiPlusCircle } from "react-icons/fi";
import BtnConnections from './BtnConnections';
import { useOutsideClick } from '@/hooks/useOutsideClick';
// import { LiaEdit } from "react-icons/lia";
import { AiTwotoneEdit } from "react-icons/ai";

import profile from '../../../public/assets/images/profile-image.jpg'
import ImageCard from './ImageCard';
import { usePage } from '@inertiajs/react';



const SideCard = ({user, zodiac, showModal, showUpdateForm}) => {

  console.log(user);

  const [pf, setPf] = useState(profile)

  const {auth} = usePage().props

  
  useEffect(() => {

    const profilePicture =
      user.role === 'user'
        ? user.normal_user?.profile_picture ? user.normal_user?.profile_picture_url : profile
        : user.expert?.profile_picture ? user.expert?.profile_picture_url : profile

    setPf(profilePicture);
  }, );
  
  
  const clickRef = useRef()
  
 
  return (
    <div ref={clickRef} className="py-8 w-[280px] bg-white border  rounded-lg flex sticky top-[105px] justify-center">
         <div className=""> 
          <ImageCard className="mx-auto"
           pf={pf} showUpdateForm={showUpdateForm}/>
       
        {
          pf == profile &&
            <>
              <div 
              onClick={showUpdateForm}
              className="font-semibold text-red-700 rounded-lg cursor-pointer ">
                 Please Update Your Profile !
            </div>
            </>

            
        
        }
        <p className='text-center text-[20px] mt-1 font-semibold'>{user.name
          }</p>
        <p className='flex items-center justify-center mt-1 font-bold text-main-bright'>
            <TbZodiacLeo fontSize="18px"/>
            <p className=' text-[18px]   '>{zodiac}</p>
        </p>

       
        
        <div className="flex items-center gap-4 my-3 ">
            <FiPlusCircle className=' text-[35px] text-main-900'/>
            <p onClick={()=>showModal()}
            className=' px-[30px] py-[8px] bg-main-900 text-white rounded-lg cursor-pointer'>Create a post</p>
        </div>

         <hr className='h-[2px] bg-gray-500' />
            <BtnConnections><p>Your Experts</p> <p className=' text-main-bright'>{auth.user.followers.length}</p></BtnConnections>
            <BtnConnections><p>Your Follower Mates</p > <p className=' text-main-bright'>{auth.user.followers.length}</p></BtnConnections>
            <BtnConnections><p>Your Following Mates</p> <p className=' text-main-bright'>{auth.user.followings.length}</p></BtnConnections>
        

    </div>
    </div>
  )
}

export default SideCard
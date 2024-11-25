import React, { useEffect, useRef, useState } from 'react'
import testImg from '../../../public/assets/images/test.jpg'
import { TbZodiacLeo } from "react-icons/tb";
import { FiPlusCircle } from "react-icons/fi";
import BtnConnections from './BtnConnections';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import profile from '../../../public/assets/images/profile-image.jpg'



const SideCard = ({user, zodiac, showModal}) => {

  console.log(user.expert);

  

  
  const profile_picture = user.expert ? user.expert.profile_picture_url : profile
  
  const clickRef = useRef()
  
 
  return (
    <div ref={clickRef} className="py-8 w-[280px] bg-white border  rounded-lg flex sticky top-[105px] justify-center">
         <div className=""> 
        <div className=" w-[100px] h-[100px]  mx-auto  ">
            <img src={profile_picture} alt="" className='object-cover w-full h-full rounded-full '/>
        </div>
        {
          user.normalUser == null  && user.expert == null &&
            <>
              <div className="font-semibold text-red-700 rounded-lg cursor-pointer ">
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
            <BtnConnections><p>Your Experts</p> <p className=' text-main-bright'>50</p></BtnConnections>
            <BtnConnections><p>Your Follower Mates</p > <p className=' text-main-bright'>50</p></BtnConnections>
            <BtnConnections><p>Your Following Mates</p> <p className=' text-main-bright'>50</p></BtnConnections>
        

    </div>
    </div>
  )
}

export default SideCard
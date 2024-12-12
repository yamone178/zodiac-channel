import React, { useEffect, useState } from 'react'
import profile from '../../../../public/assets/images/profile-image.jpg'
import ImageCard from '@/Components/ImageCard';
import { BiEdit } from "react-icons/bi";
import FriendCountCard from '@/Components/FriendCountCard';



const AccountCard = ({user}) => {


    const [pf, setPf] = useState(profile)

    const account = user.role == 'user'? user.normal_user : user.expert

  
  useEffect(() => {

    const profilePicture =
      user.role === 'user'
        ? user.normal_user?.profile_picture ? user.normal_user?.profile_picture_url : profile
        : user.expert?.profile_picture ? user.expert?.profile_picture_url : profile

    setPf(profilePicture);
  }, );

  return (
    <>
   <div className="w-[800px] mx-auto  bg-main-900  rounded-2xl p-[30px]  ">
        <div className="flex items-center justify-center gap-6">
            <ImageCard imgClass="border-2 border-main-bg" pf={pf}/>

            <div className="text-white ">
                <h4 className=' text-[20px] font-semibold'>{user.name}</h4>
                <h4 className=' text-[15px] text-white/70 '>{user.email}</h4>
                {
                  account?.expertise && 
                  <h4 className=' text-[15px] text-white/70 '>expertise - {account.expertise}</h4>

                }
                <h4 className=' text-[15px] text-white/90 '>{account.bio}</h4>               
            </div>

            <div className="">
                <BiEdit className='text-white text-[30px]' />

            </div>
        </div>
{/* 
        <hr className=' text-gray-50 w-[500px] mx-auto my-5' /> */}

        <div className="flex justify-center gap-8 mt-4 text-main-900 ">
             <FriendCountCard title="Posts" count="8" />
            <FriendCountCard title="Followers" count="77" />
            <FriendCountCard title="Followings" count="100" />
        </div>
   </div>

  

   </>
  )
}

export default AccountCard

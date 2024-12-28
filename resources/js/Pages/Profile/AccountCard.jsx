import React, { useEffect, useState } from 'react'
import profile from '../../../../public/assets/images/profile-image.jpg'
import ImageCard from '@/Components/ImageCard';
import { BiEdit } from "react-icons/bi";
import FriendCountCard from '@/Components/FriendCountCard';
import { useForm, usePage } from '@inertiajs/react';
import { redirect } from 'react-router';



const AccountCard = ({follow, user, postCount, setShowEditProfile}) => {

 const {data, setData, processing, errors, post} = useForm({
        'following_id': null
   })
    
  const pathName = window.location.pathname

    const [pf, setPf] = useState(profile)
    const [following, setFollowing] = useState(follow)

    const {auth} = usePage().props

    console.log(auth.user.id);
    

    const account = user.role == 'user'? user.normal_user : user.expert

    const followerCount = user.followers.length
    const followingCount = user.followings.length

    const submit = (e, id) =>{
      e.preventDefault();

      // setData('following_id', id)

       setFollowing(true)

      post(route('zodiac-mates.follow', id))
  }

  const unfollow = (e, id) =>{
      e.preventDefault();

      // setData('following_id', id)

       setFollowing(false)

      post(route('zodiac-mates.unfollow', id))
  }

  
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

            <div className=" cursor-pointer">
                <BiEdit
                onClick={()=>setShowEditProfile(true)}
                className='text-white text-[30px]' />

            </div>
        </div>
      {
        pathName == `/view-profile/${user.id}` &&

        <div className="w-[350px] h-[35px] m-auto mt-4   ">
        <button 
        onClick={following ? (e)=>unfollow(e,user.id) : (e)=>submit(e,user.id)}
        className='w-full h-full rounded-md bg-main-bg'>{
              following ? 'Unfollow' : 'Follow'
            }</button>
      </div>
      }
       
{/* 
        <hr className=' text-gray-50 w-[500px] mx-auto my-5' /> */}

        <div className="flex justify-center gap-8 mt-4 text-main-900 ">
             <FriendCountCard title="Posts" count={postCount} />
            <FriendCountCard title="Followers" count={followerCount} />
            <FriendCountCard title="Followings" count={followingCount} />
        </div>
   </div>

  

   </>
  )
}

export default AccountCard

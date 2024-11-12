import React, { useEffect, useState } from 'react'
import testImg from '../../../../public/assets/images/test.jpg'
import { GoPlus } from "react-icons/go";
import { useForm, usePage } from '@inertiajs/react';



const SuggestCard = ({mate}) => {

    const {data, setData, processing, errors, post} = useForm({
        'following_id': null
    })

    const { followings ,auth, zodiacs , added} = usePage().props;

    const [follow, setFollow] = useState() 

   

    console.log(added)

    useEffect(()=>{
    
       const friends = followings.followings

       const isAlreadyFollowing = followings.followings.some(friend => friend.id === mate.id);

       setFollow(isAlreadyFollowing)
        console.log(isAlreadyFollowing);
        
    },[followings])

    
    
    // friends.map((fri)=> )

  
 
   

    

    const submit = (e, id) =>{
        e.preventDefault();

        setData('following_id', id)

        setFollow(!follow)

        post(route('zodiac-mates.follow', id))
    }

    const unfollow = (e, id) =>{
        e.preventDefault();

        setData('following_id', id)

        setFollow(!follow)

        post(route('zodiac-mates.unfollow', id))
    }
    
  return (
    <div className='flex items-center gap-3 p-5 border rounded-lg bg-main-bg border-main-bright'>
        <div className=" w-[60px] h-[60px] ">
            <img src={testImg} className='object-cover w-full h-full rounded-full' alt="" />
        </div>

        <div className="">
            <h2 className='font-bold '>{mate.name}</h2>
            <p className='text-sm text-gray-600'>{mate.zodiac.name}</p>

          
            
         <button 
            onClick={(e)=>submit(e,mate.id)}
            className='flex h-[30px] items-center border hover:bg-main-900 hover:text-white gap-3 px-3 py-1 mt-2 text-[12px] rounded-md  border-main-bright text-main-bright'>
            {follow ? 'Unfollow': 'follow'} <GoPlus />
        </button>
        </div>

        
    </div>
  )
}

export default SuggestCard

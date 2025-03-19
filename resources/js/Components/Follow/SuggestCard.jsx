import React, { useEffect, useState } from 'react'
import testImg from '../../../../public/assets/images/test.jpg'
import { GoPlus } from "react-icons/go";
import { Link, useForm, usePage } from '@inertiajs/react';
import profile from '../../../../public/assets/images/profile-image.jpg'

const SuggestCard = ({ mate }) => {

  const { data, setData, processing, errors, post } = useForm({
    'following_id': null
  })

  const { matesExperts, auth, zodiacs, added } = usePage().props;

  const [follow, setFollow] = useState()
  const [pf, setPf] = useState()

  useEffect(() => {
    const isAlreadyFollowing = matesExperts?.followings?.some(friend => friend.id === mate.id);

    setFollow(isAlreadyFollowing)

    const profilePicture =
      mate.role === 'user'
        ? mate.normal_user?.profile_picture ? mate.normal_user?.profile_picture : profile
        : mate.expert?.profile_picture ? mate.expert?.profile_picture : profile

    setPf(profilePicture);

  }, [matesExperts, mate])


  const submit = (e, id) => {
    e.preventDefault();

    setData('following_id', id)

    setFollow(!follow)

    post(route('zodiac-mates.follow', id))
  }

  const unfollow = (e, id) => {
    e.preventDefault();

    setData('following_id', id)

    setFollow(!follow)

    post(route('zodiac-mates.unfollow', id))
  }

  return (
    <div className='flex items-center gap-3 p-2 border rounded-lg md:p-5 bg-main-bg border-main-bright'>
      <Link
        href={route('account.view', mate.id)}
        className=" w-[50px] h-[50px] md:w-[60px] md:h-[60px] ">
        <img src={pf} className='object-cover w-full h-full rounded-full' alt="" />
      </Link>

      <div className="">
        <Link
          href={route('account.view', mate.id)}
          className='font-bold '>{mate.name}</Link>
        <p className='text-sm text-gray-600'>{mate.zodiac?.name}</p>



        <button
          onClick={follow ? (e) => unfollow(e, mate.id) : (e) => submit(e, mate.id)}
          className='flex h-[30px] items-center border hover:bg-main-900 hover:text-white gap-3 px-3 py-1 mt-2 text-[12px] rounded-md  border-main-bright text-main-bright'>
          {follow ? 'Unfollow' : 'follow'} <GoPlus />
        </button>
      </div>


    </div>
  )
}

export default SuggestCard

import Search from '@/Components/Search'
import FollowLayout from '@/Layouts/FollowLayout'
import React, { useEffect, useState } from 'react'
import SuggestCard from '@/Components/Follow/SuggestCard'
import { Link, usePage } from '@inertiajs/react'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'

const ViewYourZodiacMates = ({ followers, followings }) => {

  console.log(followers, followings);

  const { matesExperts } = usePage().props;

  const [mates, setMates] = useState()

  const [showFollowings, setShowFollowings] = useState(true)

  useEffect(() => {
    setMates(followings)
  }, [])


  const handleShowFollowings = (friends, status) => {
    setShowFollowings(status)
    setMates(friends)
  }


  return (
    <FollowLayout>
      <div className="p-10">

        <div className="flex items-center gap-2 mt-6 cursor-pointer">

          <Link href={route('zodiac-mate')} > <GoArrowLeft className='float-right ' /> </Link>
          <Link href={route('zodiac-mate')} >See Suggested Zodiac Mates </Link>

        </div>

        <div className="flex gap-3 mt-5">
          <button
            className={` ${showFollowings ? 'bg-main-bright/90 text-white' : 'bg-main-bright/10'} px-4 py-1 rounded-md `}
            onClick={() => handleShowFollowings(followings, true)}>Followings</button>
          <button
            className={` ${!showFollowings ? 'bg-main-bright/90 text-white' : 'bg-main-bright/10'} px-4 py-1 rounded-md `}
            onClick={() => handleShowFollowings(followers, false)}>Followers</button>

        </div>

        <div className="grid gap-4 mt-6 md:grid-cols-3">

          {
            mates && mates.map((mate) => <SuggestCard key={mate.id} mate={mate} />)
          }


        </div>
      </div>
    </FollowLayout>
  )
}


export default ViewYourZodiacMates

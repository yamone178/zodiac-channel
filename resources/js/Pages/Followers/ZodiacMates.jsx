import Search from '@/Components/Search'
import FollowLayout from '@/Layouts/FollowLayout'
import React, { useEffect, useState } from 'react'
import SuggestCard from '@/Components/Follow/SuggestCard'
import { Link } from '@inertiajs/react'
import { GoArrowRight } from 'react-icons/go'
import NoAccount from './NoAccount'

const ZodiacMates = ({ friends }) => {



  const [mates, setMates] = useState()

  useEffect(() => {
    setMates(friends)
  }, [])


  return (
    <FollowLayout>
      <div className="p-5 md:p-10">

        <div className="flex items-center gap-2 mt-6 cursor-pointer">
          <Link href={route('your-zodiac-mates')} >See Your Zodiac Mates </Link>
          <Link href={route('your-zodiac-mates')} ><GoArrowRight className='float-right ' /> </Link>

        </div>

        {
          mates?.length > 0 ?
            <div className="grid gap-4 mt-6 md:grid-cols-3">

              {
                mates.map((mate) => <SuggestCard key={mate.id} mate={mate} />)

              }


            </div>
            :
            <NoAccount />
        }
      </div>
    </FollowLayout>
  )
}

export default ZodiacMates

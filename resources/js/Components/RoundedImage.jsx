import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import profile from '../../../public/assets/images/profile-image.jpg'


const RoundedImage = ({className, pf, id}) => {
    
   

  return (
    <Link  href={route('account.view',id)} className={`${className} inline-block  `}>
            <img src={pf} className='object-cover w-full h-full border-2 rounded-full ' alt="" />
    </Link>
  )
}

export default RoundedImage

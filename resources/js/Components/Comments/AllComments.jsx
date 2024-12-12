import React, { useEffect, useState } from 'react'
import testImg from '../../../../public/assets/images/test.jpg'
import profile from '../../../../public/assets/images/profile-image.jpg'


const AllComments = ({ comment }) => {

  const [pf, setPf] = useState(profile)

  const user = comment.account


  useEffect(() => {
  
    const profilePicture =
      user.role === 'user'
        ? user.normal_user?.profile_picture ? user.normal_user?.profile_picture : profile
        : user.expert?.profile_picture ? user.expert?.profile_picture : profile

    setPf(profilePicture);
  }, [comment]);
  
  return (
    <div className='flex flex-col gap-2 my-5 '>

     <div key={comment.id} className="flex border border-main-bright items-center gap-5 bg-white py-[13px] px-[20px] rounded-lg">
        <div  className="w-[40px]  h-[40px] border ">
          <img src={pf} alt="" className='object-cover w-full h-full rounded-full' />
        </div>

        <div className="">
          <p className='font-bold text-main-900 '>{comment.account.name}</p>
          <p>{comment.comment}</p>
        </div>
        
      </div>
         

    </div>
  )
}

export default AllComments

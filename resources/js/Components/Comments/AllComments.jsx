import React from 'react'
import testImg from '../../../../public/assets/images/test.jpg'

const AllComments = ({ comments }) => {
  return (
    <div className='flex flex-col gap-2 mt-5'>

      {
        comments.map((com)=>  <div key={com.id} className="flex border border-main-bright items-center gap-5 bg-white py-[13px] px-[20px] rounded-lg">
        <div  className="w-[40px]  h-[40px] border ">
          <img src={testImg} alt="" className='object-cover w-full h-full rounded-full' />
        </div>

        <div className="">
          <p className='font-bold text-main-900 '>{com.account.name}</p>
          <p>{com.comment}</p>
        </div>
        
      </div>
       )
      }

     

    </div>
  )
}

export default AllComments

import React from 'react'

const FriendCountCard = ({title, count}) => {
  return (
    <div className=' w-[120px] text-white  text-center   rounded-xl cursor-pointer '>
        <h4 className=" text-[20px] font-bold mt-1">{count}</h4>
        <h3 className=" text-[18px]  ">{title}</h3>
      
    </div>
  )
}

export default FriendCountCard

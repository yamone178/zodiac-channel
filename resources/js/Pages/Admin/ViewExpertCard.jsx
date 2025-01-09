import React, { useRef } from 'react'

const ViewExpertCard = ({expert, clickRef}) => {


  return (
    <div  className=" fixed h-screen top-0 left-0  z-10 bg-[#8080807d]/10 w-[100%]">
        <div ref={clickRef} className='bg-white h-min top-0 bottom-0 m-auto left-0 inline-block right-0 w-[500px] p-[30px] absolute border-2 shadow-md rounded-xl'>

            <div className=" w-[100px] h-[100px] mx-auto mb-2">
                <img className='object-cover w-full h-full border-2 rounded-full border-main-900 ' src={expert.profile_picture} alt="" />
            </div>

            <div className="mb-4">
                <h2 className='text-lg font-bold text-center'>{expert.account.name}</h2>
                <p className='text-sm text-center text-gray-500'>{expert.account.email}</p>
            </div>

            <div className="flex flex-col gap-2">
                <p className='text-center text-main-900'>Expertise -   {expert.expertise}</p>
                <p className='text-center text-main-900'>DOB - {expert.dob}</p>
                <p className='text-justify whitespace-pre-wrap'>About - { expert.about_me}</p>
            </div>

        </div>
    </div>
  )
}

export default ViewExpertCard

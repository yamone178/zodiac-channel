import React, { useRef, useState } from 'react'


import testImg from '../../../../public/assets/images/test.jpg'
import { TbZodiacTaurus } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoStar } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { Link, usePage } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';

const Show = ({post}) => {
   
    const {zodiacs} = usePage().props;
    
    return (
     
        <HomeLayout>
            <div className=' p-[35px] w-[550px]  bg-gray-200 rounded-lg cursor-pointer'>
                <div className="flex items-center justify-between post-header">
                    <div className="flex items-center gap-3 ">
                        <div className=" w-[41px] h-[41px] ">
                        <img src={testImg} alt="" className='object-cover w-full h-full rounded-full' />
                            
                        </div>

                        <div className="">
                            <p className=' text-[16px] font-semibold'>{post.account.name}</p>
                            <p className=' text-[14px] flex items-center gap-1 text-gray-600'>
                                    {/* <TbZodiacTaurus /> */}
                                    {zodiacs.find((zodiac) => zodiac.id === post.account.zodiac_id)?.name || ''}  
                                
                            </p>
                        </div>
                    </div>

                    <div className="">
                        <BsThreeDotsVertical fontSize="22px" />

                    </div>

                    
                </div>

                <div className="post-content mt-[20px]">
                    <div className=" w-full h-[250px] flex gap-1">
                            {
                           post.images.map((img,index)=> <div key={index} className="w-full  h-[250px]">
                                <img src={img} alt="" className='object-cover w-full h-full rounded-lg' />
                                </div>
                                )
                            }
                        
                    </div>

                    <div className="flex gap-4 mx-3 mt-3">
                        <GoStar className=' text-[27px]' />
                        <GoComment className=' text-[27px]'/>
                    </div>

                    <p className='mt-3 text-justify text-black/75'>
                        {post.caption}
                        <span className='text-black '> See More.....</span>
                    </p> 

                    
                </div>



                </div>

            </HomeLayout>
   
    );
}

export default Show

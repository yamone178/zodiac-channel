import React from 'react'
import testImg from '../../../../public/assets/images/test.jpg'
import { TbZodiacTaurus } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoStar } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { Link } from '@inertiajs/react';





const Post = ({post, zodiacs}) => {

 
   
   const findUserZodiac = () => {
        const findZodiac = zodiacs.filter((zodiac)=> zodiac.id == post.account.zodiac_id)

        
        return findZodiac.name
   }

   

  return (
    <Link href={route('post.show',post.id)} className=' p-[35px] w-[550px]  bg-white border rounded-lg cursor-pointer'>
        <div className="flex items-center justify-between post-header">
            <div className="flex items-center gap-3 ">
                <div className=" w-[41px] h-[41px] ">
                <img src={testImg} alt="" className='object-cover w-full h-full rounded-full' />
                  
                </div>

                <div className="">
                    <p className=' text-[16px] font-semibold '>{post.account.name}</p>
                    <p className=' text-[14px] flex items-center gap-1 text-main-bright font-semibold'>
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

            <div className="flex gap-8 mx-3 mt-3">
                <button className='flex items-center ' variant="ghost" size="sm">
                  <GoStar className="w-6 h-6 mr-2" />
                  <span className=' text-[16px]'>Like</span> 
                </button>
                {/* <div className="">
                   <GoStar className=' text-[27px]' />
                </div> */}
                <div className="">
                    <button className='flex items-center ' variant="ghost" size="sm">
                        <GoComment className="w-6 h-6 mr-2"/>
                        <span className=' text-[16px]'>Comment</span> 
                    </button>
                     
                </div>
            </div>

            <p className='mt-3 text-justify text-black/75'>
                {post.caption}
                <span className='text-black '> See More.....</span>
            </p> 

           
        </div>

        
        
    </Link>
  )
}

export default Post
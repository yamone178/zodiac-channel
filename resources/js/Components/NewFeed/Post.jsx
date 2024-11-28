import React, { useEffect, useRef, useState } from 'react'
import testImg from '../../../../public/assets/images/test.jpg'
import { TbZodiacTaurus } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoStar, GoStarFill  } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { Link, useForm, usePage } from '@inertiajs/react';
 import { router } from '@inertiajs/react'
import CommentBox from '../Comments/CommentBox';
import { useOutsideClick } from '@/hooks/useOutsideClick';






const Post = (props) => {

    const zodiacs = props.zodiacs
    const singlePost = props.post

    const {data, setData, post, processing, errors } = useForm({
               
    })

    const {auth} = usePage().props

    // const [like, setLike] = useState(false)
    const [likeCount , setLikeCount] = useState(0)
    const [showCommentBox, setShowCommentBox] = useState(false)
    const clickRef = useRef()


    console.log(singlePost);

    // useEffect(()=>{
        
        console.log(auth);
        
        
        const isLiked = singlePost.likes.some(li => li.account_id === auth.user.id && li.post_id === singlePost.id);

    //         setLike(isLiked)
    // },[singlePost])

    // useEffect(()=>{
    //     console.log(singlePost.likes.length)
    // }, [singlePost.likes])
    

   
   const findUserZodiac = () => {
        const findZodiac = zodiacs.filter((zodiac)=> zodiac.id == post.account.zodiac_id)

        
        return findZodiac.name
   }

   const toggleLike =  (postId) =>{   

        // setLike(isLiked)
        
        post(`post/${postId}/like`, 
            { preserveScroll: true })

            console.log(like);
            
   }    

    useOutsideClick(clickRef, ()=>setShowCommentBox(false))


//   useEffect(()=>{
//   }, showCommentBox)
   
 

  return (
    <div
    //  href={route('post.show',post.id)} 
     className=' p-[35px] w-[550px]  bg-white border rounded-lg '>
        <div className="flex items-center justify-between post-header">
            <div className="flex items-center gap-3 ">
                <div className=" w-[41px] h-[41px] ">
                <img src={testImg} alt="" className='object-cover w-full h-full rounded-full' />
                  
                </div>

                <div className="">
                    <p className=' text-[16px] font-semibold '>{singlePost.account.name}</p>
                    <p className=' text-[14px] flex items-center gap-1 text-main-bright font-semibold'>
                         {/* <TbZodiacTaurus /> */}
                         {zodiacs.find((zodiac) => zodiac.id === singlePost.account.zodiac_id)?.name || ''}  
                        
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
                    singlePost.images.map((img,index)=> <div key={index} className="w-full  h-[250px]">
                     <img src={img} alt="" className='object-cover w-full h-full rounded-lg' />
                     </div>
                     )
                   }
               
            </div>

            <div className="flex gap-8 mx-3 mt-3">
           
                <button onClick={()=>toggleLike(singlePost.id)}
                className='flex items-center ' variant="ghost" size="sm">
                 
                
                    {
                        isLiked ? 
                        <>
                        
                        <GoStarFill  className="w-6 h-6 mr-2 text-main-900" /> 
                        <span className=' text-[16px]'>{singlePost.likes.length}
                        </span> 
                         </>
                        
                        : 
                        <>
                        
                        <GoStar  className="w-6 h-6 mr-2" /> 
                        <span className=' text-[16px]'> {singlePost.likes.length}
                        </span> 
                        </>
                    }
                   
                </button>
                {/* <div className="">
                   <GoStar className=' text-[27px]' />
                </div> */}
                <div className="">
                    <button onClick={()=>setShowCommentBox(true)} className='flex items-center ' variant="ghost" size="sm">
                        <GoComment className="w-6 h-6 mr-2"/>
                        <span className=' text-[16px]'>Comment</span> 
                    </button>
                     
                     {
                        showCommentBox && <CommentBox setShowCommentBox={setShowCommentBox} postId={singlePost.id} clickRef={clickRef}/> 
                     }
                </div>
            </div>

            <p className='mt-3 text-justify text-black/75'>
                {singlePost.caption}
                <Link  href={route('post.show',singlePost.id)}  className='text-black '> See More.....</Link>
            </p> 

           
        </div>

        
        
    </div>
  )
}

export default Post
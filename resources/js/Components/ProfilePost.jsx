import React, { useRef, useState } from 'react'
import { GoComment, GoPencil, GoStarFill, GoTrash } from 'react-icons/go'
import { Link} from '@inertiajs/react';
import placeholder from '../../../public/assets/images/placeholder.svg'
import EditPost from '@/Pages/Post/EditPost';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { router } from '@inertiajs/react'


const ProfilePost = ({ account, post }) => {

  const [showEditForm, setShowEditForm] = useState(false)

  const delPost = () =>{
    router.delete(route('post.delete', post.id), {}, 
    {
        preserveState: true,
        preserveScroll: true,
        
    })
  }



  const clickRef = useRef()

  useOutsideClick(clickRef, ()=>setShowEditForm(false))

 

  console.log(post);
  return (
    <div
      //  href={route('post.show',post.id)} 
      className=' w-[32%]  bg-white  border    '>

      <Link href={route('post.show',post.id)} className="post-content ">
        <div className="flex w-full ">
          <div className="w-full h-[220px]">
            <img src={post.images.length > 0 ? post.images[0] : placeholder} alt="" className='object-cover w-full h-full ' />
          </div>

        </div>

        <div className=" px-[18px] pb-[10px]">




          <p className='mt-3 overflow-auto text-justify text-black/75 h-[50px]'>
            
            {post.caption}
            See More ...
            {/* <Link  href={route('post.show',post.id)}  className='text-black '> See More.....</Link> */}
          </p>




        </div>

      </Link>

      <div className="relative flex justify-between gap-8 mt-3   px-[18px] pb-[18px]">


        <div
          className='flex items-center ' variant="ghost" size="sm">


          <GoStarFill className="w-6 h-6 text-main-900" />
          <span className=' text-[16px] ml-2'>{post.likes.length}
          </span>


          <GoComment className="w-6 h-6 ml-4 text-main-900" />
          <span className=' text-[16px] ml-2'>{post.comments?.length}
          </span>



        </div>

        <div
          className='flex items-center gap-2 ' variant="ghost" size="sm">


          <GoPencil
          onClick={()=>setShowEditForm(true)}
           className="w-8 h-6 p-1 text-white rounded-md bg-main-900" />

          <GoTrash
          onClick={delPost}
           className="w-8 h-6 p-1 text-white rounded-md bg-main-900" />

        </div>

        {
          showEditForm && <EditPost singlePost={post} clickRef={clickRef}  setShowEditForm={setShowEditForm}/>
        }





      </div>

      {/*         
        Link href={route('post.show',post.id)} */}
    </div>
  )
}

export default ProfilePost

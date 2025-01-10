import React, { useEffect, useRef, useState } from 'react'
import testImg from '../../../../public/assets/images/test.jpg'
import profile from '../../../../public/assets/images/profile-image.jpg'
import { router, usePage } from '@inertiajs/react'
import { GoPencil, GoTrash } from 'react-icons/go'
import EditComment from './EditComment'
import { useOutsideClick } from '@/hooks/useOutsideClick'


const AllComments = ({ comment, account_id}) => {

    const [showEditForm, setShowEditForm] = useState(false)
  
  const [pf, setPf] = useState(profile)

  const user = comment.account

  const {auth} = usePage().props
  

  useEffect(() => {
  
    const profilePicture =
      user.role === 'user'
        ? user.normal_user?.profile_picture ? user.normal_user?.profile_picture : profile
        : user.expert?.profile_picture ? user.expert?.profile_picture : profile

    setPf(profilePicture);
  }, [comment]);
  
  const delComment = () =>{
    router.delete(route('comment.delete', comment.id), {}, 
    {
        preserveState: true,
        preserveScroll: true,
        
    })
  }


  const clickRef = useRef()

  useOutsideClick(clickRef, ()=>setShowEditForm(false))
  
  return (
    <div className='flex flex-col gap-2 my-5 '>

     <div key={comment.id} className="flex border justify-between border-main-bright items-center gap-5 bg-white py-[13px] px-[20px] rounded-lg">
        <div className="flex gap-3">
        <div  className="w-[40px]  h-[40px]">
          <img src={pf} alt="" className='object-cover w-full h-full rounded-full' />
        </div>

        <div className="">
          <p className='font-bold text-main-900 '>{comment.account.name}</p>
          <p>{comment.comment}</p>
        </div>
          </div>
        
        {
        auth.user.id == account_id &&
          <div className='flex items-center justify-end gap-2 ' variant="ghost" size="sm">
               
              <GoPencil
              onClick={()=>setShowEditForm(true)}
              className="w-8 h-6 p-1 text-white rounded-md bg-main-900" />
    
              <GoTrash
              onClick={delComment}
              className="w-8 h-6 p-1 text-white rounded-md bg-main-900" />
        
           </div>
       }


      </div>
    
    
      {
         showEditForm && <EditComment comment={comment} postId={comment.postId} clickRef={clickRef}  setShowCommentBox={setShowEditForm}/>
       }

    </div>
  )
}

export default AllComments

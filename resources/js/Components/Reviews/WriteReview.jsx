import React from 'react'
import RoundedImage from '../RoundedImage'
import {  useForm, usePage } from '@inertiajs/react'
import { GoStar, GoStarFill } from 'react-icons/go';


const WriteReview = ({expert_id, user_id} ) => {
    console.log(expert_id, user_id);
    
    // const expert_id = expert_id

    const {data, setData, post, processing, errors, reset } = useForm({
        'review_text': '',
        'rating': 0,
        'expert_id':  expert_id,
        'user_id': user_id
    })

    const rates = [1,2,3,4,5]

    const {auth} = usePage().props
    
    const pf =
        auth.user.role === 'user'
          ? auth.user.normal_user?.profile_picture_url ? auth.user.normal_user.profile_picture_url : profile
          : auth.user.expert?.profile_picture_url ? auth.user.expert?.profile_picture_url : profile

          console.log(auth);
          


    const submit = (e) =>{
        e.preventDefault()
        post(route('review.store'),{
          data: data
        
          })

        
    }
   
    

  return (
    <div className='flex w-[800px] m-auto mt-8 justify-between '>
      <RoundedImage id={auth.user.id} pf={pf} className="w-[60px] h-[60px]"  />

        <form action="" onSubmit={submit}>
            <div className="flex mb-3 space-x-1">
            {
              rates.map((rate)=> <span  key={rate}
              className="p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 rounded-sm"
              onClick={()=>setData('rating', rate)}
              >
              {
                  rate <= data.rating ? 
                <GoStarFill className='w-6 h-6 text-yellow-500 stroke-slate-950'/>
                :
                <GoStar className='w-6 h-6 '/>
              }
              </span>
             )
            }
            </div>
            <textarea type="text" value={data.review_text} 
            placeholder='Write Review'
           
            className=' w-[700px]  border-0 pb-[80px] focus:outline-none focus:ring-0 rounded-md'
            onChange={e=> setData('review_text', e.target.value)}>
             </textarea>

            <div className="mt-3">
            <button className='px-3 py-1 text-white rounded-md bg-main-900'>Submit</button>
            </div>
        </form>

    </div>
  )
}

export default WriteReview

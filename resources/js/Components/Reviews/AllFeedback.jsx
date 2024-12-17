import { usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import WriteReview from './WriteReview'
import ReviewCard from './ReviewCard'
import EditReview from './EditReview'

const AllFeedback = ({pfAccount, reviews}) => {
  console.log(pfAccount);
  
  console.log(reviews);
  
    const {auth} = usePage().props

    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [oldReview, setOldReview] = useState(null)
  return (
    <div>
      {
        route().current('account.view') && 
        <>
           {
              showUpdateForm ?
             <EditReview oldReview={oldReview} expert_id={pfAccount.expert.id} user_id={auth.user.normal_user?.id}/> :
            pfAccount.role == 'expert' &&
            <WriteReview expert_id={pfAccount.expert.id} user_id={auth.user.normal_user?.id}/>
           }
        </>
      }
          

        <div className='grid grid-cols-2 gap-3 mt-4'>
              
              {
                reviews.map((review)=> <ReviewCard setOldReview={setOldReview} setShowUpdateForm={setShowUpdateForm} key={review.id} review={review} />)
              }
                
          </div>
    </div>
  )
}

export default AllFeedback

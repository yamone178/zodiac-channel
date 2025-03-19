import React, { useState } from 'react'
import ReviewCard from './ReviewCard'
import AllFeedback from './AllFeedback'

const Reviews = ({ reviews, pfAccount, setAllReviews, AllReviews }) => {

  const [showAll, setShowAll] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between mt-8">

        {


          pfAccount.role == "expert" && <h3
            onClick={() => setAllReviews(!AllReviews)}
            className='text-xl font-bold cursor-pointer text-main-900'>

            {AllReviews ? 'Back' : 'View All Feedback'}
          </h3>}

      </div>
      {
        AllReviews ? <AllFeedback reviews={reviews} pfAccount={pfAccount} />
          :
          <div className='grid grid-cols-2 gap-3 mt-4'>

            {
              reviews[0] &&
              <ReviewCard AllReviews={AllReviews} key={reviews[0].id} review={reviews[0]} showEdit={false} />}
            {
              reviews[1] && <ReviewCard AllReviews={AllReviews} key={reviews[1].id} review={reviews[1]} showEdit={false} />
            }


          </div>
      }

    </>
  )
}

export default Reviews

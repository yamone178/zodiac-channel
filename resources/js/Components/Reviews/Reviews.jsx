import React, { useState } from 'react'
import ReviewCard from './ReviewCard'
import AllFeedback from './AllFeedback'

const Reviews = ({reviews, pfAccount, setAllReviews, AllReviews}) => {
  
  const [showAll, setShowAll] = useState(false)

  console.log(reviews);
  

  return (
   <>
    <div className="flex items-center justify-between mt-8">
    <h3
       onClick={()=>setAllReviews(!AllReviews)} 
    className='text-xl font-bold cursor-pointer text-main-900'>
   
      { AllReviews ? 'Back' : 'View All Feedback'}
    </h3>
     {/* <div className="">
            <button
             onClick={()=>setAllReviews(!AllReviews)}
             className='text-main-900 border hover:bg-main-900 hover:text-white border-main-900  px-[14px] py-1  rounded'>
              See All
           
            </button>  
    </div> */}
    </div>
    {
        AllReviews ? <AllFeedback reviews={reviews} pfAccount={pfAccount} />
        :
        <div className='grid grid-cols-2 gap-3 mt-4'>
        
            { 
              reviews[0] &&  
              <ReviewCard key={reviews[0].id} review={reviews[0]} />}
             {
              reviews[1] &&    <ReviewCard key={reviews[1].id} review={reviews[1]} />
             }
          
               
         </div>
    }
    

    {/* <div className='grid grid-cols-2 gap-3 mt-4'>
      {
        showAll ? <AllFeedback pfAccount={pfAccount} />
        :
        <>
           <ReviewCard key={reviews[0].id} review={reviews[0]} />
           <ReviewCard key={reviews[1].id} review={reviews[1]} />
        </>
      }
       
      
  
    </div> */}
   </>
  )
}

export default Reviews

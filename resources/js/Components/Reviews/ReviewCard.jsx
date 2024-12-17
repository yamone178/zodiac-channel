import { router, usePage } from '@inertiajs/react'
import React from 'react'
import RoundedImage from '../RoundedImage'
import DateFormat from '../DateFormat';
import { GoPencil, GoStar, GoStarFill, GoTrash } from 'react-icons/go';
import { toast } from 'react-toastify';


const ReviewCard = ({ review, user_id, setShowUpdateForm, setOldReview }) => {

  console.log(review);

  const rates = [1, 2, 3, 4, 5]

  const { auth } = usePage().props

  const { profile_image } = usePage().props

  const pf = review.user.profile_picture_url ? review.user.profile_picture_url : profile_image

  const Edit = () => {
    setShowUpdateForm(true)
    setOldReview(review)
  }

  const delReview = () => {
    router.delete(
      route('review.delete', review.id),
      {
        preserveState: true, // Keeps the state and scroll intact
        preserveScroll: true,
        // onSuccess: () => {
        //   toast.success('Item deleted successfully!'); // Show toast on success
        // },
        onError: () => {
          toast.error('Failed to delete the item!'); // Show toast on error
        },
      }
    );
  }


  return (
    <div className='bg-white px-[20px] py-4 border border-l-4 border-l-main-900'>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <RoundedImage id={review.user.id} pf={pf} className="w-[30px] h-[30px]" />
          <div>
            <p className='font-bold '>{review.user.account.name}</p>
            <DateFormat initialTimeStamp={review.created_at} />
          </div>
        </div>


       
          <div
            className='flex items-center gap-2 ' variant="ghost" size="sm">

            <div className="flex mb-3 space-x-1">
              {
                rates.map((rate) => <span key={rate}
                  className="p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 rounded-sm"
                 
                >
                  {
                    rate <= review.rating ?
                      <GoStarFill className='w-4 h-4 text-yellow-500 stroke-slate-950' />
                      :
                      <GoStar className='w-4 h-4 ' />
                  }
                </span>
                )
              }
            </div>

            {auth.user.normal_user?.id == review.user_id &&
            <>
            <GoPencil
              onClick={Edit}
              className="w-8 h-6 p-1 text-white rounded-md bg-main-900" />

            <GoTrash
              onClick={delReview}
              className="w-8 h-6 p-1 text-white rounded-md bg-main-900" />
              </>
              }
          </div>
      </div>
      <p className='mt-2'>{review.review_text}</p>


    </div>
  )
}

export default ReviewCard

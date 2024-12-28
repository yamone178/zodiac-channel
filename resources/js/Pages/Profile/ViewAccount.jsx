import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import AccountCard from './AccountCard';
import ProfilePost from '@/Components/ProfilePost';
import { Link } from '@inertiajs/react';
import { redirect } from 'react-router';
import WriteReview from '@/Components/Reviews/WriteReview';
import FlashMessage from '@/Components/FlashMessage';
import { toast, ToastContainer } from 'react-toastify';
import ReviewCard from '@/Components/Reviews/ReviewCard';
import Reviews from '@/Components/Reviews/Reviews';

const ViewAccount = ({ posts, pfAccount, follow, reviews }) => {


  console.log(reviews);



  const { auth, flash } = usePage().props;

  console.log(auth.user);


  const [showAll, setShowAll] = useState(false)

  const [AllReviews, setAllReviews] = useState(false)

  const account = auth.user.role == 'user' ? auth.user.normal_user : auth.user.expert

  const postCount = posts.length

  // const notify = (message) => toast.success(message);

  // if (flash.message) {
  //   notify(flash.message)
  // }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Profile</h2>}
    >



      <div className=" relative px-[50px] py-[40px]">

        <AccountCard follow={follow} postCount={postCount} user={pfAccount} />


        {
          account.about_me && <div className="px-[50px] py-[40px] w-[800px] mx-auto ">
            <h2 className='mb-3 text-xl font-semibold'>About Me</h2>
            <p>{account.about_me}</p>

          </div>
        }

        {/* {
      pfAccount.role == 'expert' &&
      <WriteReview expert_id={pfAccount.expert.id} user_id={auth.user.normal_user.id}/>
     } */}


        {
          pfAccount.role == 'expert' && reviews && <Reviews AllReviews={AllReviews} setAllReviews={setAllReviews} pfAccount={pfAccount} reviews={reviews} />
        }





        {!AllReviews && <div>
          {

            posts.length > 0 ?

              <div className=" px-[40px] py-[20px] ">
                <div className="flex items-center justify-between">
                  <h2 className='my-12 text-2xl font-bold text-main-900 '>{pfAccount.name}'s Posts </h2>

                  <div className="">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className='text-main-900 border hover:bg-main-900 hover:text-white border-main-900  px-[14px] py-2  rounded'>
                      {showAll ? 'Show Less' : 'See All Posts'}
                    </button>
                  </div>

                </div>


                <div className="grid grid-cols-3 gap-3">

                  {

                    showAll ?

                      posts.map((post) => <ProfilePost key={post.id} account={account} post={post} />)

                      :
                      posts.map((post, index) => {
                        if (index < 3) {
                          return <ProfilePost key={post.id} account={account} post={post} />
                        }
                      })
                  }


                </div>



              </div> :
              <div className=' px-[40px] py-[20px]'>
                <h1 className=' text-[20px] text-center bg-slate-300 p-[20px]'>No post yet</h1>
              </div>
          }
        </div>}



      </div>

    </AuthenticatedLayout>
  )
}

export default ViewAccount

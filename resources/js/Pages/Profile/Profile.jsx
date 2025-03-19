import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import React, { useRef, useState } from 'react'
import AccountCard from './AccountCard';
import ProfilePost from '@/Components/ProfilePost';
import { Link } from '@inertiajs/react';
import Reviews from '@/Components/Reviews/Reviews';
import { BiEdit } from 'react-icons/bi';
import EditAboutBox from '@/Components/EditAboutBox';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import UpdateProfileForm from './Partials/UpdateProfileForm';

const Profile = ({ posts, reviews }) => {

  console.log(reviews.length);


  const { auth } = usePage().props;

  const [showAll, setShowAll] = useState(false)
  const [AllReviews, setAllReviews] = useState(false)
  const [showEditAbout, setShowEditAbout] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)


  const handleEditAbout = () => {
    setShowEditAbout(!showEditAbout)
  }

  const handleEditProfile = () => {
    setShowEditProfile(false)
  }

  const account = auth.user.role == 'user' ? auth.user.normal_user : auth.user.expert
  const postCount = posts?.length

  const pfAccount = auth.user

  const clickRef = useRef()
  const clickRef2 = useRef()


  useOutsideClick(clickRef, () => setShowEditAbout(false))

  useOutsideClick(clickRef2, () => setShowEditProfile(false))


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Profile</h2>}
    >
      <div className=" px-[20px] md:px-[50px] py-[40px]">
        <AccountCard postCount={postCount} user={auth.user} setShowEditProfile={setShowEditProfile} />

        {
          showEditProfile &&
          <UpdateProfileForm user={auth.user} clickRef={clickRef2} closeUpdateForm={handleEditProfile} />
        }

        {
          account.about_me && <div className="px-[50px] py-[40px] w-full md:w-[800px] mx-auto flex justify-between">
            <div>
              <h2 className='mb-3 text-xl font-semibold'>About Me</h2>
              <p className='text-justify whitespace-pre-line'>{account.about_me}</p>
            </div>

            <div className="">
              <BiEdit
                onClick={handleEditAbout}
                className='text-main-900 cursor-pointer text-[30px]' />

              {
                showEditAbout &&
                <EditAboutBox clickRef={clickRef} setShowEditAbout={setShowEditAbout} account={account} />
              }

            </div>

          </div>
        }

        {/* <hr className=' mt-9 h-[2px] bg-main-bright' /> */}

        {
          <Reviews AllReviews={AllReviews} setAllReviews={setAllReviews} pfAccount={pfAccount} reviews={reviews} />
        }


        {
          !AllReviews &&
          <>
            {

              posts.length > 0 ?

                <div className=" px-[20px] py-[20px] ">
                  <div className="flex items-center justify-between">
                    <h2 className='my-12 text-2xl font-bold text-main-900 '>Your Posts </h2>

                    <div className="">
                      <button
                        onClick={() => setShowAll(!showAll)}
                        className='text-main-900 border hover:bg-main-900 hover:text-white border-main-900  px-[14px] py-2  rounded'>
                        {showAll ? 'Show Less' : 'See All Posts'}
                      </button>
                    </div>

                  </div>


                  <div className="grid gap-3 md:grid-cols-3">

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
          </>
        }


      </div>

    </AuthenticatedLayout>
  )
}

export default Profile

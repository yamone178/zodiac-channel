import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import SideCard from '@/Components/SideCard';

import React, { useRef, useState } from 'react'

import ExpertRecommend from '@/Components/ExpertRecommend';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import CreatePost from '@/Components/NewFeed/CreatePost';
import UpdateProfileForm from '@/Pages/Profile/Partials/UpdateProfileForm';


const FollowLayout = ({ user, children }) => {

    const { auth, zodiacs } = usePage().props;

     const [openModal, setOpenModal] = useState(false)
    const [openUpdateForm, setOpenUpdateForm] = useState(false)


    const showModal = () => {
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    const showUpdateForm = () => {
        setOpenUpdateForm(true)
    }

    const closeUpdateForm = () => {
        setOpenUpdateForm(false)
    }


    const clickRef = useRef()
    useOutsideClick(clickRef, () => setOpenModal(false))
    useOutsideClick(clickRef, closeUpdateForm)
    return (
        <AuthenticatedLayout

            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">FollowLayout</h2>}
        >

            <div className="flex flex-col md:flex-row gap-y-4 md:gap-0 justify-between mt-[20px] mx-[30px] md:mx-[4.5rem]">

                <div >
                    <SideCard
                        showModal={showModal}

                        showUpdateForm={showUpdateForm}
                        user={auth.user}
                        zodiac={auth.user.zodiac?.name}
                    />
                </div>

                <div className=' w-full md:w-[70%] bg-white rounded-2xl'>

                    {children}
                </div>

                {
                    openModal && <CreatePost clickRef={clickRef} zodiacs={zodiacs} closeModal={closeModal} />
                }


                {
                    openUpdateForm && <UpdateProfileForm user={auth.user} clickRef={clickRef} closeUpdateForm={closeUpdateForm} />
                }





            </div>
        </AuthenticatedLayout>
    );
}

export default FollowLayout
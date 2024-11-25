import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import SideCard from '@/Components/SideCard';

import React, { useRef, useState } from 'react'

import ExpertRecommend from '@/Components/ExpertRecommend';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import CreatePost from '@/Components/NewFeed/CreatePost';


const FollowLayout = ({user,   children}) => {

    const { auth, zodiacs } = usePage().props;

    console.log(auth);
    
    
    const [openModal, setOpenModal] = useState(false)

    const showModal = () =>{
        setOpenModal(true)
    }

    const closeModal = () =>{
        setOpenModal(false)
    }

    const clickRef = useRef()
    useOutsideClick(clickRef, ()=>setOpenModal(false))
    
    return (
        <AuthenticatedLayout
           
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">FollowLayout</h2>}
        >
            <Head title="FollowLayout" />

            <div  className="flex justify-between mt-[20px] mx-[4.5rem]">
                
               <div >
                 <SideCard showModal={showModal} user={auth.user}  zodiac={auth.user.zodiac?.name}/>    
                </div> 

                <div className='w-[70%] bg-white rounded-2xl'>
                    
                   {children}
                </div>            
                
                
               
              
              
              
            </div>
        </AuthenticatedLayout>
    );
}

export default FollowLayout
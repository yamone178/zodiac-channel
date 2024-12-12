import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import AccountCard from '../Profile/AccountCard';


const AllPost = ({ posts }) => {

    const { auth } = usePage().props;
    const account = auth.user.role == 'user' ? auth.user.normal_user : auth.user.expert

    return (
        <>

            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Profile</h2>}
            >

                <div className=" px-[50px] py-[40px]">
                <AccountCard user={auth.user} />

                

                {
                    account.about_me && <div className="px-[50px] py-[40px] w-[800px] mx-auto ">
                        <h2 className='mb-3 text-xl font-semibold'>About Me</h2>
                        <p>{account.about_me}</p>

                    </div>
                }

                </div>
                {
                    posts && posts.map((post) => <div>
                        hello
                    </div>)
                }

            </AuthenticatedLayout>



        </>
    )
}

export default AllPost

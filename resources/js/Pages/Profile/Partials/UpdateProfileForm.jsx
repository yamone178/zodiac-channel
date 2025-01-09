import { useForm, usePage } from '@inertiajs/react';
import React from 'react'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react'
import RoundedImage from '@/Components/RoundedImage';
import TextArea from '@/Components/TextArea';


const UpdateProfileForm = ({ user, clickRef, closeUpdateForm }) => {

    console.log(user);

    const userAccount = user.role == 'user' ? user.normal_user : user.expert
    const { data, setData, post, processing, errors, reset, put } = useForm({
        name: user.name,
        email: user.email,
        profile_picture: userAccount.profile_picture,
        dob: userAccount.dob,
        bio: userAccount.bio,
        expertise: userAccount.expertise,
        about_me: userAccount.about_me
    });

    console.log(data);

    const { auth } = usePage().props



    const submit = (e) => {
        e.preventDefault();

        console.log(data);


        if (auth.user.role == 'user') {
            router.post(route('user.update'), {
                _method: 'patch',
                data: data
            });
        } else {
            router.post(route('expert.update'), {
                _method: 'patch',
                data: data
            });
        }



        closeUpdateForm()

    };

    console.log(userAccount);
    

    return (
        <div className=" fixed h-screen top-0 left-0  z-10 bg-[#8080807d] w-[100%]">
            <form ref={clickRef} onSubmit={submit}
                className='bg-white h-min top-0 bottom-0 m-auto left-0 inline-block right-0 w-[500px] p-[20px] absolute border-2 shadow-md rounded-xl'>

                <div className="flex items-center justify-center gap-4 mb-3 ">
                   
                   { userAccount.profile_picture &&
                    <RoundedImage pf={userAccount.profile_picture_url} className="w-[90px] h-[90px]" id={user.id} />
                     }

                    <div className='mb-3 '>
                        <InputLabel htmlFor="profile_picture" value="profile_picture" />

                        <TextInput
                            id="profile_picture"
                            name="profile_picture"

                            className="block w-full mt-2"
                            type='file'
                            onChange={(e) => setData('profile_picture', e.target.files[0])}

                        />

                        <InputError message={errors.profile_picture} className="mt-2" />
                    </div>
                </div>

                <div className='flex justify-between gap-2 mb-3'>
                    <div>
                        <InputLabel htmlFor="name" value="name" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-full mt-1"
                            type='text'
                            onChange={(e) => setData('name', e.target.value)}

                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="email (can't update)" />

                        <TextInput
                            id="email"
                            name="name"
                            value={data.email}
                            className="block w-full mt-1 border-yellow-600 bg-yellow-50"
                            type='email'
                            onChange={(e) => setData('email', e.target.value)}
                            disabled
                          
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>

               <div className='flex justify-between gap-2'>
               <div className='mb-3 '>
                            <InputLabel htmlFor="expertise" value="expertise" />

                            <TextInput
                                id="expertise"
                                name="expertise"

                                className="block w-full mt-1"
                                type='text'
                                onChange={(e) => setData('expertise', e.target.value)}

                            />

                            <InputError message={errors.profile_picture} className="mt-2" />
                        </div>

                <div className='mb-3 '>
                    <InputLabel htmlFor="dob" value="DOB" />

                    <TextInput
                        id="dob"
                        name="dob"
                        value={data.dob}
                        className="block w-full mt-1"
                        type='date'
                        onChange={(e) => setData('dob', e.target.value)}

                    />

                    <InputError message={errors.profile_picture} className="mt-2" />
                </div>
               </div>

                <div className='mb-3 '>
                    <InputLabel htmlFor="bio" value="bio" />

                    <TextArea
                        id="bio"
                        name="bio"
                        value={data.bio}
                        className="block w-full mt-1"

                        onChange={(e) => setData('bio', e.target.value)}

                    > </TextArea>

                    <InputError message={errors.bio} className="mt-2" />
                </div>

                {

                    auth.user.role == 'expert' &&
                    <>
                        <div className='mb-3 '>
                            <InputLabel htmlFor="bio" value="about_me" />

                            <textarea
                                id="about_me"
                                name="about_me"
                                value={data.about_me}
                                className="block w-full mt-1"

                                onChange={(e) => setData('about_me', e.target.value)}

                            > </textarea>

                            <InputError message={errors.bio} className="mt-2" />
                        </div>

                        
                    </>


                }





                <div className="flex items-center justify-end mt-4 ">

                    <button type='submit' className="px-4 py-2 text-white rounded-md ms-4 bg-main-900 " disabled={processing}>
                        Update
                    </button>


                </div>

            </form>
        </div>
    )
}

export default UpdateProfileForm

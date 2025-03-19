import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AccountRegisterForm from '@/Components/Register/AccountRegisterForm';

export default function ExpertInfoForm({ zodiacs, registerData }) {


    console.log(registerData);

    const [back, setBack] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({

        profile_picture: '',
        about_me: '',
        dob: '',
        no_of_exp: 0,
        expertise: '',
        bio: '',
        registerData: registerData.registerData
    });

    console.log(data);



    const submit = (e) => {
        e.preventDefault();

        console.log(data);


        post(route('register'), {
            data: data
        });
    };

    const handleBack = () => {
        setBack(true);
        return <AccountRegisterForm registerData={registerData} />
    }

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>

                <div>
                    <InputLabel htmlFor="profile_picture" value="profile_picture" />

                    <input
                        id="profile_picture"
                        name="profile_picture"

                        className="block w-full mt-1"
                        type='file'
                        onChange={(e) => setData('profile_picture', e.target.files[0])}
                        required
                    />

                    <InputError message={errors.profile_picture} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="no_of_exp" value="Number of experiences" />

                    <input
                        id="no_of_exp"
                        name="no_of_exp"
                        value={data.no_of_exp}
                        className="block w-full mt-1"
                        type='number'
                        onChange={(e) => setData('no_of_exp', e.target.value)}
                        required
                    />

                    <InputError message={errors.no_of_exp} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="dob" value="DOB" />

                    <input
                        id="dob"
                        name="dob"
                        value={data.dob}
                        className="block w-full mt-1"
                        type='date'
                        onChange={(e) => setData('dob', e.target.value)}
                        required
                    />

                    <InputError message={errors.profile_picture} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="expertise" value="expertise" />

                    <TextInput
                        id="expertise"
                        name="expertise"
                        value={data.expertise}
                        className="block w-full mt-1"

                        onChange={(e) => setData('expertise', e.target.value)}
                        required
                    />

                    <InputError message={errors.expertise} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="about_me" value="about you" />

                    <textarea
                        id="about_me"
                        name="about_me"
                        value={data.about_me}
                        className="block w-full mt-1"
                        type='number'
                        onChange={(e) => setData('about_me', e.target.value)}
                        required
                    > </textarea>

                    <InputError message={errors.profile_picture} className="mt-2" />
                </div>





                <div className="flex items-center justify-between mt-4">

                    <button
                        className="px-4 py-2 text-white rounded-md ms-4 bg-main-900" disabled={processing}>
                        back
                    </button>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>


                </div>
            </form>
        </GuestLayout>
    );
}

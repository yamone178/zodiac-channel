import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ExpertInfoForm from './ExpertInfoForm';
import AccountRegisterForm from '@/Components/Register/AccountRegisterForm';
import ExpertRegister from '@/Components/Register/ExpertRegister';


export default function Register({zodiacs}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role: 'user',
        zodiac: 1,
        password: '',
        password_confirmation: '',

        profile_picture: '',
        about_me: '',
        dob: '',
        no_of_exp: 0,
        expertise: '',
        bio: '',
     
    });

    const [showExpertForm, setShowExpertForm] = useState(false)

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        if (data.role === 'expert') {
            setShowExpertForm(true)
            router.post(route('expert.register'), {
                data: data, // Pass register data as a prop
            });
            // Redirect to expert form with the registration data
          
        }else{
            post(route('register'));
        }
       
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {
                showExpertForm ? 
                <ExpertRegister  zodiacs={zodiacs} setData={setData} data={data} submit={submit} errors={errors} processing={processing} />
                : 
                <AccountRegisterForm setShowExpertForm={setShowExpertForm} zodiacs={zodiacs} setData={setData} data={data} submit={submit} errors={errors} processing={processing} />

            }

        </GuestLayout>
    );
}

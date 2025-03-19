import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import AccountRegisterForm from '@/Components/Register/AccountRegisterForm';
import ExpertRegister from '@/Components/Register/ExpertRegister';

export default function Register({ zodiacs }) {
  const { data, setData, post, setError, processing, errors, reset } = useForm({
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

  const [showExpertForm, setShowExpertForm] = useState(false);

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const validateAccountForm = () => {
    const accountErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!data.name) accountErrors.name = 'Name is required';
    if (!data.email) {
      accountErrors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
      accountErrors.email = 'Email must be a valid gmail.com address';
    }
    if (!data.password) accountErrors.password = 'Password is required';
    if (data.password !== data.password_confirmation) accountErrors.password_confirmation = 'Passwords do not match';
    if (!data.role) accountErrors.role = 'Role is required';
    if (!data.zodiac) accountErrors.zodiac = 'Zodiac is required';

    return accountErrors;
  };

  const submit = (e) => {
    e.preventDefault();

    console.log('hello');

    if (data.role === 'expert') {
      console.log(data);


      const accountErrors = validateAccountForm();


      if (Object.keys(accountErrors).length > 0) {
        Object.keys(accountErrors).forEach((key) => {
          setError(key, accountErrors[key]);
        });
      } else {

        setShowExpertForm(true);


      }
    } else {
      post(route('register'));
    }
  };

  const expertSubmit = (e) => {
    e.preventDefault();
    console.log('hello');

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(`data[${key}]`, data[key]);
    });
    router.post(route('expert.register'), formData);
  };

  const next = () => {
    setShowExpertForm(false);
  }

  return (
    <GuestLayout>
      <Head title="Register" />
      {showExpertForm ? (
        <ExpertRegister
          errors={errors}
          zodiacs={zodiacs}
          setData={setData}
          data={data}
          submit={expertSubmit}
          processing={processing}
          next={next}
        />
      ) : (
        <AccountRegisterForm
          errors={errors}
          setShowExpertForm={setShowExpertForm}
          zodiacs={zodiacs}
          setData={setData}
          data={data}
          submit={submit}
          processing={processing}
        />
      )}
    </GuestLayout>
  );
}
import React from 'react'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const AccountRegisterForm = ({data, setData, submit, errors, processing, zodiacs, setShowExpertForm}) => {
  return (
    <form onSubmit={submit}>
    <div>
        <InputLabel htmlFor="name" value="Name" />

        <TextInput
            id="name"
            name="name"
            value={data.name}
            className="block w-full mt-1"
            autoComplete="name"
            isFocused={true}
            onChange={(e) => setData('name', e.target.value)}
            required
        />

        <InputError message={errors.name} className="mt-2" />
    </div>

    <div className="mt-4">
        <InputLabel htmlFor="email" value="Email" />

        <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="block w-full mt-1"
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
            required
        />

        <InputError message={errors.email} className="mt-2" />
    </div>

    <div className="mt-4">
        <InputLabel htmlFor="password" value="Password" />

        <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="block w-full mt-1"
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
            required
        />

        <InputError message={errors.password} className="mt-2" />
    </div>

    <div className="mt-4">
        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

        <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="block w-full mt-1"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
        />

        <InputError message={errors.password_confirmation} className="mt-2" />
    </div>

    <div className="mt-4">
        <InputLabel htmlFor="role" value="Role" />

        <select
         id="role"
        
         name="role"
         value={data.role}
        className="block w-full mt-1"
        onChange={(e) => setData('role', e.target.value)}
        required
        >
            <option value="user">user</option>
            <option value="expert">expert</option>
        </select>


        <InputError message={errors.role} className="mt-2" />
    </div>


    <div className="mt-4">
        <InputLabel htmlFor="zodiac" value="Choose your Zodiac" />

        <select
         id="zodiac"
         
         name="zodiac"
         value={data.zodiac}
        className="block w-full mt-1"
        onChange={(e) => setData('zodiac', e.target.value)}
        required
        >
           {
            zodiacs.map((zodiac)=> <option key={zodiac.id} value={zodiac.id}>{zodiac.name}</option>)
           }
        </select>


        <InputError message={errors.role} className="mt-2" />
    </div>

        <div className="flex items-center justify-end mt-4">
            
            {
                data.role === 'user' ?
                <PrimaryButton className="ms-4" disabled={processing}>
                    Register
                </PrimaryButton>
                : 

                <button onClick={()=>setShowExpertForm(true)}>
                    Next
                </button>
                
            }
           
        </div>
    </form>
  )
}

export default AccountRegisterForm

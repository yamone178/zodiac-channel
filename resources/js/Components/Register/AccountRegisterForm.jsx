import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';

const AccountRegisterForm = ({ register, data, setData, submit, errors, processing, zodiacs }) => {
  return (
    <div className=" w-[400px]">
      <h1 className="mb-3 text-3xl font-bold text-center text-main-900">Create an Account</h1>
      <form onSubmit={submit}>
        {/* Name Input */}
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

        {/* Email Input */}
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

        {/* Password Input */}
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

        {/* Password Confirmation */}
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

        {/* Role Selector */}
        <div className="mt-4">
          <InputLabel htmlFor="role" value="Role" />
          <select
            id="role"
            name="role"
            value={data.role}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => setData('role', e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="expert">Expert</option>
          </select>
          <InputError message={errors.role} className="mt-2" />
        </div>

        {/* Zodiac Selector */}
        <div className="mt-4">
          <InputLabel htmlFor="zodiac" value="Choose your Zodiac" />
          <select
            id="zodiac"
            name="zodiac"
            value={data.zodiac}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => setData('zodiac', e.target.value)}
            required
          >
            {zodiacs.map((zodiac) => (
              <option key={zodiac.id} value={zodiac.id}>
                {zodiac.name}
              </option>
            ))}
          </select>
          <InputError message={errors.zodiac} className="mt-2" />
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-between mt-4">
          <Link href="/login" className=' text-main-900'> Already have an account? Login</Link>
          {data.role === 'user' ? (
            <button type='submit' className="px-4 py-2 text-white rounded-md ms-4 bg-main-900" disabled={processing}>
              Register
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              className="px-4 py-2 text-white rounded-md ms-4 bg-main-900"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountRegisterForm;
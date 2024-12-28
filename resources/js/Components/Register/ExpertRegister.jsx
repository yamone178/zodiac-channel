import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const ExpertRegister = ({ data, setData, submit, errors, processing }) => {
  return (
    <form onSubmit={submit}>
      <div>
        <InputLabel htmlFor="profile_picture" value="Profile Picture" />
        <input
          id="profile_picture"
          name="profile_picture"
          className="block w-full mt-1"
          type="file"
          onChange={(e) => setData('profile_picture', e.target.files[0])}
          required
        />
        <InputError message={errors.profile_picture} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="no_of_exp" value="Number of Experiences" />
        <input
          id="no_of_exp"
          name="no_of_exp"
          value={data.no_of_exp}
          className="block w-full mt-1"
          type="number"
          onChange={(e) => setData('no_of_exp', e.target.value)}
          required
        />
        <InputError message={errors.no_of_exp} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="dob" value="Date of Birth" />
        <input
          id="dob"
          name="dob"
          value={data.dob}
          className="block w-full mt-1"
          type="date"
          onChange={(e) => setData('dob', e.target.value)}
          required
        />
        <InputError message={errors.dob} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="expertise" value="Expertise" />
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
        <InputLabel htmlFor="about_me" value="About You" />
        <textarea
          id="about_me"
          name="about_me"
          value={data.about_me}
          className="block w-full mt-1"
          onChange={(e) => setData('about_me', e.target.value)}
          required
        />
        <InputError message={errors.about_me} className="mt-2" />
      </div>

      <div className="flex items-center justify-end mt-4">
        <button type='submit' className="ms-4" disabled={processing}>
          Register
        </button>
      </div>
    </form>
  );
};

export default ExpertRegister;
import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '../TextArea';

const ExpertRegister = ({ data, setData, submit, errors, processing, next }) => {

  const [showImg, setShowImg] = useState()

  const handleImage = (e) => {
    e.preventDefault()
    setData('profile_picture', e.target.files[0])
    
    setShowImg(URL.createObjectURL(e.target.files[0]))

  }
  
  return (
    <div className=" w-[400px]">
       <form onSubmit={submit}>
      <div className='flex items-center justify-between gap-3 mb-3'>
        { showImg && <img src={showImg} alt=""  className=' w-[100px] h-[100px] rounded-full object-cover border border-main-900'/>}
        <div className="">
        <InputLabel htmlFor="profile_picture" value="Profile Picture" />
        <TextInput
          id="profile_picture"
          name="profile_picture"
          className="block w-full mt-2 mb-3 "
          type="file"
          onChange={handleImage}
          required
        />
        <InputError message={errors.profile_picture} className="mt-2" />
        </div>

       
      </div>

      <div>
        <InputLabel htmlFor="no_of_exp" value="Number of Experiences" />
        <TextInput
          id="no_of_exp"
          name="no_of_exp"
          value={data.no_of_exp}
          className="block w-full mt-1 mb-3"
          type="number"
          onChange={(e) => setData('no_of_exp', e.target.value)}
          required
        />
        <InputError message={errors.no_of_exp} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="dob" value="Date of Birth" />
        <TextInput
          id="dob"
          name="dob"
          value={data.dob}
          className="block w-full mt-1 mb-3"
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
          className="block w-full mt-1 mb-3"
          onChange={(e) => setData('expertise', e.target.value)}
          required
        />
        <InputError message={errors.expertise} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="about_me" value="About You" />
        <TextArea
          id="about_me"
          name="about_me"
          value={data.about_me}
          className="block w-full mt-1"
          onChange={(e) => setData('about_me', e.target.value)}
          required
        />
        <InputError message={errors.about_me} className="mt-2" />
      </div>

      <div className="flex items-center justify-between mt-4">
        <button 
          onClick={next}
            className="px-4 py-2 border rounded-md text- border-main-900 " disabled={processing}>
              back
          </button>
        <button type='submit' 
        className="px-4 py-2 text-white rounded-md ms-4 bg-main-900"  disabled={processing}>
          Register
        </button>
      </div>
    </form>
    </div>
   
  );
};

export default ExpertRegister;
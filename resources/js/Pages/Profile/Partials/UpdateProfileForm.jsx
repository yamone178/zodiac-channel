import { useForm, usePage } from '@inertiajs/react';
import React from 'react'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react'


const UpdateProfileForm = ({clickRef, closeUpdateForm}) => {

    const { data, setData, post, processing, errors, reset, put } = useForm({
        
        profile_picture: '',
        dob: '',
        bio: '',
        expertise:'',
        about_me: ''
    });

    console.log(data);

    const {auth} = usePage().props
   
    

    const submit = (e) => {
        e.preventDefault();

        console.log(data);
     
        
        if(auth.user.role == 'user')
        {
            router.post(route('user.update'),{
                _method: 'patch',
                data: data
            });
        }else{
            router.post(route('expert.update'),{
                _method: 'patch',
                data: data
            });
        }

       
      
        closeUpdateForm()

    };


  return (
  <div className=" fixed h-screen top-0 left-0  z-10 bg-[#8080807d] w-[100%]">
            <form ref={clickRef} onSubmit={submit}
                className='bg-white h-min top-0 bottom-0 m-auto left-0 inline-block right-0 w-[500px] p-[20px] absolute border-2 shadow-md rounded-xl'>
                
                <div>
                    <InputLabel htmlFor="profile_picture" value="profile_picture" />

                    <input
                        id="profile_picture"
                        name="profile_picture"
                       
                        className="block w-full mt-1"
                        type='file'
                        onChange={(e) => setData('profile_picture', e.target.files[0])}
                       
                    />

                    <InputError message={errors.profile_picture} className="mt-2" />
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
                      
                    />

                    <InputError message={errors.profile_picture} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="bio" value="bio" />

                    <textarea
                        id="bio"
                        name="bio"
                        value={data.bio}
                        className="block w-full mt-1"
                    
                        onChange={(e) => setData('bio', e.target.value)}
                     
                    > </textarea>

                    <InputError message={errors.bio} className="mt-2" />
                </div>

                {
                    
                    auth.user.role == 'expert' &&
                    <>
                    <div>
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

                  <div>
                    <InputLabel htmlFor="expertise" value="expertise" />

                    <input
                        id="expertise"
                        name="expertise"
                       
                        className="block w-full mt-1"
                        type='text'
                        onChange={(e) => setData('expertise', e.target.value)}
                       
                    />

                    <InputError message={errors.profile_picture} className="mt-2" />
                </div>
               </> 


                }
                
              


             
                <div className="flex items-center justify-end mt-4">
                   
                     <PrimaryButton className="ms-4" disabled={processing}>
                        Update
                    </PrimaryButton> 
                
                    
                </div>
             
            </form>
        </div>
  )
}

export default UpdateProfileForm

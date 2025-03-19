import { router, useForm, usePage } from '@inertiajs/react'
import React from 'react'

const EditAboutBox = ({ account, clickRef, postId, setShowEditAbout }) => {

    const { data, setData, post } = useForm({
        'about_me': account.about_me
    })

    const { auth } = usePage().props

    const submit = (e) => {
        e.preventDefault()
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

        setShowEditAbout(false)

    }

    return (
        <div className=" fixed h-screen top-0 left-0  z-10 bg-[#8080807d] w-[100%]">
            <form ref={clickRef}
                className='bg-white h-min top-0 bottom-0 m-auto left-0 inline-block right-0 w-[360px] md:w-[500px] p-[20px] absolute border-2 shadow-md rounded-xl'>

                <div className="flex items-center justify-between mb-5">
                    <h2 className='text-lg font-bold '>Edit About Me</h2>
                    <button onClick={submit} className='py-2 text-white bg-gray-700 rounded-md px-9'>Update</button>
                </div>

                <hr className='h-2 mb-3' />

                <textarea type="text"
                    rows="2"
                    value={data.about_me}
                    placeholder='Write Caption'
                    className='w-full h-[200px] border-0 focus:outline-none focus:ring-0'
                    onChange={e => setData('about_me', e.target.value)}
                >
                </textarea>




            </form>
        </div>
    )
}

export default EditAboutBox


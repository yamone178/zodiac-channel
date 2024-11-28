import { useForm } from '@inertiajs/react'
import React from 'react'

const CommentBox = ({ clickRef, postId, setShowCommentBox }) => {

    const { data, setData, post} = useForm({
        'comment': '',
        'post_id': postId
    })

    const submit = (e) => {
        e.preventDefault()

        setShowCommentBox(false)

        post(route('comment.store', postId),{
            data: data
        })

    }

    return (
        <div className=" fixed h-screen top-0 left-0  z-10 bg-[#8080807d] w-[100%]">
            <form ref={clickRef}
                className='bg-white h-min top-0 bottom-0 m-auto left-0 inline-block right-0 w-[500px] p-[20px] absolute border-2 shadow-md rounded-xl'>

                <div className="flex items-center justify-between mb-5">
                    <h2 className='text-lg font-bold '>Give Comment</h2>
                    <button onClick={submit} className='py-2 text-white bg-gray-700 rounded-md px-9'>Comment</button>
                </div>

                <hr className='h-2 mb-3' />

                <textarea type="text" 
                    rows="2"
                 value={data.comment}
                    placeholder='Write Caption'
                    className='w-full border-0 focus:outline-none focus:ring-0'
                    onChange={e => setData('comment', e.target.value)}
                    >
                </textarea>




            </form>
        </div>
    )
}

export default CommentBox

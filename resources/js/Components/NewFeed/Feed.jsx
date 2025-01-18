import React from 'react'
import Post from './Post'

const Feed = ({posts, zodiacs}) => {

 

  return (
    <div className='flex flex-col gap-3'>
      {
        posts && posts.map((post)=> <Post key={post.id} post={post} zodiacs={zodiacs}/> )
      }
      {
        posts&& posts.length === 0 && <div className='p-4 mx-auto text-xl text-center  bg-gray-200 text-gray-600 rounded mt-[50%]'>
          No posts yet
          <p >Follow Zodiac Mates and Experts!! </p>
          </div>
      }
      
    </div>
  )
}

export default Feed
